import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const securityConfig = {
  bcryptRounds: 12,
  maxLoginAttempts: 5,
  lockTime: 30 * 60 * 1000, // 30 minutes
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: {
        values: ["patient", "doctor", "admin"],
        message: "{VALUE} is not a valid role"
      },
      default: "patient",
      index: true
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: String,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
      sparse: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    profilePicture: {
      type: String,
      default: "default-profile.png"
    },
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: {
      type: Date
    },
    lastLogin: {
      type: Date
    },
    passwordChangedAt: {
      type: Date
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for performance
userSchema.index({ email: 1, isActive: 1 });
userSchema.index({ role: 1, isActive: 1 });

// Virtual for account lock status
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash if password is modified
  if (!this.isModified("password")) {
    this.email = this.email.toLowerCase();
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(securityConfig.bcryptRounds);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second
    this.email = this.email.toLowerCase();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Method to increment failed login attempts
userSchema.methods.incrementLoginAttempts = async function () {
  // If lock has expired, reset attempts and lock
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { failedLoginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }

  // Increment attempts
  const updates = { $inc: { failedLoginAttempts: 1 } };

  // Lock account if max attempts reached
  const needsLock = this.failedLoginAttempts + 1 >= securityConfig.maxLoginAttempts && !this.isLocked;
  if (needsLock) {
    updates.$set = { lockUntil: Date.now() + securityConfig.lockTime };
  }

  return this.updateOne(updates);
};

// Method to reset login attempts on successful login
userSchema.methods.resetLoginAttempts = async function () {
  return this.updateOne({
    $set: {
      failedLoginAttempts: 0,
      lastLogin: Date.now(),
    },
    $unset: { lockUntil: 1 },
  });
};

// Check if password was changed after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.failedLoginAttempts;
  delete obj.lockUntil;
  delete obj.__v;
  return obj;
};

export default mongoose.model("User", userSchema);

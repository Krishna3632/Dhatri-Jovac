import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
      type: String,
      enum: {
        values: ["patient", "doctor", "admin"],
        message: "{VALUE} is not a valid role"
      },
      default: "patient"
    },
    isActive: {
      type: Boolean,
      default: true
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
    lastLogin: {
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

// Add index for email for faster queries
userSchema.index({ email: 1 });

// Pre-save hook to ensure email is lowercase
userSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  next();
});

export default mongoose.model("User", userSchema);

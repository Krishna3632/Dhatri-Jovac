import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      select: false, // Don't return token in queries
    },
    deviceInfo: {
      type: String,
      default: "Unknown Device",
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
      index: true,
    },
    revokedAt: {
      type: Date,
    },
    revokedReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
refreshTokenSchema.index({ userId: 1, isRevoked: 1, expiresAt: 1 });

// Automatically delete expired tokens (MongoDB TTL index)
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Hash token before saving
refreshTokenSchema.pre("save", async function (next) {
  if (!this.isModified("tokenHash")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.tokenHash = await bcrypt.hash(this.tokenHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare token
refreshTokenSchema.methods.compareToken = async function (candidateToken) {
  try {
    return await bcrypt.compare(candidateToken, this.tokenHash);
  } catch (error) {
    throw new Error("Token comparison failed");
  }
};

// Method to revoke token
refreshTokenSchema.methods.revoke = async function (reason = "Manual revocation") {
  this.isRevoked = true;
  this.revokedAt = Date.now();
  this.revokedReason = reason;
  return this.save();
};

// Static method to revoke all tokens for a user
refreshTokenSchema.statics.revokeAllForUser = async function (userId) {
  return this.updateMany(
    { userId, isRevoked: false },
    {
      $set: {
        isRevoked: true,
        revokedAt: Date.now(),
        revokedReason: "Logout all devices",
      },
    }
  );
};

// Static method to clean up expired/revoked tokens
refreshTokenSchema.statics.cleanupTokens = async function () {
  const now = Date.now();
  return this.deleteMany({
    $or: [
      { expiresAt: { $lt: now } },
      { isRevoked: true, revokedAt: { $lt: now - 30 * 24 * 60 * 60 * 1000 } }, // Delete revoked tokens older than 30 days
    ],
  });
};

export default mongoose.model("RefreshToken", refreshTokenSchema);

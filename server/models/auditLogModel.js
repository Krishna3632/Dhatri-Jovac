import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "LOGIN",
        "LOGOUT",
        "REGISTER",
        "PASSWORD_CHANGE",
        "PASSWORD_RESET_REQUEST",
        "PASSWORD_RESET_COMPLETE",
        "TOKEN_REFRESH",
        "FAILED_LOGIN",
        "ACCOUNT_LOCKED",
        "ACCOUNT_UNLOCKED",
        "PROFILE_UPDATE",
        "PROFILE_VIEW",
        "DATA_ACCESS",
        "DATA_MODIFICATION",
        "UNAUTHORIZED_ACCESS",
        "ERROR",
        "SYSTEM_ERROR",
      ],
      index: true,
    },
    resourceType: {
      type: String,
      enum: ["USER", "PATIENT", "DOCTOR", "MEDICAL_RECORD", "PRESCRIPTION", "APPOINTMENT"],
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    success: {
      type: Boolean,
      required: true,
      index: true,
    },
    errorMessage: {
      type: String,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed, // Additional contextual data
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false, // We use custom timestamp field
  }
);

// Compound indexes for efficient queries
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ success: 1, timestamp: -1 });

// TTL index to automatically delete logs older than 7 years (HIPAA requirement)
auditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7 * 365 * 24 * 60 * 60 });

// Static method to log an event
auditLogSchema.statics.logEvent = async function (eventData) {
  try {
    return await this.create(eventData);
  } catch (error) {
    console.error("Failed to create audit log:", error);
    // Don't throw - audit logging should never break the application
  }
};

// Static method to get user activity
auditLogSchema.statics.getUserActivity = async function (userId, limit = 50) {
  return this.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .select("-__v");
};

// Static method to get failed login attempts
auditLogSchema.statics.getFailedLogins = async function (timeRange = 24 * 60 * 60 * 1000) {
  const startTime = new Date(Date.now() - timeRange);
  return this.find({
    action: "FAILED_LOGIN",
    timestamp: { $gte: startTime },
  }).sort({ timestamp: -1 });
};

export default mongoose.model("AuditLog", auditLogSchema);

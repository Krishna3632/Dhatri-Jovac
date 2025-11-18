import AuditLog from "../models/auditLogModel.js";

/**
 * Role-based access control middleware
 * Use after authMiddleware
 * 
 * @param {...string} allowedRoles - Roles that are allowed to access the route
 * 
 * @example
 * router.get('/admin/users', authMiddleware, authorize('admin'), getUsers)
 * router.get('/doctor/patients', authMiddleware, authorize('doctor', 'admin'), getPatients)
 */
export const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Check if user exists (should be attached by authMiddleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
          code: "NOT_AUTHENTICATED",
        });
      }

      // Check if user role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        // Log unauthorized access attempt
        await AuditLog.logEvent({
          userId: req.user.userId,
          action: "UNAUTHORIZED_ACCESS",
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
          success: false,
          errorMessage: `Insufficient permissions. Required: ${allowedRoles.join(" or ")}`,
          metadata: {
            userRole: req.user.role,
            requiredRoles: allowedRoles,
            attemptedRoute: req.originalUrl,
          },
        });

        return res.status(403).json({
          success: false,
          message: "You do not have permission to access this resource",
          code: "INSUFFICIENT_PERMISSIONS",
          requiredRoles: allowedRoles,
          userRole: req.user.role,
        });
      }

      // User is authorized
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({
        success: false,
        message: "Authorization error",
        code: "AUTH_ERROR",
      });
    }
  };
};

/**
 * Check if user is accessing their own resource
 * Use for routes like /users/:userId
 * 
 * @param {string} paramName - Name of the parameter to check (default: 'userId')
 * 
 * @example
 * router.get('/users/:userId', authMiddleware, checkOwnership('userId'), getUserProfile)
 */
export const checkOwnership = (paramName = "userId") => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
          code: "NOT_AUTHENTICATED",
        });
      }

      const resourceId = req.params[paramName];
      const userId = req.user.userId.toString();

      // Admin can access any resource
      if (req.user.role === "admin") {
        return next();
      }

      // Check if user is accessing their own resource
      if (resourceId !== userId) {
        await AuditLog.logEvent({
          userId: req.user.userId,
          action: "UNAUTHORIZED_ACCESS",
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
          success: false,
          errorMessage: "Attempted to access another user's resource",
          metadata: {
            attemptedResourceId: resourceId,
            actualUserId: userId,
          },
        });

        return res.status(403).json({
          success: false,
          message: "You can only access your own resources",
          code: "NOT_AUTHORIZED",
        });
      }

      next();
    } catch (error) {
      console.error("Ownership check error:", error);
      return res.status(500).json({
        success: false,
        message: "Authorization error",
        code: "AUTH_ERROR",
      });
    }
  };
};

/**
 * Check if user owns resource OR has specific role
 * Combines ownership and role-based access
 * 
 * @param {string} paramName - Name of the parameter to check
 * @param {...string} allowedRoles - Roles that can bypass ownership check
 * 
 * @example
 * router.get('/users/:userId/profile', authMiddleware, checkOwnershipOrRole('userId', 'admin', 'doctor'), getProfile)
 */
export const checkOwnershipOrRole = (paramName, ...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
          code: "NOT_AUTHENTICATED",
        });
      }

      const resourceId = req.params[paramName];
      const userId = req.user.userId.toString();

      // Check if user has allowed role
      if (allowedRoles.includes(req.user.role)) {
        return next();
      }

      // Check if user owns the resource
      if (resourceId === userId) {
        return next();
      }

      // Not authorized
      await AuditLog.logEvent({
        userId: req.user.userId,
        action: "UNAUTHORIZED_ACCESS",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        success: false,
        errorMessage: "Insufficient permissions to access resource",
        metadata: {
          attemptedResourceId: resourceId,
          actualUserId: userId,
          userRole: req.user.role,
          requiredRoles: allowedRoles,
        },
      });

      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
        code: "INSUFFICIENT_PERMISSIONS",
      });
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({
        success: false,
        message: "Authorization error",
        code: "AUTH_ERROR",
      });
    }
  };
};

/**
 * Require email verification
 */
export const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
      code: "NOT_AUTHENTICATED",
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: "Email verification required to access this resource",
      code: "EMAIL_NOT_VERIFIED",
    });
  }

  next();
};

export default authorize;

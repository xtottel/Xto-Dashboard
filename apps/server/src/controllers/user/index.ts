// controllers/user/index.ts
import { getCurrentUser } from "./getCurrentUser.controller";
import { updateProfile } from "./updateProfile.controller";
import { changePassword } from "./changePassword.controller";
import { getActiveSessions } from "./getActiveSessions.controller";
import { revokeSession } from "./revokeSession.controller";
import { revokeAllSessions } from "./revokeAllSessions.controller";

export const userController = {
  getCurrentUser,
  updateProfile,
  changePassword,
  getActiveSessions,
  revokeSession,
  revokeAllSessions,
};
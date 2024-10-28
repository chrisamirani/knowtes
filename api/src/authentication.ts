import { verifyToken } from "./services/auth";
import { IAuthenticatedRequest } from "./types";

/**
 * This is the authentication middleware function that will be used by tsoa.
 */
export function expressAuthentication(
  request: IAuthenticatedRequest,
  securityName: string,
  _scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return Promise.reject(new Error("No token provided"));
    }

    try {
      const tokenPayload = verifyToken(token);
      request.email = tokenPayload?.email ?? "";
      request.team = tokenPayload?.team ?? "";
      return Promise.resolve(tokenPayload);
    } catch (error) {
      return Promise.reject(new Error("Invalid token"));
    }
  }

  return Promise.reject(new Error("Security name not recognized"));
}

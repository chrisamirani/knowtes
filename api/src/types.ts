import { Request } from "express";

/**
 * @pattern ^[^@]+@[^@]+\.[^@]+$
 */
export type EmailField = string;

/**
 * A JWT string for authentication
 */
export type UserToken = string;

export interface Subscription {
  email: EmailField;
}

export interface IUser {
  /**
   * The name of the user
   *
   * @example John Doe
   * @minlength 3
   * @maxlength 50
   */

  name: string;
  /**
   * A  password  following criteria :
   * - At least 8 characters long (you can adjust this as needed).
   * - At least one uppercase letter (A-Z).
   * - At least one lowercase letter (a-z).
   * - At least one digit (0-9).
   * - At least one special character (e.g., @#$%^&*).
   * @pattern ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
   */
  password: string;
  /**
   * The ID of the associated team
   *
   * @pattern ^[a-f\d]{24}$
   */
  teamId: string | undefined;
  email: EmailField;
}

export type LoginUser = Pick<IUser, "email" | "password">;

/**
 * User data to be safely used on the client
 */
export type IClientUser = Omit<IUser, "password">;
export interface IAuthenticatedRequest extends Request {
  email: string;
}

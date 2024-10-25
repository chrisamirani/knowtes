import { Request } from "express";

/**
 * @pattern ^[^@]+@[^@]+\.[^@]+$
 * @example johndoe@gmail.com
 */
export type EmailField = string;

/**
 * The ID of the associated team
 *
 * @pattern ^[a-f\d]{24}$
 * @example 671ba7b1f9ed4ba58f0752ca
 */
export type TDocumentId = string;

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

  teamId: TDocumentId | undefined;
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

type UnknownObject = Record<string, unknown>;
type TText = {
  text: string;
} & UnknownObject;
type TDescendant = TElement | TText;
type TElement = {
  children: TDescendant[];
  type: string;
} & UnknownObject;

type TNoteBody = TElement[];

export interface INote {
  id: TDocumentId | undefined;
  /**
   * The title of the note.
   *
   * @example API deployment specs
   * @minlength 5
   * @maxlength 100
   */

  title: string;

  /**
   * This is the content value compatible with PlateJS framework
   * which can be used in the PlateEditor to be rendered.
   *
   * @example [{type:'p', children:[{text:'hello'}]}]
   */
  body: TNoteBody;
}

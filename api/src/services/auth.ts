import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types";

export const generateToken = (
  payload: ITokenPayload,
  expiresIn: number | undefined
) => {
  return jwt.sign(payload, process.env.SECRET!, {
    expiresIn: expiresIn ?? "365d",
  });
};

export function verifyToken(token: string): ITokenPayload | undefined {
  try {
    const payload = jwt.verify(token, process.env.SECRET!);
    if (!payload) {
      return;
    }

    return payload as ITokenPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

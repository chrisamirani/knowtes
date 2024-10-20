import jwt from "jsonwebtoken";
export const getUserJWT = (email: string) => {
  return jwt.sign({ email }, process.env.SECRET!);
};

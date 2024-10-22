import jwt from "jsonwebtoken";
export const generateToken = (email: string) => {
  return jwt.sign({ email }, process.env.SECRET!);
};

export function verifyToken(token: string): { email: string } | undefined {
  try {
    const payload = jwt.verify(token, process.env.SECRET!);
    if (!payload) {
      return;
    }

    return payload as { email: string };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

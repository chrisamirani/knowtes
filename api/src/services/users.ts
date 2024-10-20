import { UsersDB } from "../db/user";
import { SignupUser } from "../types";
import bcrypt from "bcryptjs";

export const signUpNewUser = async (user: SignupUser) => {
  // Check if the email already exists
  const existingUser = await UsersDB.findOne({ email: user.email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new UsersDB({ ...user, password: hashedPassword });

  await newUser.save();

  //TODO: send confirmation email
};

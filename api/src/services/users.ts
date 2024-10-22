import { UsersDB } from "../db/user";
import { IClientUser, IUser, LoginUser } from "../types";
import bcrypt from "bcryptjs";
import { sendEmailConfirmationEmail } from "./email";
import { generateToken } from "./auth";

export const signUpNewUser = async (user: IUser) => {
  const { email, password } = user;
  // Check if the email already exists
  const existingUser = await UsersDB.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  const newUser = new UsersDB({ ...user, password: hashedPassword });

  await newUser.save();

  const token = generateToken(email);

  sendEmailConfirmationEmail(user.email, token);
};

export const loginUser = async (user: LoginUser) => {
  const { email, password } = user;
  // Check if the email already exists
  const existingUser = await UsersDB.findOne<IUser | null>({ email });
  if (!existingUser) {
    throw new Error("Invalid user");
  }

  const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);

  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }

  const token = generateToken(email);

  return token;
};

export const getClientUserByEmail = async (
  email: string
): Promise<IClientUser> => {
  const user = await UsersDB.findOne<IUser | null>({ email });
  if (!user) {
    throw new Error("Invalid user");
  }

  return { email: user.email, name: user.name, teamId: user.teamId };
};

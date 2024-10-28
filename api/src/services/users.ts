import { UsersDB } from "../db/user";
import { IClientUser, IUser, LoginUser } from "../types";
import bcrypt from "bcryptjs";
import { sendEmailConfirmationEmail, sendInvitationEmail } from "./email";
import { generateToken } from "./auth";
import { TeamDB } from "../db/team";

export const signUpNewUser = async (user: IUser) => {
  const { email, password } = user;
  // Check if the email already exists
  const existingUser = await UsersDB.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  const newUser = new UsersDB({ ...user, password: hashedPassword });

  const newTeam = new TeamDB({ owner: newUser.id });

  newUser.team = newTeam.id;

  await newUser.save();
  await newTeam.save();

  const token = generateToken({ email, team: newTeam.id }, undefined);

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

  const token = generateToken({ email, team: existingUser.team }, undefined);

  return token;
};

export const getClientUserByEmail = async (
  email: string
): Promise<IClientUser> => {
  const user = await UsersDB.findOne<IUser | null>({ email });
  if (!user) {
    throw new Error("Invalid user");
  }

  return { email: user.email, name: user.name, team: user.team };
};

export const inviteNewTeamMember = async (
  email: string,
  ownerEmail: string
) => {
  try {
    const existingUser = await UsersDB.findOne<IUser | null>({
      email: ownerEmail,
    });
    if (!existingUser) {
      throw new Error("Invalid user");
    }
    //generate a token that expires in 24 hours
    const token = generateToken(
      { email, team: existingUser.team },
      60 * 60 * 24
    );

    sendInvitationEmail(email, token);
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Could not send invitation");
  }
};

export const signupInvitedUser = async (user: IUser, team: string) => {
  const { email, password } = user;
  try {
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    const newUser = new UsersDB({ ...user, team, password: hashedPassword });

    await newUser.save();

    const token = generateToken({ email, team }, undefined);

    sendEmailConfirmationEmail(user.email, token);
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Could signup invited user");
  }
};

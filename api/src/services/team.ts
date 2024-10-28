import { TeamDB } from "../db/team";
import { UsersDB } from "../db/user";

export const findTeamMembers = async (teamId: string) => {
  try {
    const users = await UsersDB.find({ team: teamId });
    if (users.length === 0) {
      throw new Error("No users found");
    }

    const team = await TeamDB.findOne({ _id: teamId });
    if (!team) {
      throw new Error("Team was not found");
    }

    return users.map((user) => ({
      id: user.id,
      name: user.name!,
      isOwner: String(user.id) === String(team.owner),
      email: user.email!,
      team: teamId!,
    }));
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Could not get recent notes");
  }
};

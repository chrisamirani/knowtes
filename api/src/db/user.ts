import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    team: { type: mongoose.Schema.ObjectId, rel: "Team", require: true },
  },
  { timestamps: true }
);

export const UsersDB = mongoose.model("User", usersSchema);

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, default: "My team" },
    owner: { type: mongoose.Schema.ObjectId, rel: "User", require: true },
  },
  { timestamps: true }
);

export const TeamDB = mongoose.model("Team", teamSchema);

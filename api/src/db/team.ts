import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, default: "My team" },
    owner: { type: mongoose.Schema.ObjectId, rel: "User", require: true },
    usedStorage: { type: Number, default: 0 },
    plan: { type: String, default: "free" },
  },
  { timestamps: true }
);

export const TeamDB = mongoose.model("Team", teamSchema);

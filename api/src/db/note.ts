import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.ObjectId, rel: "User", require: true },
    team: { type: mongoose.Schema.ObjectId, rel: "Team", require: true },
    title: { type: String, default: "Enter title", require: true },
    body: { type: Array, default: [], require: true },
    plainBody: { type: String, default: "", require: true },
    embedding: { type: [Number], default: [] },
  },
  { timestamps: true }
);

export const NoteDB = mongoose.model("Note", noteSchema);

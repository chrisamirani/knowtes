import { NoteDB } from "../db/note";
import { UsersDB } from "../db/user";
import { INote } from "../types";

export const initNewNote = async (email: string, note: INote) => {
  try {
    const owner = await UsersDB.findOne({ email });
    if (!owner) {
      throw new Error("User does not exist");
    }
    const newNote = new NoteDB({
      ...note,
      creator: owner.id,
      team: owner.team,
    });

    await newNote.save();
    return newNote.id;
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Could not initialize note");
  }
};

export const updateNote = async (email: string, newNote: INote) => {
  try {
    const user = await UsersDB.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }
    const updatedNote = await NoteDB.updateOne(
      { _id: newNote.id, team: user.team },
      newNote
    );

    if (updatedNote.modifiedCount === 0) {
      throw new Error("Could find a match");
    }
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Could not update note");
  }
};

export const getRecentNotes = async (email: string) => {
  try {
    const user = await UsersDB.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }
    const notes = await NoteDB.find({ team: user.team }, "title")
      .limit(10)
      .sort("updatedAt");

    return notes.map((note) => ({ id: note.id, title: note.title }));
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Could not get recent notes");
  }
};

export const getNoteById = async (email: string, _id: string) => {
  try {
    const user = await UsersDB.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }
    const note = await NoteDB.findOne({ _id, team: user.team });

    if (!note) {
      throw new Error("Could not find note");
    }

    return {
      id: note.id,
      title: note.title,
      body: note.body,
    };
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Could not get recent notes");
  }
};

import { NoteDB } from "../db/note";
import { INote, TDescendant, TNoteBody } from "../types";

// TODO: This is a hack until they properly support TS
const TransformersApi = Function('return import("@xenova/transformers")')();

let cachedPipeline: any = undefined;

const model = "Xenova/all-MiniLM-L6-v2";
function extractPlainText(noteBody: TNoteBody): string {
  function traverse(element: TDescendant): string {
    if ("text" in element) {
      return (element.text as string) ?? "";
    } else if ("children" in element) {
      return element.children.map(traverse).join("");
    }
    return "";
  }

  return noteBody.map(traverse).join("");
}
export const saveEmbeddingOnNote = async (note: INote) => {
  if (!cachedPipeline) {
    const { pipeline } = await TransformersApi;
    cachedPipeline = pipeline;
  }
  const plainText = extractPlainText(note.body);
  const embedder = await cachedPipeline("feature-extraction", model);
  const results = await embedder(plainText, {
    pooling: "mean",
    normalize: true,
  });
  const embedding = Array.from(results.data);
  await NoteDB.updateOne({ _id: note.id }, { embedding, plainBody: plainText });
};

export const getTextEmbedding = async (text: string) => {
  if (!cachedPipeline) {
    const { pipeline } = await TransformersApi;
    cachedPipeline = pipeline;
  }
  const embedder = await cachedPipeline("feature-extraction", model);
  const results = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(results.data) as number[];
};

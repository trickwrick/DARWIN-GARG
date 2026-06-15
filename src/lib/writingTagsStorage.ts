import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  DEFAULT_WRITING_TAG_RECORDS,
  type WritingTagRecord,
} from "@/data/writingTags";

const DB_NAME = "godsbook";
const COLLECTION = "writingtags";
const DOC_KEY = "main";
const FILE_PATH = path.join(process.cwd(), "data", "writing-tags.json");

export function mergeWritingTagsWithDefaults(
  partial: Partial<{ tags: WritingTagRecord[] }>
): WritingTagRecord[] {
  return partial.tags?.length ? partial.tags : DEFAULT_WRITING_TAG_RECORDS;
}

async function readFromMongo(): Promise<WritingTagRecord[] | null> {
  if (!process.env.MONGODB_URI) {
    return null;
  }

  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;
  const doc = await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .findOne({ key: DOC_KEY });

  if (!doc?.content) {
    return null;
  }

  return mergeWritingTagsWithDefaults(
    doc.content as { tags?: WritingTagRecord[] }
  );
}

async function writeToMongo(tags: WritingTagRecord[]): Promise<void> {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;

  await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .updateOne(
      { key: DOC_KEY },
      {
        $set: {
          key: DOC_KEY,
          content: { tags },
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
}

async function readFromFile(): Promise<WritingTagRecord[] | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as { tags?: WritingTagRecord[] };
    return mergeWritingTagsWithDefaults(parsed);
  } catch {
    return null;
  }
}

async function writeToFile(tags: WritingTagRecord[]): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify({ tags }, null, 2), "utf-8");
}

export async function loadWritingTags(): Promise<WritingTagRecord[]> {
  try {
    const mongoTags = await readFromMongo();
    if (mongoTags) {
      return mongoTags;
    }
  } catch (error) {
    console.error("Failed to load writing tags from MongoDB:", error);
  }

  const fileTags = await readFromFile();
  if (fileTags) {
    return fileTags;
  }

  return DEFAULT_WRITING_TAG_RECORDS;
}

export async function persistWritingTags(
  tags: WritingTagRecord[]
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(tags);
    return { success: true, message: "Tag saved successfully." };
  } catch (mongoError) {
    console.error("Failed to save writing tags to MongoDB:", mongoError);

    try {
      await writeToFile(tags);
      return {
        success: true,
        message: "Tag saved locally. Database connection is unavailable.",
      };
    } catch (fileError) {
      console.error("Failed to save writing tags to file:", fileError);
      return {
        success: false,
        message: "Failed to save tag. Please try again.",
      };
    }
  }
}

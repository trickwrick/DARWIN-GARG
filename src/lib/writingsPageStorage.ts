import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  DEFAULT_WRITINGS_PAGE_CONTENT,
  type WritingsPageContent,
} from "@/data/writingsPage";

const DB_NAME = "godsbook";
const COLLECTION = "writingspage";
const DOC_KEY = "main";
const FILE_PATH = path.join(process.cwd(), "data", "writings-page-content.json");

export function mergeWritingsPageWithDefaults(
  partial: Partial<WritingsPageContent>
): WritingsPageContent {
  return {
    hero: { ...DEFAULT_WRITINGS_PAGE_CONTENT.hero, ...partial.hero },
    featured: { ...DEFAULT_WRITINGS_PAGE_CONTENT.featured, ...partial.featured },
    writings:
      partial.writings?.length
        ? partial.writings
        : DEFAULT_WRITINGS_PAGE_CONTENT.writings,
    emptyState:
      partial.emptyState?.trim() || DEFAULT_WRITINGS_PAGE_CONTENT.emptyState,
    newsletter: {
      ...DEFAULT_WRITINGS_PAGE_CONTENT.newsletter,
      ...partial.newsletter,
    },
    essays:
      partial.essays?.length
        ? partial.essays
        : DEFAULT_WRITINGS_PAGE_CONTENT.essays,
  };
}

async function readFromMongo(): Promise<WritingsPageContent | null> {
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

  return mergeWritingsPageWithDefaults(
    doc.content as Partial<WritingsPageContent>
  );
}

async function writeToMongo(content: WritingsPageContent): Promise<void> {
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
          content,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
}

async function readFromFile(): Promise<WritingsPageContent | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    return mergeWritingsPageWithDefaults(
      JSON.parse(raw) as Partial<WritingsPageContent>
    );
  } catch {
    return null;
  }
}

async function writeToFile(content: WritingsPageContent): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function loadWritingsPageContent(): Promise<WritingsPageContent> {
  try {
    const mongoContent = await readFromMongo();
    if (mongoContent) {
      return mongoContent;
    }
  } catch (error) {
    console.error("Failed to load writings page from MongoDB:", error);
  }

  const fileContent = await readFromFile();
  if (fileContent) {
    return fileContent;
  }

  return DEFAULT_WRITINGS_PAGE_CONTENT;
}

export async function persistWritingsPageContent(
  content: WritingsPageContent
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(content);
    return { success: true, message: "Writings page saved successfully." };
  } catch (mongoError) {
    console.error("Failed to save writings page to MongoDB:", mongoError);

    try {
      await writeToFile(content);
      return {
        success: true,
        message: "Writings page saved locally. Database connection is unavailable.",
      };
    } catch (fileError) {
      console.error("Failed to save writings page to file:", fileError);
      return {
        success: false,
        message: "Failed to save writings page. Please try again.",
      };
    }
  }
}

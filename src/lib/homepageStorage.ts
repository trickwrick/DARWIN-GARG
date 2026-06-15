import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  DEFAULT_HOMEPAGE_CONTENT,
  type HomepageContent,
} from "@/data/homepage";

const DB_NAME = "godsbook";
const COLLECTION = "homepage";
const DOC_KEY = "main";
const FILE_PATH = path.join(process.cwd(), "data", "homepage-content.json");

export function mergeWithDefaults(
  partial: Partial<HomepageContent>
): HomepageContent {
  return {
    author: { ...DEFAULT_HOMEPAGE_CONTENT.author, ...partial.author },
    book: { ...DEFAULT_HOMEPAGE_CONTENT.book, ...partial.book },
    readerVoices: {
      ...DEFAULT_HOMEPAGE_CONTENT.readerVoices,
      ...partial.readerVoices,
      testimonials:
        partial.readerVoices?.testimonials?.length
          ? partial.readerVoices.testimonials
          : DEFAULT_HOMEPAGE_CONTENT.readerVoices.testimonials,
    },
    aboutAuthor: {
      ...DEFAULT_HOMEPAGE_CONTENT.aboutAuthor,
      ...partial.aboutAuthor,
    },
    footer: { ...DEFAULT_HOMEPAGE_CONTENT.footer, ...partial.footer },
    socialLinks:
      partial.socialLinks?.length
        ? partial.socialLinks
        : DEFAULT_HOMEPAGE_CONTENT.socialLinks,
  };
}

async function readFromMongo(): Promise<HomepageContent | null> {
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

  return mergeWithDefaults(doc.content as Partial<HomepageContent>);
}

async function writeToMongo(content: HomepageContent): Promise<void> {
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

async function readFromFile(): Promise<HomepageContent | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    return mergeWithDefaults(JSON.parse(raw) as Partial<HomepageContent>);
  } catch {
    return null;
  }
}

async function writeToFile(content: HomepageContent): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function loadHomepageContent(): Promise<HomepageContent> {
  try {
    const mongoContent = await readFromMongo();
    if (mongoContent) {
      return mongoContent;
    }
  } catch (error) {
    console.error("Failed to load homepage from MongoDB:", error);
  }

  const fileContent = await readFromFile();
  if (fileContent) {
    return fileContent;
  }

  return DEFAULT_HOMEPAGE_CONTENT;
}

export async function persistHomepageContent(
  content: HomepageContent
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(content);
    return { success: true, message: "Homepage saved successfully." };
  } catch (mongoError) {
    console.error("Failed to save homepage to MongoDB:", mongoError);

    try {
      await writeToFile(content);
      return {
        success: true,
        message: "Homepage saved locally. Database connection is unavailable.",
      };
    } catch (fileError) {
      console.error("Failed to save homepage to file:", fileError);
      return {
        success: false,
        message: "Failed to save homepage. Please try again.",
      };
    }
  }
}

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  DEFAULT_ABOUT_PAGE_CONTENT,
  type AboutPageContent,
} from "@/data/aboutPage";

const DB_NAME = "godsbook";
const COLLECTION = "aboutpage";
const DOC_KEY = "main";
const FILE_PATH = path.join(process.cwd(), "data", "about-page-content.json");

export function mergeAboutPageWithDefaults(
  partial: Partial<AboutPageContent>
): AboutPageContent {
  return {
    hero: { ...DEFAULT_ABOUT_PAGE_CONTENT.hero, ...partial.hero },
    intro: {
      ...DEFAULT_ABOUT_PAGE_CONTENT.intro,
      ...partial.intro,
      paragraphs:
        partial.intro?.paragraphs?.filter(Boolean).length
          ? partial.intro.paragraphs
          : DEFAULT_ABOUT_PAGE_CONTENT.intro.paragraphs,
    },
    story: {
      ...DEFAULT_ABOUT_PAGE_CONTENT.story,
      ...partial.story,
      paragraphs:
        partial.story?.paragraphs?.filter(Boolean).length
          ? partial.story.paragraphs
          : DEFAULT_ABOUT_PAGE_CONTENT.story.paragraphs,
    },
    photos: {
      ...DEFAULT_ABOUT_PAGE_CONTENT.photos,
      ...partial.photos,
      items:
        partial.photos?.items?.length
          ? partial.photos.items
          : DEFAULT_ABOUT_PAGE_CONTENT.photos.items,
    },
    beyond: {
      ...DEFAULT_ABOUT_PAGE_CONTENT.beyond,
      ...partial.beyond,
      paragraphs:
        partial.beyond?.paragraphs?.filter(Boolean).length
          ? partial.beyond.paragraphs
          : DEFAULT_ABOUT_PAGE_CONTENT.beyond.paragraphs,
    },
  };
}

async function readFromMongo(): Promise<AboutPageContent | null> {
  if (!process.env.MONGODB_URI) return null;
  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;
  const doc = await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .findOne({ key: DOC_KEY });
  if (!doc?.content) return null;
  return mergeAboutPageWithDefaults(doc.content as Partial<AboutPageContent>);
}

async function writeToMongo(content: AboutPageContent): Promise<void> {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;
  await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .updateOne(
      { key: DOC_KEY },
      { $set: { key: DOC_KEY, content, updatedAt: new Date() } },
      { upsert: true }
    );
}

async function readFromFile(): Promise<AboutPageContent | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    return mergeAboutPageWithDefaults(JSON.parse(raw) as Partial<AboutPageContent>);
  } catch {
    return null;
  }
}

async function writeToFile(content: AboutPageContent): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function loadAboutPageContent(): Promise<AboutPageContent> {
  try {
    const mongo = await readFromMongo();
    if (mongo) return mongo;
  } catch (error) {
    console.error("Failed to load about page from MongoDB:", error);
  }
  const file = await readFromFile();
  return file ?? DEFAULT_ABOUT_PAGE_CONTENT;
}

export async function persistAboutPageContent(
  content: AboutPageContent
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(content);
    return { success: true, message: "About page saved successfully." };
  } catch (mongoError) {
    console.error("Failed to save about page to MongoDB:", mongoError);
    try {
      await writeToFile(content);
      return {
        success: true,
        message: "About page saved locally. Database connection is unavailable.",
      };
    } catch {
      return { success: false, message: "Failed to save about page. Please try again." };
    }
  }
}

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  DEFAULT_CONTACT_PAGE_CONTENT,
  type ContactPageContent,
} from "@/data/contactPage";

const DB_NAME = "godsbook";
const COLLECTION = "contactpage";
const DOC_KEY = "main";
const FILE_PATH = path.join(process.cwd(), "data", "contact-page-content.json");

export function mergeContactPageWithDefaults(
  partial: Partial<ContactPageContent>
): ContactPageContent {
  return {
    hero: { ...DEFAULT_CONTACT_PAGE_CONTENT.hero, ...partial.hero },
    cards:
      partial.cards?.length ? partial.cards : DEFAULT_CONTACT_PAGE_CONTENT.cards,
    form: {
      ...DEFAULT_CONTACT_PAGE_CONTENT.form,
      ...partial.form,
      options:
        partial.form?.options?.length
          ? partial.form.options
          : DEFAULT_CONTACT_PAGE_CONTENT.form.options,
    },
    elsewhere: {
      ...DEFAULT_CONTACT_PAGE_CONTENT.elsewhere,
      ...partial.elsewhere,
    },
    newsletter: {
      ...DEFAULT_CONTACT_PAGE_CONTENT.newsletter,
      ...partial.newsletter,
    },
    socialLinks:
      partial.socialLinks?.length
        ? partial.socialLinks
        : DEFAULT_CONTACT_PAGE_CONTENT.socialLinks,
  };
}

async function readFromMongo(): Promise<ContactPageContent | null> {
  if (!process.env.MONGODB_URI) return null;
  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;
  const doc = await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .findOne({ key: DOC_KEY });
  if (!doc?.content) return null;
  return mergeContactPageWithDefaults(doc.content as Partial<ContactPageContent>);
}

async function writeToMongo(content: ContactPageContent): Promise<void> {
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

async function readFromFile(): Promise<ContactPageContent | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    return mergeContactPageWithDefaults(JSON.parse(raw) as Partial<ContactPageContent>);
  } catch {
    return null;
  }
}

async function writeToFile(content: ContactPageContent): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function loadContactPageContent(): Promise<ContactPageContent> {
  try {
    const mongo = await readFromMongo();
    if (mongo) return mongo;
  } catch (error) {
    console.error("Failed to load contact page from MongoDB:", error);
  }
  const file = await readFromFile();
  return file ?? DEFAULT_CONTACT_PAGE_CONTENT;
}

export async function persistContactPageContent(
  content: ContactPageContent
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(content);
    return { success: true, message: "Connect page saved successfully." };
  } catch (mongoError) {
    console.error("Failed to save contact page to MongoDB:", mongoError);
    try {
      await writeToFile(content);
      return {
        success: true,
        message: "Connect page saved locally. Database connection is unavailable.",
      };
    } catch {
      return { success: false, message: "Failed to save connect page. Please try again." };
    }
  }
}

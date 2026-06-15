import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  DEFAULT_JOURNEY_PAGE_CONTENT,
  type JourneyChapterContent,
  type JourneyPageContent,
} from "@/data/journeyPage";

const DB_NAME = "godsbook";
const COLLECTION = "journeypage";
const DOC_KEY = "main";
const FILE_PATH = path.join(process.cwd(), "data", "journey-page-content.json");

function sanitizeOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function mergeChapter(
  partial: Partial<JourneyChapterContent>,
  fallback: JourneyChapterContent
): JourneyChapterContent {
  const chapter: JourneyChapterContent = {
    label: partial.label?.trim() || fallback.label,
    year: partial.year?.trim() || fallback.year,
    title: partial.title?.trim() || fallback.title,
    body: partial.body?.trim() || fallback.body,
  };

  const bodyPlaceholder = sanitizeOptionalString(partial.bodyPlaceholder);
  const emphasisWord = sanitizeOptionalString(partial.emphasisWord);
  const quote = sanitizeOptionalString(partial.quote);
  const readerQuote = sanitizeOptionalString(partial.readerQuote);

  if (bodyPlaceholder) chapter.bodyPlaceholder = bodyPlaceholder;
  if (emphasisWord) chapter.emphasisWord = emphasisWord;
  if (quote) chapter.quote = quote;
  if (readerQuote) chapter.readerQuote = readerQuote;

  if (partial.image?.src?.trim()) {
    chapter.image = {
      src: partial.image.src.trim(),
      alt: partial.image.alt?.trim() || fallback.image?.alt || "",
      caption: partial.image.caption?.trim() || fallback.image?.caption || "",
    };
  }

  if (partial.coverDrafts?.length) {
    const drafts = partial.coverDrafts
      .filter((item) => item.src?.trim())
      .map((item) => ({
        src: item.src.trim(),
        alt: item.alt?.trim() || "",
        caption: item.caption?.trim() || "",
      }));
    if (drafts.length) {
      chapter.coverDrafts = drafts;
    }
  }

  return chapter;
}

export function mergeJourneyPageWithDefaults(
  partial: Partial<JourneyPageContent>
): JourneyPageContent {
  const defaultChapters = DEFAULT_JOURNEY_PAGE_CONTENT.chapters;

  return {
    hero: { ...DEFAULT_JOURNEY_PAGE_CONTENT.hero, ...partial.hero },
    chapters:
      partial.chapters?.length
        ? partial.chapters.map((chapter, index) =>
            mergeChapter(chapter, defaultChapters[index] ?? defaultChapters[0])
          )
        : defaultChapters,
    cta: { ...DEFAULT_JOURNEY_PAGE_CONTENT.cta, ...partial.cta },
  };
}

async function readFromMongo(): Promise<JourneyPageContent | null> {
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

  return mergeJourneyPageWithDefaults(doc.content as Partial<JourneyPageContent>);
}

async function writeToMongo(content: JourneyPageContent): Promise<void> {
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

async function readFromFile(): Promise<JourneyPageContent | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    return mergeJourneyPageWithDefaults(
      JSON.parse(raw) as Partial<JourneyPageContent>
    );
  } catch {
    return null;
  }
}

async function writeToFile(content: JourneyPageContent): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function loadJourneyPageContent(): Promise<JourneyPageContent> {
  try {
    const mongoContent = await readFromMongo();
    if (mongoContent) {
      return mongoContent;
    }
  } catch (error) {
    console.error("Failed to load journey page from MongoDB:", error);
  }

  const fileContent = await readFromFile();
  if (fileContent) {
    return fileContent;
  }

  return DEFAULT_JOURNEY_PAGE_CONTENT;
}

export async function persistJourneyPageContent(
  content: JourneyPageContent
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(content);
    return { success: true, message: "Journey page saved successfully." };
  } catch (mongoError) {
    console.error("Failed to save journey page to MongoDB:", mongoError);

    try {
      await writeToFile(content);
      return {
        success: true,
        message: "Journey page saved locally. Database connection is unavailable.",
      };
    } catch (fileError) {
      console.error("Failed to save journey page to file:", fileError);
      return {
        success: false,
        message: "Failed to save journey page. Please try again.",
      };
    }
  }
}

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  DEFAULT_BOOK_PAGE_CONTENT,
  type BookPageContent,
} from "@/data/bookPage";

const DB_NAME = "godsbook";
const COLLECTION = "bookpage";
const DOC_KEY = "main";
const FILE_PATH = path.join(process.cwd(), "data", "book-page-content.json");

function mergeParagraphs(
  paragraphs: string[] | undefined,
  fallback: string[]
): string[] {
  return paragraphs?.filter((item) => item.trim()).length
    ? paragraphs.filter((item) => item.trim())
    : fallback;
}

export function mergeBookPageWithDefaults(
  partial: Partial<BookPageContent>
): BookPageContent {
  return {
    hero: { ...DEFAULT_BOOK_PAGE_CONTENT.hero, ...partial.hero },
    premise: {
      ...DEFAULT_BOOK_PAGE_CONTENT.premise,
      ...partial.premise,
      paragraphs: mergeParagraphs(
        partial.premise?.paragraphs,
        DEFAULT_BOOK_PAGE_CONTENT.premise.paragraphs
      ),
    },
    audience: {
      ...DEFAULT_BOOK_PAGE_CONTENT.audience,
      ...partial.audience,
      paragraphs: mergeParagraphs(
        partial.audience?.paragraphs,
        DEFAULT_BOOK_PAGE_CONTENT.audience.paragraphs
      ),
    },
    structure: {
      ...DEFAULT_BOOK_PAGE_CONTENT.structure,
      ...partial.structure,
      avatars:
        partial.structure?.avatars?.length
          ? partial.structure.avatars
          : DEFAULT_BOOK_PAGE_CONTENT.structure.avatars,
    },
    inside: {
      ...DEFAULT_BOOK_PAGE_CONTENT.inside,
      ...partial.inside,
      paragraphs: mergeParagraphs(
        partial.inside?.paragraphs,
        DEFAULT_BOOK_PAGE_CONTENT.inside.paragraphs
      ),
    },
    toc: { ...DEFAULT_BOOK_PAGE_CONTENT.toc, ...partial.toc },
    excerpt: {
      ...DEFAULT_BOOK_PAGE_CONTENT.excerpt,
      ...partial.excerpt,
      paragraphs: mergeParagraphs(
        partial.excerpt?.paragraphs,
        DEFAULT_BOOK_PAGE_CONTENT.excerpt.paragraphs
      ),
    },
    reviews: {
      ...DEFAULT_BOOK_PAGE_CONTENT.reviews,
      ...partial.reviews,
      items:
        partial.reviews?.items?.length
          ? partial.reviews.items
          : DEFAULT_BOOK_PAGE_CONTENT.reviews.items,
    },
    faq: {
      ...DEFAULT_BOOK_PAGE_CONTENT.faq,
      ...partial.faq,
      items:
        partial.faq?.items?.length
          ? partial.faq.items
          : DEFAULT_BOOK_PAGE_CONTENT.faq.items,
    },
    explore: {
      ...DEFAULT_BOOK_PAGE_CONTENT.explore,
      ...partial.explore,
      links:
        partial.explore?.links?.length
          ? partial.explore.links
          : DEFAULT_BOOK_PAGE_CONTENT.explore.links,
    },
    press: { ...DEFAULT_BOOK_PAGE_CONTENT.press, ...partial.press },
    retailers: { ...DEFAULT_BOOK_PAGE_CONTENT.retailers, ...partial.retailers },
  };
}

async function readFromMongo(): Promise<BookPageContent | null> {
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

  return mergeBookPageWithDefaults(doc.content as Partial<BookPageContent>);
}

async function writeToMongo(content: BookPageContent): Promise<void> {
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

async function readFromFile(): Promise<BookPageContent | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    return mergeBookPageWithDefaults(JSON.parse(raw) as Partial<BookPageContent>);
  } catch {
    return null;
  }
}

async function writeToFile(content: BookPageContent): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function loadBookPageContent(): Promise<BookPageContent> {
  try {
    const mongoContent = await readFromMongo();
    if (mongoContent) {
      return mongoContent;
    }
  } catch (error) {
    console.error("Failed to load book page from MongoDB:", error);
  }

  const fileContent = await readFromFile();
  if (fileContent) {
    return fileContent;
  }

  return DEFAULT_BOOK_PAGE_CONTENT;
}

export async function persistBookPageContent(
  content: BookPageContent
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(content);
    return { success: true, message: "Book page saved successfully." };
  } catch (mongoError) {
    console.error("Failed to save book page to MongoDB:", mongoError);

    try {
      await writeToFile(content);
      return {
        success: true,
        message: "Book page saved locally. Database connection is unavailable.",
      };
    } catch (fileError) {
      console.error("Failed to save book page to file:", fileError);
      return {
        success: false,
        message: "Failed to save book page. Please try again.",
      };
    }
  }
}

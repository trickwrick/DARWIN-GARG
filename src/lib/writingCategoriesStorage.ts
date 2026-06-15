import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  DEFAULT_WRITING_CATEGORY_RECORDS,
  type WritingCategoryRecord,
} from "@/data/writingCategories";

const DB_NAME = "godsbook";
const COLLECTION = "writingcategories";
const DOC_KEY = "main";
const FILE_PATH = path.join(
  process.cwd(),
  "data",
  "writing-categories.json"
);

export function mergeWritingCategoriesWithDefaults(
  partial: Partial<{ categories: WritingCategoryRecord[] }>
): WritingCategoryRecord[] {
  return partial.categories?.length
    ? partial.categories
    : DEFAULT_WRITING_CATEGORY_RECORDS;
}

async function readFromMongo(): Promise<WritingCategoryRecord[] | null> {
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

  return mergeWritingCategoriesWithDefaults(
    doc.content as { categories?: WritingCategoryRecord[] }
  );
}

async function writeToMongo(categories: WritingCategoryRecord[]): Promise<void> {
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
          content: { categories },
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
}

async function readFromFile(): Promise<WritingCategoryRecord[] | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as { categories?: WritingCategoryRecord[] };
    return mergeWritingCategoriesWithDefaults(parsed);
  } catch {
    return null;
  }
}

async function writeToFile(categories: WritingCategoryRecord[]): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(
    FILE_PATH,
    JSON.stringify({ categories }, null, 2),
    "utf-8"
  );
}

export async function loadWritingCategories(): Promise<WritingCategoryRecord[]> {
  try {
    const mongoCategories = await readFromMongo();
    if (mongoCategories) {
      return mongoCategories;
    }
  } catch (error) {
    console.error("Failed to load writing categories from MongoDB:", error);
  }

  const fileCategories = await readFromFile();
  if (fileCategories) {
    return fileCategories;
  }

  return DEFAULT_WRITING_CATEGORY_RECORDS;
}

export async function persistWritingCategories(
  categories: WritingCategoryRecord[]
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(categories);
    return { success: true, message: "Category saved successfully." };
  } catch (mongoError) {
    console.error("Failed to save writing categories to MongoDB:", mongoError);

    try {
      await writeToFile(categories);
      return {
        success: true,
        message: "Category saved locally. Database connection is unavailable.",
      };
    } catch (fileError) {
      console.error("Failed to save writing categories to file:", fileError);
      return {
        success: false,
        message: "Failed to save category. Please try again.",
      };
    }
  }
}

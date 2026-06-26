import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { ContactInquiry, ContactInquiryStatus } from "@/data/contactInquiry";

const DB_NAME = "godsbook";
const COLLECTION = "contactinquiries";
const FILE_PATH = path.join(process.cwd(), "data", "contact-inquiries.json");

function sortNewestFirst(items: ContactInquiry[]): ContactInquiry[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

async function readFromMongo(): Promise<ContactInquiry[] | null> {
  if (!process.env.MONGODB_URI) return null;
  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;
  const docs = await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    id: String(doc.id),
    name: String(doc.name ?? ""),
    email: String(doc.email ?? ""),
    subject: String(doc.subject ?? ""),
    subjectLabel: String(doc.subjectLabel ?? ""),
    message: String(doc.message ?? ""),
    status: doc.status === "resolved" ? "resolved" : "pending",
    createdAt: String(doc.createdAt ?? new Date().toISOString()),
  }));
}

async function writeToMongo(inquiry: ContactInquiry): Promise<void> {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;
  await client.db(DB_NAME).collection(COLLECTION).insertOne(inquiry);
}

async function updateInMongo(
  id: string,
  status: ContactInquiryStatus
): Promise<boolean> {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;
  const result = await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .updateOne({ id }, { $set: { status } });
  return result.matchedCount > 0;
}

async function deleteFromMongo(id: string): Promise<boolean> {
  if (!process.env.MONGODB_URI) return false;
  const { default: clientPromise } = await import("@/lib/mongodb");
  const client = await clientPromise;
  const result = await client
    .db(DB_NAME)
    .collection(COLLECTION)
    .deleteOne({ id });
  return result.deletedCount > 0;
}

async function readFromFile(): Promise<ContactInquiry[] | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as ContactInquiry[];
    return Array.isArray(parsed) ? sortNewestFirst(parsed) : [];
  } catch {
    return null;
  }
}

async function writeToFile(inquiries: ContactInquiry[]): Promise<void> {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(inquiries, null, 2), "utf-8");
}

export async function loadContactInquiries(): Promise<ContactInquiry[]> {
  try {
    const mongo = await readFromMongo();
    if (mongo) return mongo;
  } catch (error) {
    console.error("Failed to load contact inquiries from MongoDB:", error);
  }

  const file = await readFromFile();
  return file ?? [];
}

export async function addContactInquiry(
  inquiry: ContactInquiry
): Promise<{ success: boolean; message: string }> {
  try {
    await writeToMongo(inquiry);
    return { success: true, message: "Inquiry saved." };
  } catch (mongoError) {
    console.error("Failed to save contact inquiry to MongoDB:", mongoError);
    try {
      const existing = (await readFromFile()) ?? [];
      await writeToFile(sortNewestFirst([inquiry, ...existing]));
      return {
        success: true,
        message: "Inquiry saved locally. Database connection is unavailable.",
      };
    } catch {
      return {
        success: false,
        message: "Failed to save your message. Please try again.",
      };
    }
  }
}

export async function updateContactInquiryStatus(
  id: string,
  status: ContactInquiryStatus
): Promise<{ success: boolean; message: string }> {
  try {
    const updated = await updateInMongo(id, status);
    if (updated) {
      return { success: true, message: "Inquiry updated." };
    }
  } catch (mongoError) {
    console.error("Failed to update contact inquiry in MongoDB:", mongoError);
  }

  try {
    const existing = (await readFromFile()) ?? [];
    const index = existing.findIndex((item) => item.id === id);
    if (index === -1) {
      return { success: false, message: "Inquiry not found." };
    }
    existing[index] = { ...existing[index], status };
    await writeToFile(existing);
    return { success: true, message: "Inquiry updated." };
  } catch {
    return { success: false, message: "Failed to update inquiry." };
  }
}

export async function deleteContactInquiry(
  id: string
): Promise<{ success: boolean; message: string }> {
  let mongoDeleted = false;

  try {
    mongoDeleted = await deleteFromMongo(id);
  } catch (mongoError) {
    console.error("Failed to delete contact inquiry from MongoDB:", mongoError);
  }

  try {
    const existing = (await readFromFile()) ?? [];
    const next = existing.filter((item) => item.id !== id);
    if (next.length !== existing.length) {
      await writeToFile(next);
      return { success: true, message: "Inquiry deleted." };
    }
  } catch (fileError) {
    console.error("Failed to delete contact inquiry from file:", fileError);
  }

  if (mongoDeleted) {
    return { success: true, message: "Inquiry deleted." };
  }

  return { success: false, message: "Inquiry not found." };
}

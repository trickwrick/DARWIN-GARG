import { loadBookPageContent } from "@/lib/bookPageStorage";
import type { BookPageContent } from "@/data/bookPage";

export async function getBookPageContent(): Promise<BookPageContent> {
  return loadBookPageContent();
}

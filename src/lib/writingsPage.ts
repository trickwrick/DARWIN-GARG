import { loadWritingsPageContent } from "@/lib/writingsPageStorage";
import type { Essay } from "@/data/essays";
import type { WritingsPageContent } from "@/data/writingsPage";

export async function getWritingsPageContent(): Promise<WritingsPageContent> {
  return loadWritingsPageContent();
}

export async function getEssayBySlug(slug: string): Promise<Essay | undefined> {
  const content = await loadWritingsPageContent();
  return content.essays.find((essay) => essay.slug === slug);
}

export async function getAllEssaySlugsFromContent(): Promise<string[]> {
  const content = await loadWritingsPageContent();
  return content.essays.map((essay) => essay.slug).filter(Boolean);
}

import {
  loadHomepageContent,
  mergeWithDefaults,
} from "@/lib/homepageStorage";
import type { HomepageContent } from "@/data/homepage";

export { mergeWithDefaults };

export async function getHomepageContent(): Promise<HomepageContent> {
  return loadHomepageContent();
}

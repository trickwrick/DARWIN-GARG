import { loadJourneyPageContent } from "@/lib/journeyPageStorage";
import type { JourneyPageContent } from "@/data/journeyPage";

export async function getJourneyPageContent(): Promise<JourneyPageContent> {
  return loadJourneyPageContent();
}

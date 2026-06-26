import { loadAboutPageContent } from "@/lib/aboutPageStorage";

export async function getAboutPageContent() {
  return loadAboutPageContent();
}

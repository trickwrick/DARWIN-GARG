import { loadContactPageContent } from "@/lib/contactPageStorage";

export async function getContactPageContent() {
  return loadContactPageContent();
}

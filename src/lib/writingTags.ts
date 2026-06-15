import { loadWritingTags } from "@/lib/writingTagsStorage";

export async function getWritingTags() {
  return loadWritingTags();
}

export async function getActiveWritingTagNames() {
  const tags = await loadWritingTags();
  return tags
    .filter((tag) => tag.status === "ACTIVE")
    .map((tag) => tag.name);
}

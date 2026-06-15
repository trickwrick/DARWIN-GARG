import type { WritingStatus } from "@/data/essays";
import { SUGGESTED_WRITING_TAGS } from "@/data/writingsPage";

export type TagStatus = WritingStatus;

export type WritingTagRecord = {
  id: string;
  name: string;
  status: TagStatus;
};

export type WritingTagForm = {
  name: string;
  status: TagStatus;
};

export const DEFAULT_WRITING_TAG_RECORDS: WritingTagRecord[] =
  SUGGESTED_WRITING_TAGS.map((name) => ({
    id: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    name,
    status: "ACTIVE",
  }));

export function emptyTagForm(): WritingTagForm {
  return {
    name: "",
    status: "ACTIVE",
  };
}

export function tagToForm(record: WritingTagRecord): WritingTagForm {
  return {
    name: record.name,
    status: record.status,
  };
}

export function slugifyTagId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

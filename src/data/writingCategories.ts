import type { WritingStatus } from "@/data/essays";
import { writingCategories } from "@/data/writings";

export type CategoryStatus = WritingStatus;

export type WritingCategoryRecord = {
  id: string;
  name: string;
  parentId: string | null;
  image: string;
  imageAlt: string;
  status: CategoryStatus;
};

export type WritingCategoryForm = {
  name: string;
  parentId: string;
  image: string;
  imageAlt: string;
  status: CategoryStatus;
};

export const MAIN_CATEGORY_VALUE = "main";

export const DEFAULT_WRITING_CATEGORY_RECORDS: WritingCategoryRecord[] =
  writingCategories
    .filter((name) => name !== "All")
    .map((name) => ({
    id: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    name,
    parentId: null,
    image: "",
    imageAlt: "",
    status: "ACTIVE",
  }));

export function emptyCategoryForm(): WritingCategoryForm {
  return {
    name: "",
    parentId: MAIN_CATEGORY_VALUE,
    image: "",
    imageAlt: "",
    status: "ACTIVE",
  };
}

export function categoryToForm(record: WritingCategoryRecord): WritingCategoryForm {
  return {
    name: record.name,
    parentId: record.parentId ?? MAIN_CATEGORY_VALUE,
    image: record.image,
    imageAlt: record.imageAlt,
    status: record.status,
  };
}

export function slugifyCategoryId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

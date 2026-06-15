import { loadWritingCategories } from "@/lib/writingCategoriesStorage";

export async function getWritingCategories() {
  return loadWritingCategories();
}

export async function getActiveWritingCategoryNames() {
  const categories = await loadWritingCategories();
  return categories
    .filter((category) => category.status === "ACTIVE")
    .map((category) => category.name);
}

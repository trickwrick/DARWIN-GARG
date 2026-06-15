"use server";

import { revalidatePath } from "next/cache";
import {
  emptyCategoryForm,
  MAIN_CATEGORY_VALUE,
  slugifyCategoryId,
  type CategoryStatus,
  type WritingCategoryForm,
  type WritingCategoryRecord,
} from "@/data/writingCategories";
import { loadWritingCategories, persistWritingCategories } from "@/lib/writingCategoriesStorage";

function sanitizeForm(input: WritingCategoryForm): WritingCategoryForm {
  return {
    name: input.name.trim(),
    parentId: input.parentId?.trim() || MAIN_CATEGORY_VALUE,
    image: input.image.trim(),
    imageAlt: input.imageAlt.trim(),
    status: input.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
  };
}

export async function getWritingCategoriesForAdmin() {
  return loadWritingCategories();
}

export async function saveWritingCategory(input: {
  form: WritingCategoryForm;
  editingId?: string;
}) {
  const form = sanitizeForm(input.form);

  if (!form.name) {
    return { success: false, message: "Category name is required." };
  }

  const categories = await loadWritingCategories();
  const editingId = input.editingId?.trim();
  const duplicate = categories.some(
    (category) =>
      category.name.toLowerCase() === form.name.toLowerCase() &&
      category.id !== editingId
  );

  if (duplicate) {
    return { success: false, message: "This category name already exists." };
  }

  const parentId =
    form.parentId === MAIN_CATEGORY_VALUE ? null : form.parentId;

  if (parentId && parentId === editingId) {
    return { success: false, message: "A category cannot be its own parent." };
  }

  const record: WritingCategoryRecord = {
    id: editingId || slugifyCategoryId(form.name) || `category-${Date.now()}`,
    name: form.name,
    parentId,
    image: form.image,
    imageAlt: form.imageAlt,
    status: form.status as CategoryStatus,
  };

  let updated = [...categories];
  const index = editingId
    ? updated.findIndex((category) => category.id === editingId)
    : -1;

  if (index >= 0) {
    updated[index] = record;
  } else {
    if (updated.some((category) => category.id === record.id)) {
      record.id = `${record.id}-${Date.now()}`;
    }
    updated = [...updated, record];
  }

  const result = await persistWritingCategories(updated);

  if (result.success) {
    revalidatePath("/admin/writings/categories");
    revalidatePath("/admin/writings");
    revalidatePath("/admin/writings/new");
    revalidatePath("/blog");
  }

  return { ...result, categories: updated };
}

export async function deleteWritingCategory(id: string) {
  const categories = await loadWritingCategories();
  const updated = categories.filter((category) => category.id !== id);

  if (updated.length === categories.length) {
    return { success: false, message: "Category not found." };
  }

  const result = await persistWritingCategories(updated);

  if (result.success) {
    revalidatePath("/admin/writings/categories");
    revalidatePath("/blog");
  }

  return { ...result, categories: updated };
}

export { emptyCategoryForm };

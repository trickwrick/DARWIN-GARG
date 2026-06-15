"use server";

import { revalidatePath } from "next/cache";
import {
  slugifyTagId,
  type TagStatus,
  type WritingTagForm,
  type WritingTagRecord,
} from "@/data/writingTags";
import { loadWritingTags, persistWritingTags } from "@/lib/writingTagsStorage";

function sanitizeForm(input: WritingTagForm): WritingTagForm {
  return {
    name: input.name.trim(),
    status: input.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
  };
}

export async function getWritingTagsForAdmin() {
  return loadWritingTags();
}

export async function saveWritingTag(input: {
  form: WritingTagForm;
  editingId?: string;
}) {
  const form = sanitizeForm(input.form);

  if (!form.name) {
    return { success: false, message: "Tag name is required." };
  }

  const tags = await loadWritingTags();
  const editingId = input.editingId?.trim();
  const duplicate = tags.some(
    (tag) =>
      tag.name.toLowerCase() === form.name.toLowerCase() && tag.id !== editingId
  );

  if (duplicate) {
    return { success: false, message: "This tag name already exists." };
  }

  const record: WritingTagRecord = {
    id: editingId || slugifyTagId(form.name) || `tag-${Date.now()}`,
    name: form.name,
    status: form.status as TagStatus,
  };

  let updated = [...tags];
  const index = editingId ? updated.findIndex((tag) => tag.id === editingId) : -1;

  if (index >= 0) {
    updated[index] = record;
  } else {
    if (updated.some((tag) => tag.id === record.id)) {
      record.id = `${record.id}-${Date.now()}`;
    }
    updated = [...updated, record];
  }

  const result = await persistWritingTags(updated);

  if (result.success) {
    revalidatePath("/admin/writings/tags");
    revalidatePath("/admin/writings");
    revalidatePath("/admin/writings/new");
    revalidatePath("/blog");
  }

  return { ...result, tags: updated };
}

export async function deleteWritingTag(id: string) {
  const tags = await loadWritingTags();
  const updated = tags.filter((tag) => tag.id !== id);

  if (updated.length === tags.length) {
    return { success: false, message: "Tag not found." };
  }

  const result = await persistWritingTags(updated);

  if (result.success) {
    revalidatePath("/admin/writings/tags");
    revalidatePath("/blog");
  }

  return { ...result, tags: updated };
}

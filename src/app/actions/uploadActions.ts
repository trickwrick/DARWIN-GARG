"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function uploadAdminImage(formData: FormData) {
  try {
    const file = formData.get("image") as File | null;

    if (!file || !file.name) {
      return { success: false, message: "Please choose an image file." };
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return {
        success: false,
        message: "Only JPG, PNG, WebP, or GIF images are allowed.",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, message: "Image must be smaller than 8 MB." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadsDir, { recursive: true });

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "");
    const filename = `${uniqueSuffix}-${safeName}`;
    const filepath = path.join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    return {
      success: true,
      message: "Image uploaded successfully.",
      url: `/uploads/${filename}`,
    };
  } catch (error) {
    console.error("Failed to upload admin image:", error);
    return { success: false, message: "Failed to upload image. Try again." };
  }
}

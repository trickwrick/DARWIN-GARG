"use server";

import { revalidatePath } from "next/cache";
import {
  DEFAULT_WRITINGS_PAGE_CONTENT,
  type WritingsPageContent,
  type WritingsPostForm,
  type WritingCategory,
  WRITING_CATEGORIES,
} from "@/data/writingsPage";
import type { Essay, EssayFaq, EssaySeo } from "@/data/essays";
import { getWritingsPageContent } from "@/lib/writingsPage";
import { persistWritingsPageContent } from "@/lib/writingsPageStorage";

function sanitizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function sanitizeHtml(value: string): string {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "");
}

function sanitizeFaq(input: EssayFaq): EssayFaq | null {
  const question = input.question?.trim();
  const answerHtml = sanitizeHtml(input.answerHtml ?? "");
  const hasAnswer =
    answerHtml.replace(/<[^>]+>/g, "").trim().length > 0;
  if (!question && !hasAnswer) return null;
  return {
    id: input.id || `faq-${Date.now()}`,
    question: question ?? "",
    answerHtml,
  };
}

function sanitizeSeo(input: EssaySeo | undefined): EssaySeo {
  return {
    metaTitle: (input?.metaTitle ?? "").trim().slice(0, 70),
    metaKeywords: (input?.metaKeywords ?? "").trim().slice(0, 160),
    metaDescription: (input?.metaDescription ?? "").trim().slice(0, 250),
    otherMeta: (input?.otherMeta ?? "").trim(),
  };
}

function sanitizeForm(input: WritingsPostForm): WritingsPostForm {
  const category = WRITING_CATEGORIES.includes(input.category as WritingCategory)
    ? input.category
    : "Essays";

  return {
    slug: sanitizeSlug(input.slug),
    title: input.title.trim(),
    date: input.date.trim(),
    category,
    shortDescription: input.shortDescription.trim(),
    bodyHtml: sanitizeHtml(input.bodyHtml ?? ""),
    readTime: input.readTime.trim() || "5 min read",
    image: input.image.trim(),
    imageAlt: input.imageAlt.trim(),
    author: input.author.trim() || "Darwin Garg",
    tags: (input.tags ?? []).map((tag) => tag.trim()).filter(Boolean).slice(0, 20),
    status: input.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
    isFeatured: Boolean(input.isFeatured),
    faqs: (input.faqs ?? [])
      .map((faq) => sanitizeFaq(faq))
      .filter((faq): faq is EssayFaq => faq !== null)
      .slice(0, 20),
    seo: sanitizeSeo(input.seo),
  };
}

function formToEssay(form: WritingsPostForm): Essay {
  return {
    slug: form.slug,
    category: form.category,
    date: form.date,
    readTime: form.readTime,
    title: form.title,
    dek: form.shortDescription,
    image: form.image,
    imageAlt: form.imageAlt,
    author: form.author,
    blocks: [{ type: "paragraph", text: "" }],
    bodyHtml: form.bodyHtml,
    faqs: form.faqs,
    seo: form.seo,
    tags: form.tags,
    status: form.status,
  };
}

function applyPostToContent(
  content: WritingsPageContent,
  form: WritingsPostForm,
  originalSlug?: string
): WritingsPageContent {
  const essay = formToEssay(form);
  const oldSlug = originalSlug?.trim() || form.slug;

  let essays = content.essays.filter((item) => item.slug !== oldSlug);
  const existingIndex = essays.findIndex((item) => item.slug === form.slug);
  if (existingIndex >= 0) {
    essays[existingIndex] = essay;
  } else {
    essays = [...essays, essay];
  }

  const writingCard = {
    id: `writing-${form.slug}`,
    slug: form.slug,
    category: form.category,
    date: form.date,
    title: form.title,
    description: form.shortDescription,
    image: form.image,
    imageAlt: form.imageAlt,
    status: form.status,
  };

  let writings = content.writings.filter((item) => item.slug !== oldSlug);
  const writingIndex = writings.findIndex((item) => item.slug === form.slug);
  if (writingIndex >= 0) {
    writings[writingIndex] = {
      ...writings[writingIndex],
      ...writingCard,
      id: writings[writingIndex].id,
    };
  } else if (form.slug !== content.featured.slug || !form.isFeatured) {
    writings = [...writings, writingCard];
  }

  let featured = { ...content.featured };
  if (form.isFeatured) {
    featured = {
      slug: form.slug,
      category: form.category,
      date: form.date,
      readTime: form.readTime,
      title: form.title,
      excerpt: form.shortDescription,
      linkText: featured.linkText || "Read the essay",
      image: form.image,
      imageAlt: form.imageAlt,
    };
  } else if (featured.slug === oldSlug && featured.slug === form.slug) {
    // keep featured metadata in sync when still featured by another path
  } else if (featured.slug === oldSlug && oldSlug !== form.slug) {
    featured = { ...featured, slug: form.slug, title: form.title };
  }

  if (!form.isFeatured && featured.slug === oldSlug) {
    // If un-featured, leave featured as-is until user picks another featured post.
  }

  return {
    ...content,
    essays,
    writings,
    featured,
  };
}

export async function saveWritingPost(input: {
  form: WritingsPostForm;
  originalSlug?: string;
}) {
  const form = sanitizeForm(input.form);

  if (!form.title) {
    return { success: false, message: "Blog title is required." };
  }

  if (!form.slug) {
    return { success: false, message: "Blog URL is required." };
  }

  if (!form.seo.metaTitle) {
    return { success: false, message: "Meta title is required for SEO." };
  }

  const content = await getWritingsPageContent();
  const oldSlug = input.originalSlug?.trim();
  const slugTaken = content.essays.some(
    (essay) => essay.slug === form.slug && essay.slug !== oldSlug
  );

  if (slugTaken) {
    return { success: false, message: "This blog URL is already in use." };
  }

  const updated = applyPostToContent(content, form, oldSlug);

  if (!updated.writings.length) {
    updated.writings = DEFAULT_WRITINGS_PAGE_CONTENT.writings;
  }
  if (!updated.essays.length) {
    updated.essays = DEFAULT_WRITINGS_PAGE_CONTENT.essays;
  }

  const result = await persistWritingsPageContent(updated);

  if (result.success) {
    revalidatePath("/blog");
    revalidatePath("/admin/writings");
    revalidatePath(`/admin/writings/${form.slug}/edit`);
    if (oldSlug && oldSlug !== form.slug) {
      revalidatePath(`/blog/${oldSlug}`);
    }
    revalidatePath(`/blog/${form.slug}`);
  }

  return result;
}

export async function deleteWritingPost(slug: string) {
  if (!slug) {
    return { success: false, message: "Slug is required." };
  }

  const content = await getWritingsPageContent();

  const essayExists = content.essays.some((e) => e.slug === slug);
  if (!essayExists) {
    return { success: false, message: "Writing not found." };
  }

  const essays = content.essays.filter((e) => e.slug !== slug);
  const writings = content.writings.filter((w) => w.slug !== slug);

  // If deleted post was featured, fall back to the first remaining writing
  let featured = { ...content.featured };
  if (featured.slug === slug) {
    const fallback = writings[0];
    if (fallback) {
      featured = {
        ...featured,
        slug: fallback.slug,
        title: fallback.title,
        category: fallback.category,
        date: fallback.date,
        image: fallback.image,
        imageAlt: fallback.imageAlt,
        excerpt: fallback.description,
      };
    }
  }

  const updated: WritingsPageContent = { ...content, essays, writings, featured };

  const result = await persistWritingsPageContent(updated);

  if (result.success) {
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/writings");
  }

  return result;
}

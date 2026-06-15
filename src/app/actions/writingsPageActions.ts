"use server";

import { revalidatePath } from "next/cache";
import {
  DEFAULT_WRITINGS_PAGE_CONTENT,
  WRITING_CATEGORIES,
  type Essay,
  type EssayBlock,
  type WritingsPageContent,
  type WritingCategory,
  type WritingStatus,
} from "@/data/writingsPage";
import { getWritingsPageContent } from "@/lib/writingsPage";
import { persistWritingsPageContent } from "@/lib/writingsPageStorage";

function sanitizeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function sanitizeCategory(value: unknown, fallback: WritingCategory): WritingCategory {
  return WRITING_CATEGORIES.includes(value as WritingCategory)
    ? (value as WritingCategory)
    : fallback;
}

function sanitizeBlock(input: EssayBlock): EssayBlock | null {
  switch (input.type) {
    case "paragraph":
      return input.text?.trim()
        ? { type: "paragraph", text: input.text.trim() }
        : null;
    case "heading":
      return input.text?.trim()
        ? { type: "heading", text: input.text.trim() }
        : null;
    case "quote": {
      const text = input.text?.trim();
      if (!text) return null;
      const attribution = input.attribution?.trim();
      return attribution
        ? { type: "quote", text, attribution }
        : { type: "quote", text };
    }
    case "list": {
      const items = (input.items ?? [])
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean);
      return items.length ? { type: "list", items } : null;
    }
    default:
      return null;
  }
}

function sanitizeEssay(input: Essay, fallback: Essay): Essay {
  const blocks = (input.blocks ?? [])
    .map((block) => sanitizeBlock(block))
    .filter((block): block is EssayBlock => block !== null);

  return {
    slug: sanitizeString(input.slug, fallback.slug),
    category: sanitizeCategory(input.category, fallback.category as WritingCategory),
    date: sanitizeString(input.date, fallback.date),
    readTime: sanitizeString(input.readTime, fallback.readTime),
    title: sanitizeString(input.title, fallback.title),
    dek: sanitizeString(input.dek, fallback.dek),
    image: sanitizeString(input.image, fallback.image),
    imageAlt: sanitizeString(input.imageAlt, fallback.imageAlt),
    imageCaption: input.imageCaption?.trim() || fallback.imageCaption,
    author: sanitizeString(input.author, fallback.author),
    blocks: blocks.length ? blocks : fallback.blocks,
    bodyHtml: typeof input.bodyHtml === "string" ? input.bodyHtml : fallback.bodyHtml,
    faqs: Array.isArray(input.faqs) ? input.faqs : fallback.faqs,
    seo: input.seo ?? fallback.seo,
    tags: Array.isArray(input.tags) ? input.tags : fallback.tags,
    status: input.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
  };
}

function sanitizeContent(input: WritingsPageContent): WritingsPageContent {
  const defaults = DEFAULT_WRITINGS_PAGE_CONTENT;

  const essays = (input.essays ?? [])
    .map((essay, index) =>
      sanitizeEssay(essay, defaults.essays[index] ?? defaults.essays[0])
    )
    .filter((essay) => essay.slug && essay.title)
    .slice(0, 20);

  return {
    hero: {
      eyebrow: sanitizeString(input.hero?.eyebrow, defaults.hero.eyebrow),
      title: sanitizeString(input.hero?.title, defaults.hero.title),
      subtitle: sanitizeString(input.hero?.subtitle, defaults.hero.subtitle),
    },
    featured: {
      slug: sanitizeString(input.featured?.slug, defaults.featured.slug),
      category: sanitizeCategory(
        input.featured?.category,
        defaults.featured.category
      ),
      date: sanitizeString(input.featured?.date, defaults.featured.date),
      readTime: sanitizeString(input.featured?.readTime, defaults.featured.readTime),
      title: sanitizeString(input.featured?.title, defaults.featured.title),
      excerpt: sanitizeString(input.featured?.excerpt, defaults.featured.excerpt),
      linkText: sanitizeString(input.featured?.linkText, defaults.featured.linkText),
      image: sanitizeString(input.featured?.image, defaults.featured.image),
      imageAlt: sanitizeString(input.featured?.imageAlt, defaults.featured.imageAlt),
    },
    writings: (input.writings ?? [])
      .map((item, index) => ({
        id: sanitizeString(item.id, defaults.writings[index]?.id ?? `writing-${index}`),
        slug: sanitizeString(item.slug, defaults.writings[index]?.slug ?? ""),
        category: sanitizeCategory(
          item.category,
          defaults.writings[index]?.category ?? "Essays"
        ),
        date: sanitizeString(item.date, defaults.writings[index]?.date ?? ""),
        title: sanitizeString(item.title, ""),
        description: sanitizeString(item.description, ""),
        image: sanitizeString(item.image, ""),
        imageAlt: sanitizeString(item.imageAlt, ""),
        status: (item.status === "INACTIVE" ? "INACTIVE" : "ACTIVE") as WritingStatus,
      }))
      .filter((item) => item.slug && item.title)
      .slice(0, 20),
    emptyState: sanitizeString(input.emptyState, defaults.emptyState),
    newsletter: {
      eyebrow: sanitizeString(
        input.newsletter?.eyebrow,
        defaults.newsletter.eyebrow
      ),
      title: sanitizeString(input.newsletter?.title, defaults.newsletter.title),
      note: sanitizeString(input.newsletter?.note, defaults.newsletter.note),
      placeholder: sanitizeString(
        input.newsletter?.placeholder,
        defaults.newsletter.placeholder
      ),
      buttonText: sanitizeString(
        input.newsletter?.buttonText,
        defaults.newsletter.buttonText
      ),
    },
    essays: essays.length ? essays : defaults.essays,
  };
}

export async function getWritingsPageContentForAdmin() {
  return getWritingsPageContent();
}

export async function saveWritingsPageContent(input: WritingsPageContent) {
  const content = sanitizeContent(input);

  if (!content.writings.length) {
    content.writings = DEFAULT_WRITINGS_PAGE_CONTENT.writings;
  }
  if (!content.essays.length) {
    content.essays = DEFAULT_WRITINGS_PAGE_CONTENT.essays;
  }

  const result = await persistWritingsPageContent(content);

  if (result.success) {
    revalidatePath("/blog");
    revalidatePath("/admin/writings");
    for (const essay of content.essays) {
      revalidatePath(`/blog/${essay.slug}`);
    }
  }

  return result;
}

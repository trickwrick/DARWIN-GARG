"use server";

import { revalidatePath } from "next/cache";
import {
  DEFAULT_ABOUT_PAGE_CONTENT,
  type AboutPageContent,
} from "@/data/aboutPage";
import { getAboutPageContent } from "@/lib/aboutPage";
import { persistAboutPageContent } from "@/lib/aboutPageStorage";

function sanitizeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function sanitizeParagraphs(value: string[] | undefined, fallback: string[]) {
  const items = (value ?? []).map((item) => sanitizeString(item, "")).filter(Boolean);
  return items.length ? items : fallback;
}

function sanitizeContent(input: AboutPageContent): AboutPageContent {
  const defaults = DEFAULT_ABOUT_PAGE_CONTENT;
  return {
    hero: {
      eyebrow: sanitizeString(input.hero?.eyebrow, defaults.hero.eyebrow),
      title: sanitizeString(input.hero?.title, defaults.hero.title),
      subtitle: sanitizeString(input.hero?.subtitle, defaults.hero.subtitle),
    },
    intro: {
      portraitImage: sanitizeString(
        input.intro?.portraitImage,
        defaults.intro.portraitImage
      ),
      portraitAlt: sanitizeString(input.intro?.portraitAlt, defaults.intro.portraitAlt),
      paragraphs: sanitizeParagraphs(
        input.intro?.paragraphs,
        defaults.intro.paragraphs
      ),
    },
    story: {
      eyebrow: sanitizeString(input.story?.eyebrow, defaults.story.eyebrow),
      paragraphs: sanitizeParagraphs(
        input.story?.paragraphs,
        defaults.story.paragraphs
      ),
    },
    photos: {
      eyebrow: sanitizeString(input.photos?.eyebrow, defaults.photos.eyebrow),
      title: sanitizeString(input.photos?.title, defaults.photos.title),
      items: (input.photos?.items ?? [])
        .map((item, index) => ({
          src: sanitizeString(item.src, defaults.photos.items[index]?.src ?? ""),
          alt: sanitizeString(item.alt, defaults.photos.items[index]?.alt ?? ""),
          caption: sanitizeString(
            item.caption,
            defaults.photos.items[index]?.caption ?? ""
          ),
        }))
        .filter((item) => item.src)
        .slice(0, 12),
    },
    beyond: {
      eyebrow: sanitizeString(input.beyond?.eyebrow, defaults.beyond.eyebrow),
      paragraphs: sanitizeParagraphs(
        input.beyond?.paragraphs,
        defaults.beyond.paragraphs
      ),
      buttonText: sanitizeString(
        input.beyond?.buttonText,
        defaults.beyond.buttonText
      ),
      buttonHref: sanitizeString(
        input.beyond?.buttonHref,
        defaults.beyond.buttonHref
      ),
    },
  };
}

export async function getAboutPageContentForAdmin() {
  return getAboutPageContent();
}

export async function saveAboutPageContent(input: AboutPageContent) {
  const content = sanitizeContent(input);
  if (!content.photos.items.length) {
    content.photos.items = DEFAULT_ABOUT_PAGE_CONTENT.photos.items;
  }
  const result = await persistAboutPageContent(content);
  if (result.success) {
    revalidatePath("/about");
    revalidatePath("/admin/about");
  }
  return result;
}

"use server";

import { revalidatePath } from "next/cache";
import {
  DEFAULT_JOURNEY_PAGE_CONTENT,
  type JourneyChapterContent,
  type JourneyPageContent,
} from "@/data/journeyPage";
import { getJourneyPageContent } from "@/lib/journeyPage";
import { persistJourneyPageContent } from "@/lib/journeyPageStorage";

function sanitizeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function sanitizeOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function sanitizeChapter(
  input: JourneyChapterContent,
  fallback: JourneyChapterContent
): JourneyChapterContent {
  const chapter: JourneyChapterContent = {
    label: sanitizeString(input.label, fallback.label),
    year: sanitizeString(input.year, fallback.year),
    title: sanitizeString(input.title, fallback.title),
    body: sanitizeString(input.body, fallback.body),
  };

  const bodyPlaceholder = sanitizeOptionalString(input.bodyPlaceholder);
  const emphasisWord = sanitizeOptionalString(input.emphasisWord);
  const quote = sanitizeOptionalString(input.quote);
  const readerQuote = sanitizeOptionalString(input.readerQuote);

  if (bodyPlaceholder) chapter.bodyPlaceholder = bodyPlaceholder;
  if (emphasisWord) chapter.emphasisWord = emphasisWord;
  if (quote) chapter.quote = quote;
  if (readerQuote) chapter.readerQuote = readerQuote;

  if (input.image?.src?.trim()) {
    chapter.image = {
      src: input.image.src.trim(),
      alt: sanitizeString(input.image.alt, ""),
      caption: sanitizeString(input.image.caption, ""),
    };
  }

  if (input.coverDrafts?.length) {
    const drafts = input.coverDrafts
      .filter((item) => item.src?.trim())
      .map((item) => ({
        src: item.src.trim(),
        alt: sanitizeString(item.alt, ""),
        caption: sanitizeString(item.caption, ""),
      }))
      .slice(0, 6);
    if (drafts.length) {
      chapter.coverDrafts = drafts;
    }
  }

  return chapter;
}

function sanitizeContent(input: JourneyPageContent): JourneyPageContent {
  const defaults = DEFAULT_JOURNEY_PAGE_CONTENT;

  const chapters = (input.chapters ?? [])
    .map((chapter, index) =>
      sanitizeChapter(
        chapter,
        defaults.chapters[index] ?? defaults.chapters[0]
      )
    )
    .filter((chapter) => chapter.title && chapter.body)
    .slice(0, 12);

  return {
    hero: {
      eyebrow: sanitizeString(input.hero?.eyebrow, defaults.hero.eyebrow),
      titleLine1: sanitizeString(
        input.hero?.titleLine1,
        defaults.hero.titleLine1
      ),
      titleLine2: sanitizeString(
        input.hero?.titleLine2,
        defaults.hero.titleLine2
      ),
      subtitle: sanitizeString(input.hero?.subtitle, defaults.hero.subtitle),
    },
    chapters: chapters.length ? chapters : defaults.chapters,
    cta: {
      text: sanitizeString(input.cta?.text, defaults.cta.text),
      buttonText: sanitizeString(input.cta?.buttonText, defaults.cta.buttonText),
      buttonHref: sanitizeString(input.cta?.buttonHref, defaults.cta.buttonHref),
    },
  };
}

export async function getJourneyPageContentForAdmin() {
  return getJourneyPageContent();
}

export async function saveJourneyPageContent(input: JourneyPageContent) {
  const content = sanitizeContent(input);
  const result = await persistJourneyPageContent(content);

  if (result.success) {
    revalidatePath("/journey");
    revalidatePath("/admin/journey");
  }

  return result;
}

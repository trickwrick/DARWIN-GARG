"use server";

import { revalidatePath } from "next/cache";
import {
  DEFAULT_BOOK_PAGE_CONTENT,
  type BookPageContent,
} from "@/data/bookPage";
import { getBookPageContent } from "@/lib/bookPage";
import { persistBookPageContent } from "@/lib/bookPageStorage";

function sanitizeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function sanitizeParagraphs(value: string[] | undefined, fallback: string[]) {
  const items = (value ?? [])
    .map((item) => sanitizeString(item, ""))
    .filter(Boolean);
  return items.length ? items : fallback;
}

function sanitizeContent(input: BookPageContent): BookPageContent {
  const defaults = DEFAULT_BOOK_PAGE_CONTENT;

  return {
    hero: {
      eyebrow: sanitizeString(input.hero?.eyebrow, defaults.hero.eyebrow),
      title: sanitizeString(input.hero?.title, defaults.hero.title),
      tagline: sanitizeString(input.hero?.tagline, defaults.hero.tagline),
      authorName: sanitizeString(input.hero?.authorName, defaults.hero.authorName),
      authorLink: sanitizeString(input.hero?.authorLink, defaults.hero.authorLink),
      authorSuffix: sanitizeString(input.hero?.authorSuffix, defaults.hero.authorSuffix),
      ratingText: sanitizeString(input.hero?.ratingText, defaults.hero.ratingText),
      description: sanitizeString(input.hero?.description, defaults.hero.description),
      amazonLink: sanitizeString(input.hero?.amazonLink, defaults.hero.amazonLink),
      primaryButtonText: sanitizeString(
        input.hero?.primaryButtonText,
        defaults.hero.primaryButtonText
      ),
      secondaryButtonText: sanitizeString(
        input.hero?.secondaryButtonText,
        defaults.hero.secondaryButtonText
      ),
      secondaryButtonHref: sanitizeString(
        input.hero?.secondaryButtonHref,
        defaults.hero.secondaryButtonHref
      ),
    },
    premise: {
      eyebrow: sanitizeString(input.premise?.eyebrow, defaults.premise.eyebrow),
      title: sanitizeString(input.premise?.title, defaults.premise.title),
      paragraphs: sanitizeParagraphs(
        input.premise?.paragraphs,
        defaults.premise.paragraphs
      ),
    },
    audience: {
      eyebrow: sanitizeString(input.audience?.eyebrow, defaults.audience.eyebrow),
      title: sanitizeString(input.audience?.title, defaults.audience.title),
      paragraphs: sanitizeParagraphs(
        input.audience?.paragraphs,
        defaults.audience.paragraphs
      ),
    },
    structure: {
      eyebrow: sanitizeString(input.structure?.eyebrow, defaults.structure.eyebrow),
      title: sanitizeString(input.structure?.title, defaults.structure.title),
      intro: sanitizeString(input.structure?.intro, defaults.structure.intro),
      avatars: (input.structure?.avatars ?? [])
        .map((item) => ({
          name: sanitizeString(item.name, ""),
          crisis: sanitizeString(item.crisis, ""),
        }))
        .filter((item) => item.name && item.crisis)
        .slice(0, 10),
    },
    inside: {
      eyebrow: sanitizeString(input.inside?.eyebrow, defaults.inside.eyebrow),
      title: sanitizeString(input.inside?.title, defaults.inside.title),
      paragraphs: sanitizeParagraphs(
        input.inside?.paragraphs,
        defaults.inside.paragraphs
      ),
    },
    toc: {
      eyebrow: sanitizeString(input.toc?.eyebrow, defaults.toc.eyebrow),
      title: sanitizeString(input.toc?.title, defaults.toc.title),
    },
    excerpt: {
      eyebrow: sanitizeString(input.excerpt?.eyebrow, defaults.excerpt.eyebrow),
      title: sanitizeString(input.excerpt?.title, defaults.excerpt.title),
      paragraphs: sanitizeParagraphs(
        input.excerpt?.paragraphs,
        defaults.excerpt.paragraphs
      ),
      linkText: sanitizeString(input.excerpt?.linkText, defaults.excerpt.linkText),
      linkHref: sanitizeString(input.excerpt?.linkHref, defaults.excerpt.linkHref),
    },
    reviews: {
      eyebrow: sanitizeString(input.reviews?.eyebrow, defaults.reviews.eyebrow),
      title: sanitizeString(input.reviews?.title, defaults.reviews.title),
      items: (input.reviews?.items ?? [])
        .map((item) => ({
          quote: sanitizeString(item.quote, ""),
          attribution: sanitizeString(item.attribution, "A reader"),
        }))
        .filter((item) => item.quote)
        .slice(0, 8),
    },
    faq: {
      eyebrow: sanitizeString(input.faq?.eyebrow, defaults.faq.eyebrow),
      title: sanitizeString(input.faq?.title, defaults.faq.title),
      items: (input.faq?.items ?? [])
        .map((item) => ({
          question: sanitizeString(item.question, ""),
          answer: sanitizeString(item.answer, ""),
        }))
        .filter((item) => item.question && item.answer)
        .slice(0, 12),
    },
    explore: {
      eyebrow: sanitizeString(input.explore?.eyebrow, defaults.explore.eyebrow),
      title: sanitizeString(input.explore?.title, defaults.explore.title),
      links: (input.explore?.links ?? [])
        .map((item) => ({
          text: sanitizeString(item.text, ""),
          href: sanitizeString(item.href, ""),
        }))
        .filter((item) => item.text && item.href)
        .slice(0, 6),
    },
    press: {
      text: sanitizeString(input.press?.text, defaults.press.text),
      linkText: sanitizeString(input.press?.linkText, defaults.press.linkText),
      linkHref: sanitizeString(input.press?.linkHref, defaults.press.linkHref),
    },
    retailers: {
      title: sanitizeString(input.retailers?.title, defaults.retailers.title),
      formats: sanitizeString(input.retailers?.formats, defaults.retailers.formats),
      stores: (input.retailers?.stores ?? [])
        .map((store, index) => ({
          label: sanitizeString(store.label, defaults.retailers.stores[index]?.label ?? ""),
          href: sanitizeString(store.href, defaults.retailers.stores[index]?.href ?? ""),
          accent:
            store.accent === "amazon" ||
            store.accent === "barnes" ||
            store.accent === "flipkart"
              ? store.accent
              : defaults.retailers.stores[index]?.accent ?? "amazon",
          markets: (store.markets ?? [])
            .map((market) => ({
              name: sanitizeString(market.name, ""),
              region:
                market.region === "US" ||
                market.region === "IN" ||
                market.region === "UK"
                  ? market.region
                  : "US",
              href: sanitizeString(market.href, ""),
              inStock: market.inStock !== false,
            }))
            .filter((market) => market.name && market.href)
            .slice(0, 6),
        }))
        .filter((store) => store.label && store.href)
        .slice(0, 8),
      extra: (input.retailers?.extra ?? [])
        .map((item) => ({
          label: sanitizeString(item.label, ""),
          href: sanitizeString(item.href, ""),
        }))
        .filter((item) => item.label && item.href)
        .slice(0, 8),
    },
  };
}

export async function getBookPageContentForAdmin() {
  return getBookPageContent();
}

export async function saveBookPageContent(input: BookPageContent) {
  const content = sanitizeContent(input);

  if (!content.structure.avatars.length) {
    content.structure.avatars = DEFAULT_BOOK_PAGE_CONTENT.structure.avatars;
  }
  if (!content.reviews.items.length) {
    content.reviews.items = DEFAULT_BOOK_PAGE_CONTENT.reviews.items;
  }
  if (!content.faq.items.length) {
    content.faq.items = DEFAULT_BOOK_PAGE_CONTENT.faq.items;
  }
  if (!content.explore.links.length) {
    content.explore.links = DEFAULT_BOOK_PAGE_CONTENT.explore.links;
  }
  if (!content.retailers.stores.length) {
    content.retailers.stores = DEFAULT_BOOK_PAGE_CONTENT.retailers.stores;
  }

  const result = await persistBookPageContent(content);

  if (result.success) {
    revalidatePath("/book");
    revalidatePath("/");
    revalidatePath("/admin/book");
  }

  return result;
}

"use server";

import { revalidatePath } from "next/cache";
import {
  DEFAULT_HOMEPAGE_CONTENT,
  type HomepageContent,
} from "@/data/homepage";
import { getHomepageContent } from "@/lib/homepage";
import { persistHomepageContent } from "@/lib/homepageStorage";

function sanitizeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function sanitizeContent(input: HomepageContent): HomepageContent {
  const defaults = DEFAULT_HOMEPAGE_CONTENT;

  return {
    author: {
      eyebrow: sanitizeString(input.author?.eyebrow, defaults.author.eyebrow),
      heading: sanitizeString(input.author?.heading, defaults.author.heading),
      tagline: sanitizeString(input.author?.tagline, defaults.author.tagline),
      primaryButtonText: sanitizeString(
        input.author?.primaryButtonText,
        defaults.author.primaryButtonText
      ),
      primaryButtonHref: sanitizeString(
        input.author?.primaryButtonHref,
        defaults.author.primaryButtonHref
      ),
      secondaryButtonText: sanitizeString(
        input.author?.secondaryButtonText,
        defaults.author.secondaryButtonText
      ),
      secondaryButtonHref: sanitizeString(
        input.author?.secondaryButtonHref,
        defaults.author.secondaryButtonHref
      ),
    },
    book: {
      eyebrow: sanitizeString(input.book?.eyebrow, defaults.book.eyebrow),
      title: sanitizeString(input.book?.title, defaults.book.title),
      subtitle: sanitizeString(input.book?.subtitle, defaults.book.subtitle),
      description: sanitizeString(
        input.book?.description,
        defaults.book.description
      ),
      linkText: sanitizeString(input.book?.linkText, defaults.book.linkText),
      linkHref: sanitizeString(input.book?.linkHref, defaults.book.linkHref),
    },
    readerVoices: {
      eyebrow: sanitizeString(
        input.readerVoices?.eyebrow,
        defaults.readerVoices.eyebrow
      ),
      title: sanitizeString(
        input.readerVoices?.title,
        defaults.readerVoices.title
      ),
      testimonials: (input.readerVoices?.testimonials ?? [])
        .map((item) => ({
          quote: sanitizeString(item.quote, ""),
          attribution: sanitizeString(item.attribution, "A reader"),
        }))
        .filter((item) => item.quote)
        .slice(0, 6),
    },
    aboutAuthor: {
      eyebrow: sanitizeString(
        input.aboutAuthor?.eyebrow,
        defaults.aboutAuthor.eyebrow
      ),
      bio: sanitizeString(input.aboutAuthor?.bio, defaults.aboutAuthor.bio),
      linkText: sanitizeString(
        input.aboutAuthor?.linkText,
        defaults.aboutAuthor.linkText
      ),
      linkHref: sanitizeString(
        input.aboutAuthor?.linkHref,
        defaults.aboutAuthor.linkHref
      ),
    },
    footer: {
      message: sanitizeString(input.footer?.message, defaults.footer.message),
    },
    socialLinks: (input.socialLinks ?? [])
      .map((item) => ({
        label: sanitizeString(item.label, ""),
        href: sanitizeString(item.href, ""),
        handle: sanitizeString(item.handle, ""),
      }))
      .filter((item) => item.label && item.href)
      .slice(0, 8),
  };
}

export async function getHomepageContentForAdmin() {
  return getHomepageContent();
}

export async function saveHomepageContent(input: HomepageContent) {
  const content = sanitizeContent(input);

  if (!content.readerVoices.testimonials.length) {
    content.readerVoices.testimonials =
      DEFAULT_HOMEPAGE_CONTENT.readerVoices.testimonials;
  }

  if (!content.socialLinks.length) {
    content.socialLinks = DEFAULT_HOMEPAGE_CONTENT.socialLinks;
  }

  const result = await persistHomepageContent(content);

  if (result.success) {
    revalidatePath("/");
    revalidatePath("/admin/homepage");
  }

  return result;
}

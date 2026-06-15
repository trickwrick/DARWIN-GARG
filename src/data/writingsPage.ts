import { essays, type Essay, type EssayBlock, type EssayFaq, type EssaySeo, type WritingStatus } from "@/data/essays";
import {
  featuredWriting,
  writings,
  type WritingCategory,
} from "@/data/writings";

export type { Essay, EssayBlock, EssayFaq, EssaySeo, WritingStatus, WritingCategory };

export type WritingCard = {
  id: string;
  slug: string;
  category: WritingCategory;
  date: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  status?: WritingStatus;
};

export type WritingsPostForm = {
  slug: string;
  title: string;
  date: string;
  category: WritingCategory;
  shortDescription: string;
  bodyHtml: string;
  readTime: string;
  image: string;
  imageAlt: string;
  author: string;
  tags: string[];
  status: WritingStatus;
  isFeatured: boolean;
  faqs: EssayFaq[];
  seo: EssaySeo;
};

export const SUGGESTED_WRITING_TAGS = [
  "Dashavatar framework",
  "Ancient wisdom",
  "Modern crises",
  "Mythology",
  "Leadership",
  "Mental health",
  "Climate",
  "Misinformation",
  "Book excerpt",
  "Interview",
];

export type FeaturedWriting = {
  slug: string;
  category: WritingCategory;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  linkText: string;
  image: string;
  imageAlt: string;
};

export type WritingsPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  featured: FeaturedWriting;
  writings: WritingCard[];
  emptyState: string;
  newsletter: {
    eyebrow: string;
    title: string;
    note: string;
    placeholder: string;
    buttonText: string;
  };
  essays: Essay[];
};

export const WRITING_CATEGORIES: WritingCategory[] = [
  "Essays",
  "Excerpts",
  "Behind the book",
  "Interviews",
];

function slugFromHref(href: string) {
  return href.replace("/blog/", "");
}

export const DEFAULT_WRITINGS_PAGE_CONTENT: WritingsPageContent = {
  hero: {
    eyebrow: "Writings",
    title: "Essays, excerpts, and notes from the margin",
    subtitle:
      "Pieces that live alongside the book — some drawn from it, some written since.",
  },
  featured: {
    slug: slugFromHref(featuredWriting.href),
    category: featuredWriting.category,
    date: featuredWriting.date,
    readTime: featuredWriting.readTime,
    title: featuredWriting.title,
    excerpt: featuredWriting.excerpt,
    linkText: "Read the essay",
    image: featuredWriting.image,
    imageAlt: featuredWriting.imageAlt,
  },
  writings: writings.map((item) => ({
    id: item.id,
    slug: slugFromHref(item.href),
    category: item.category,
    date: item.date,
    title: item.title,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt,
  })),
  emptyState: "More pieces in this category are on the way.",
  newsletter: {
    eyebrow: "Stay in touch",
    title: "Receive new writings by email",
    note: "Occasional. Considered. Never more than once a month.",
    placeholder: "your@email.com",
    buttonText: "Subscribe",
  },
  essays: Object.values(essays),
};

export function writingHref(slug: string) {
  return `/blog/${slug}`;
}

export function emptyWritingCard(): WritingCard {
  return {
    id: `writing-${Date.now()}`,
    slug: "",
    category: "Essays",
    date: "",
    title: "",
    description: "",
    image: "",
    imageAlt: "",
  };
}

export function emptyPostForm(): WritingsPostForm {
  return {
    slug: "",
    title: "",
    date: "",
    category: "Essays",
    shortDescription: "",
    bodyHtml: "",
    readTime: "5 min read",
    image: "",
    imageAlt: "",
    author: "Darwin Garg",
    tags: [],
    status: "ACTIVE",
    isFeatured: false,
    faqs: [],
    seo: {
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      otherMeta: "",
    },
  };
}

export function emptyFaq(): EssayFaq {
  return {
    id: `faq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    question: "",
    answerHtml: "",
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function essayBlocksToHtml(blocks: EssayBlock[]): string {
  const parts: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        if (block.text.trim()) {
          parts.push(`<p>${escapeHtml(block.text)}</p>`);
        }
        break;
      case "heading":
        if (block.text.trim()) {
          parts.push(`<h2>${escapeHtml(block.text)}</h2>`);
        }
        break;
      case "quote": {
        const quote = escapeHtml(block.text);
        const attribution = block.attribution
          ? `<p><em>${escapeHtml(block.attribution)}</em></p>`
          : "";
        parts.push(`<blockquote><p>${quote}</p>${attribution}</blockquote>`);
        break;
      }
      case "list":
        if (block.items.length) {
          const items = block.items
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("");
          parts.push(`<ul>${items}</ul>`);
        }
        break;
    }
  }

  return parts.join("");
}

function resolveBodyHtml(essay: Essay): string {
  if (essay.bodyHtml?.trim()) {
    return essay.bodyHtml;
  }

  if (essay.blocks?.length) {
    return essayBlocksToHtml(essay.blocks);
  }

  return "";
}

function resolveSeoFromEssay(essay: Essay): EssaySeo {
  const tags = essay.tags ?? [];

  return {
    metaTitle:
      essay.seo?.metaTitle?.trim() || essay.title.trim().slice(0, 70),
    metaKeywords:
      essay.seo?.metaKeywords?.trim() ||
      tags.join(", ").slice(0, 160),
    metaDescription:
      essay.seo?.metaDescription?.trim() || essay.dek.trim().slice(0, 250),
    otherMeta: essay.seo?.otherMeta?.trim() || "",
  };
}

export function normalizePostForm(
  form: Partial<WritingsPostForm> | null | undefined
): WritingsPostForm {
  const base = emptyPostForm();
  if (!form) return base;

  return {
    ...base,
    ...form,
    slug: form.slug ?? "",
    title: form.title ?? "",
    date: form.date ?? "",
    category: WRITING_CATEGORIES.includes(form.category as WritingCategory)
      ? (form.category as WritingCategory)
      : "Essays",
    shortDescription: form.shortDescription ?? "",
    bodyHtml: form.bodyHtml ?? "",
    readTime: form.readTime ?? "5 min read",
    image: form.image ?? "",
    imageAlt: form.imageAlt ?? "",
    author: form.author ?? "Darwin Garg",
    tags: Array.isArray(form.tags) ? form.tags : [],
    status: form.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
    isFeatured: Boolean(form.isFeatured),
    faqs: Array.isArray(form.faqs)
      ? form.faqs.map((faq) => ({
          id: faq.id || emptyFaq().id,
          question: faq.question ?? "",
          answerHtml: faq.answerHtml ?? "",
        }))
      : [],
    seo: {
      metaTitle: form.seo?.metaTitle ?? "",
      metaKeywords: form.seo?.metaKeywords ?? "",
      metaDescription: form.seo?.metaDescription ?? "",
      otherMeta: form.seo?.otherMeta ?? "",
    },
  };
}

export function essayToPostForm(
  essay: Essay,
  options: { isFeatured: boolean }
): WritingsPostForm {
  return normalizePostForm({
    slug: essay.slug,
    title: essay.title,
    date: essay.date,
    category: essay.category as WritingCategory,
    shortDescription: essay.dek,
    bodyHtml: resolveBodyHtml(essay),
    readTime: essay.readTime,
    image: essay.image,
    imageAlt: essay.imageAlt,
    author: essay.author,
    tags: essay.tags ?? [],
    status: essay.status ?? "ACTIVE",
    isFeatured: options.isFeatured,
    faqs: essay.faqs ?? [],
    seo: resolveSeoFromEssay(essay),
  });
}

export function emptyEssay(): Essay {
  return {
    slug: "",
    category: "Essays",
    date: "",
    readTime: "5 min read",
    title: "",
    dek: "",
    image: "",
    imageAlt: "",
    author: "Darwin Garg",
    blocks: [{ type: "paragraph", text: "" }],
    bodyHtml: "",
    faqs: [],
    tags: [],
    status: "ACTIVE",
    seo: {
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      otherMeta: "",
    },
  };
}

export function emptyEssayBlock(): EssayBlock {
  return { type: "paragraph", text: "" };
}

import { essays, type Essay, type EssayBlock } from "@/data/essays";
import {
  featuredWriting,
  writings,
  type WritingCategory,
} from "@/data/writings";

export type { Essay, EssayBlock, WritingCategory };

export type WritingCard = {
  id: string;
  slug: string;
  category: WritingCategory;
  date: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

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
  };
}

export function emptyEssayBlock(): EssayBlock {
  return { type: "paragraph", text: "" };
}

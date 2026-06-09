import {
  AUTHOR_IMAGE,
  AVATAR_IMAGES,
  BOOK_COVER_FRONT,
  BOOK_PHYSICAL,
  BOOK_PHYSICAL_LIFESTYLE,
} from "@/data/images";

export type WritingCategory =
  | "Essays"
  | "Excerpts"
  | "Behind the book"
  | "Interviews";

export const writingCategories = [
  "All",
  "Essays",
  "Excerpts",
  "Behind the book",
  "Interviews",
] as const;

export type WritingFilter = (typeof writingCategories)[number];

export const featuredWriting = {
  category: "Essays" as WritingCategory,
  date: "March 2026",
  readTime: "8 min read",
  title: "Why our age needs ten wisdoms, not one",
  excerpt:
    "The world isn't facing one crisis. It's facing ten — simultaneously. No single idea, leader, or movement can fix this. What we need isn't one answer. We need ten — working together.",
  href: "/book",
  image: BOOK_PHYSICAL_LIFESTYLE,
  imageAlt: "When Gods Must Return on a balcony table",
};

export const writings = [
  {
    id: "opening-excerpt",
    category: "Excerpts" as WritingCategory,
    date: "March 2026",
    title: "Opening lines: ten crises at once",
    description:
      "The first pages of When Gods Must Return — naming misinformation, mental health, climate, and the crises that arrive together.",
    href: "/book",
    image: BOOK_COVER_FRONT,
    imageAlt: "When Gods Must Return front cover",
  },
  {
    id: "dashavatar-framework",
    category: "Behind the book" as WritingCategory,
    date: "February 2026",
    title: "How the Dashavatar framework found me",
    description:
      "The moment the ten avatars stopped being stories and became a map for modern chaos — and why the book had to hold all ten at once.",
    href: "/journey",
    image: BOOK_PHYSICAL,
    imageAlt: "Physical copy of When Gods Must Return",
  },
  {
    id: "corporate-and-myth",
    category: "Interviews" as WritingCategory,
    date: "January 2026",
    title: "Writing between the boardroom and the Bhagavata",
    description:
      "On building a book while leading in the corporate world — and why ancient stories still speak to quarterly goals and global noise.",
    href: "/about",
    image: AUTHOR_IMAGE,
    imageAlt: "Darwin Garg portrait",
  },
  {
    id: "matsya-misinformation",
    category: "Essays" as WritingCategory,
    date: "April 2026",
    title: "Matsya and the flood of misinformation",
    description:
      "What the first avatar teaches about navigation when every screen is a storm — and why discernment is a collective act, not a solo virtue.",
    href: "/book",
    image: AVATAR_IMAGES.Matsya,
    imageAlt: "Matsya avatar illustration",
  },
] as const;

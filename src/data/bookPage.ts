import { AMAZON_LINK, avatarCrises, bookExcerpt, bookFaq, bookReviews } from "@/data/book";

export type BookReview = {
  quote: string;
  attribution: string;
};

export type BookFaqItem = {
  question: string;
  answer: string;
};

export type AvatarCrisis = {
  name: string;
  crisis: string;
};

export type ExploreLink = {
  text: string;
  href: string;
};

export type BookPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    authorName: string;
    authorLink: string;
    authorSuffix: string;
    ratingText: string;
    description: string;
    amazonLink: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
  };
  premise: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  audience: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  structure: {
    eyebrow: string;
    title: string;
    intro: string;
    avatars: AvatarCrisis[];
  };
  inside: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  toc: {
    eyebrow: string;
    title: string;
  };
  excerpt: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    linkText: string;
    linkHref: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    items: BookReview[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: BookFaqItem[];
  };
  explore: {
    eyebrow: string;
    title: string;
    links: ExploreLink[];
  };
  press: {
    text: string;
    linkText: string;
    linkHref: string;
  };
  retailers: {
    title: string;
    formats: string;
  };
};

export const DEFAULT_BOOK_PAGE_CONTENT: BookPageContent = {
  hero: {
    eyebrow: "A debut work of nonfiction",
    title: "When Gods Must Return",
    tagline: "Ancient Wisdom for Modern Chaos",
    authorName: "Darwin Garg",
    authorLink: "/about",
    authorSuffix:
      "— from Agra to New Jersey, by way of two decades in the corporate world.",
    ratingText: "5.0 · 5 reader reviews",
    description:
      "Ten avatars of Vishnu. Ten great crises of our modern world. One book that maps them onto each other — not as ten separate lessons, but as one system of wisdom our age needs whole.",
    amazonLink: AMAZON_LINK,
    primaryButtonText: "Buy on Amazon",
    secondaryButtonText: "All retailers",
    secondaryButtonHref: "#retailers",
  },
  premise: {
    eyebrow: "The premise",
    title: "What this book argues",
    paragraphs: [
      "We live in an age of converging crises — climate, AI, inequality, loneliness, the loss of meaning. We've answered them with more frameworks, more podcasts, more books of advice. What we've lost is wisdom.",
      "The Dashavatar isn't ten gods. It's ten archetypes of how to meet chaos — encoded over thousands of years into the stories we now treat as just stories. <em>When Gods Must Return</em> argues that our age doesn't need one of these wisdoms. It needs all ten, working together.",
    ],
  },
  audience: {
    eyebrow: "Who it's for",
    title: "Ancient wisdom, modern reader",
    paragraphs: [
      "You don't need a religious background or prior knowledge of Hindu tradition. Through stories of ordinary people facing extraordinary modern dilemmas, the book shows how timeless avatar wisdom speaks directly to where we are right now.",
      "Especially for readers of Karen Armstrong, Joseph Campbell, and Devdutt Pattanaik — and anyone searching for a framework that holds more than one crisis at a time.",
    ],
  },
  structure: {
    eyebrow: "Structure",
    title: "Ten avatars · ten crises",
    intro:
      "Each avatar embodies a distinct form of wisdom the world urgently needed — mapped here to the crisis it speaks to today.",
    avatars: avatarCrises.map((item) => ({ ...item })),
  },
  inside: {
    eyebrow: "Inside the book",
    title: "Stories, not sermons",
    paragraphs: [
      "A journalist drowning in noise learns what Matsya knew about navigation. A parent in burnout finds what Kurma understood about bearing weight without breaking. A leader facing impossible choices discovers what Krishna meant when there is no clean answer.",
      "This isn't a book that picks one solution for one crisis. Its deepest insight is that the crises are interconnected — and so must be the wisdom we bring to them.",
    ],
  },
  toc: {
    eyebrow: "Contents",
    title: "Ten chapters, one arc",
  },
  excerpt: {
    eyebrow: "An excerpt",
    title: "Read from the book",
    paragraphs: [...bookExcerpt],
    linkText: "Request a longer sample →",
    linkHref: "/contact",
  },
  reviews: {
    eyebrow: "Reviews",
    title: "What readers are saying",
    items: bookReviews.map((item) => ({ ...item })),
  },
  faq: {
    eyebrow: "Questions",
    title: "Before you buy",
    items: bookFaq.map((item) => ({ ...item })),
  },
  explore: {
    eyebrow: "Go deeper",
    title: "The book doesn't end here",
    links: [
      { text: "How the book was written →", href: "/journey" },
      { text: "Essays and excerpts →", href: "/blog" },
      { text: "About the author →", href: "/about" },
    ],
  },
  press: {
    text: "Book clubs, podcasts, panels, and corporate conversations welcome.",
    linkText: "Invite Darwin to speak →",
    linkHref: "/contact",
  },
  retailers: {
    title: "Available worldwide",
    formats: "Paperback · Hardcover · Ebook",
  },
};

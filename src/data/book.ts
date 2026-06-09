import { BOOK_COVER_FRONT } from "@/data/images";

export const AMAZON_LINK =
  "https://www.amazon.com/dp/B0GSTW86RV?ref=cm_sw_r_ffobk_cso_cp_apin_dp_NKMTKPK611WNMXVQFFMZ";

export const BOOK_COVER_SRC = BOOK_COVER_FRONT;

export const avatarCrises = [
  { name: "Matsya", crisis: "Navigating the flood of misinformation" },
  { name: "Kurma", crisis: "Building stability in a mental health crisis" },
  { name: "Varaha", crisis: "Recovering our connection to a dying planet" },
  { name: "Narasimha", crisis: "Confronting authoritarianism and abuse of power" },
  { name: "Vamana", crisis: "Humbling the ego that believes it knows best" },
  { name: "Parashurama", crisis: "Dismantling deep institutional corruption" },
  { name: "Rama", crisis: "Doing what's right when it costs everything" },
  { name: "Krishna", crisis: "Choosing wisely when there are no good options" },
  { name: "Buddha", crisis: "Breaking free from addiction and endless craving" },
  { name: "Kalki", crisis: "Transforming the systems that create these crises" },
] as const;

export const bookReviews = [
  {
    quote:
      "I have never read anything uninterrupted in the past several years. In between the lines, I could sense that you are talking.",
    attribution: "A reader",
  },
  {
    quote:
      "Absolutely fascinating how the author takes the Dashavatara and makes it directly relevant to our modern lives.",
    attribution: "A reader",
  },
  {
    quote:
      "I realized after reading this book that I can read. I love to read. I was just being lazy.",
    attribution: "A reader",
  },
  {
    quote:
      "The simplicity with which he has articulated deeper thoughts — allowing ideas to land naturally.",
    attribution: "A reader",
  },
] as const;

export const bookFaq = [
  {
    question: "Do I need to know Hindu mythology first?",
    answer:
      "No. The book is written for curious general readers. Each avatar is introduced through modern dilemmas first — the ancient stories follow naturally.",
  },
  {
    question: "Is this fiction or nonfiction?",
    answer:
      "Nonfiction. It weaves real contemporary crises with mythic archetypes and narrative examples, but it argues a single integrated framework rather than telling one fictional plot.",
  },
  {
    question: "Why ten avatars instead of one big idea?",
    answer:
      "Because our age is facing converging crises at once. The Dashavatar was never ten separate answers — it was always ten forms of wisdom meant to work together.",
  },
  {
    question: "What formats are available?",
    answer:
      "Paperback, hardcover, and ebook. Use the retailer links below for your region — more outlets are being added as distribution expands.",
  },
] as const;

const BOOK_SEARCH = "when+gods+must+return+darwin+garg";

export type RetailerCity = {
  name: string;
  region: "IN" | "US";
  href: string;
  inStock: boolean;
};

export type RetailerWithCities = {
  label: string;
  href: string;
  accent: "amazon" | "barnes" | "flipkart";
  cities: readonly RetailerCity[];
};

export const retailersWithCities: readonly RetailerWithCities[] = [
  {
    label: "Amazon",
    href: AMAZON_LINK,
    accent: "amazon",
    cities: [
      {
        name: "New Delhi",
        region: "IN",
        href: `https://www.amazon.in/s?k=${BOOK_SEARCH}`,
        inStock: true,
      },
      {
        name: "Mumbai",
        region: "IN",
        href: `https://www.amazon.in/s?k=${BOOK_SEARCH}`,
        inStock: true,
      },
      {
        name: "Bengaluru",
        region: "IN",
        href: `https://www.amazon.in/s?k=${BOOK_SEARCH}`,
        inStock: true,
      },
    ],
  },
  {
    label: "Barnes & Noble",
    href: "https://www.barnesandnoble.com/s/when%20gods%20must%20return",
    accent: "barnes",
    cities: [
      {
        name: "New York",
        region: "US",
        href: "https://www.barnesandnoble.com/s/when%20gods%20must%20return",
        inStock: true,
      },
      {
        name: "Chicago",
        region: "US",
        href: "https://www.barnesandnoble.com/s/when%20gods%20must%20return",
        inStock: true,
      },
      {
        name: "Los Angeles",
        region: "US",
        href: "https://www.barnesandnoble.com/s/when%20gods%20must%20return",
        inStock: true,
      },
    ],
  },
  {
    label: "Flipkart",
    href: "https://www.flipkart.com/search?q=when+gods+must+return+darwin+garg",
    accent: "flipkart",
    cities: [
      {
        name: "New Delhi",
        region: "IN",
        href: "https://www.flipkart.com/search?q=when+gods+must+return+darwin+garg",
        inStock: true,
      },
      {
        name: "Mumbai",
        region: "IN",
        href: "https://www.flipkart.com/search?q=when+gods+must+return+darwin+garg",
        inStock: true,
      },
      {
        name: "Hyderabad",
        region: "IN",
        href: "https://www.flipkart.com/search?q=when+gods+must+return+darwin+garg",
        inStock: true,
      },
    ],
  },
];

export const retailers = [
  { label: "Amazon", href: AMAZON_LINK, external: true },
  {
    label: "Barnes & Noble",
    href: "https://www.barnesandnoble.com/s/when%20gods%20must%20return",
    external: true,
  },
  {
    label: "Flipkart",
    href: "https://www.flipkart.com/search?q=when+gods+must+return+darwin+garg",
    external: true,
  },
  {
    label: "Notion Press",
    href: "https://notionpress.com/india/search?query=When%20Gods%20Must%20Return",
    external: true,
  },
] as const;

export const bookExcerpt = [
  "The world isn't facing one crisis. It's facing ten — simultaneously.",
  "Misinformation floods every screen. Mental health crises touch nearly every family. The climate emergency accelerates. Authoritarianism rises. Corruption hollows out institutions.",
  "No single idea, leader, or movement can fix this. What we need isn't one answer. We need ten.",
] as const;

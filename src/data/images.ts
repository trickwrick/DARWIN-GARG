export const AUTHOR_IMAGE = "/images/author/darwin-garg.png";

export const BOOK_COVER_FRONT = "/images/book/front-cover.png";
export const BOOK_COVER_BACK = "/images/book/back-cover.png";
export const BOOK_PHYSICAL = "/images/book/physical-book.png";
export const BOOK_PHYSICAL_LIFESTYLE = "/images/book/physical-book-lifestyle.png";
export const BOOK_BACK_EMBLEM = "/images/book/back-emblem.png";

export const AVATAR_IMAGES = {
  Matsya: "/images/avatars/matsya.png",
  Kurma: "/images/avatars/kurma.png",
  Varaha: "/images/avatars/varaha.png",
  Narasimha: "/images/avatars/narasimha.png",
  Vamana: "/images/avatars/vamana.png",
  Parashurama: "/images/avatars/parashurama.png",
  Rama: "/images/avatars/rama-avatar.png",
  Krishna: "/images/avatars/krishna.png",
  Buddha: "/images/avatars/buddha.png",
  Kalki: "/images/avatars/kalki.png",
} as const;

export const aboutPhotos = [
  {
    src: BOOK_PHYSICAL_LIFESTYLE,
    alt: "When Gods Must Return on a balcony table",
    caption: "Out in the world",
  },
  {
    src: BOOK_PHYSICAL,
    alt: "Physical copy of When Gods Must Return",
    caption: "The finished book",
  },
  {
    src: AUTHOR_IMAGE,
    alt: "Darwin Garg portrait",
    caption: "Darwin Garg",
  },
] as const;

export const journeyCoverDrafts = [
  { src: BOOK_COVER_BACK, alt: "Back cover draft", caption: "Back cover" },
  { src: BOOK_BACK_EMBLEM, alt: "Cover emblem detail", caption: "Cover emblem" },
  { src: BOOK_COVER_FRONT, alt: "Final front cover", caption: "Final cover" },
] as const;

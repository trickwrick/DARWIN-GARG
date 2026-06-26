import { socialLinks as defaultSocialLinks } from "@/data/social";
import { AUTHOR_IMAGE, BOOK_COVER_FRONT } from "@/data/images";

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Testimonial = {
  quote: string;
  attribution: string;
};

export type MakingOfChapter = {
  label: string;
  title: string;
};

export type HomepageContent = {
  author: {
    eyebrow: string;
    heading: string;
    tagline: string;
    portraitImage: string;
    portraitAlt: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
  };
  book: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    coverImage: string;
    coverAlt: string;
    linkText: string;
    linkHref: string;
  };
  readerVoices: {
    eyebrow: string;
    title: string;
    testimonials: Testimonial[];
  };
  aboutAuthor: {
    eyebrow: string;
    bio: string;
    portraitImage: string;
    portraitAlt: string;
    linkText: string;
    linkHref: string;
  };
  makingOf: {
    eyebrow: string;
    title: string;
    chapters: MakingOfChapter[];
    linkText: string;
    linkHref: string;
  };
  newsletter: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  footer: {
    message: string;
  };
  socialLinks: SocialLink[];
};

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  author: {
    eyebrow: "Author · Strategist · Storyteller",
    heading: "Darwin Garg",
    tagline: "I write at the meeting of ancient stories and modern chaos.",
    portraitImage: AUTHOR_IMAGE,
    portraitAlt: "Darwin Garg, author of When Gods Must Return",
    primaryButtonText: "Read my story",
    primaryButtonHref: "/about",
    secondaryButtonText: "Discover the book",
    secondaryButtonHref: "/book",
  },
  book: {
    eyebrow: "The Book",
    title: "When Gods Must Return",
    subtitle: "Ancient Wisdom for Modern Chaos",
    description:
      "Ten avatars of Vishnu. Ten great crises of our modern world. One book that maps them onto each other — not as ten separate lessons, but as one system of wisdom our age needs whole.",
    coverImage: BOOK_COVER_FRONT,
    coverAlt: "When Gods Must Return book cover",
    linkText: "Read more about the book →",
    linkHref: "/book",
  },
  readerVoices: {
    eyebrow: "Reader Voices",
    title: "What readers are saying",
    testimonials: [
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
    ],
  },
  aboutAuthor: {
    eyebrow: "About the Author",
    bio: "Born in Agra, schooled in Kanpur, shaped by two decades in the corporate world — and somewhere along the way, drawn back to the older stories. <em>When Gods Must Return</em> is what came from that collision.",
    portraitImage: AUTHOR_IMAGE,
    portraitAlt: "Darwin Garg portrait",
    linkText: "Read more about me →",
    linkHref: "/about",
  },
  makingOf: {
    eyebrow: "The Making Of",
    title: "A book takes a road to find you",
    chapters: [
      { label: "Level One", title: "The seed of an idea" },
      { label: "Level Two", title: "Finding the framework" },
      { label: "Level Three", title: "The writing years" },
      { label: "Level Four", title: "The discipline of restraint" },
      { label: "Level Five", title: "A face for the book" },
    ],
    linkText: "Read the full journey",
    linkHref: "/journey",
  },
  newsletter: {
    eyebrow: "Stay Connected",
    title: "Join the Journey",
    description:
      "Receive insights on ancient wisdom, new articles, and updates on When Gods Must Return.",
    placeholder: "your@email.com",
    buttonText: "Subscribe",
  },
  footer: {
    message:
      "If you've made it this far, thank you. The book is out in the world now, finding its readers across countries and conversations.",
  },
  socialLinks: defaultSocialLinks.map((link) => ({ ...link })),
};

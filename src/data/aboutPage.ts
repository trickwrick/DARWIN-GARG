import { aboutPhotos, AUTHOR_IMAGE } from "@/data/images";

export type AboutPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type AboutPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  intro: {
    portraitImage: string;
    portraitAlt: string;
    paragraphs: string[];
  };
  story: {
    eyebrow: string;
    paragraphs: string[];
  };
  photos: {
    eyebrow: string;
    title: string;
    items: AboutPhoto[];
  };
  beyond: {
    eyebrow: string;
    paragraphs: string[];
    buttonText: string;
    buttonHref: string;
  };
};

export const DEFAULT_ABOUT_PAGE_CONTENT: AboutPageContent = {
  hero: {
    eyebrow: "About",
    title: "A road, and a book",
    subtitle:
      "From Agra to a writing desk in New Jersey, by way of two decades in the corporate world.",
  },
  intro: {
    portraitImage: AUTHOR_IMAGE,
    portraitAlt: "Darwin Garg portrait",
    paragraphs: [
      "I was born and raised in Agra, went to Kanpur for my engineering, and moved to Noida for work. For the last twenty years, I've lived inside the corporate world — business leadership, strategy, the language of markets and quarterly goals.",
      "But somewhere alongside that, I've always been drawn to the older language: myths, scriptures, the stories my parents told me as if they were just stories. <em>When Gods Must Return</em> came from the collision of those two worlds — the boardroom and the Bhagavata.",
      "These days, I live with my family in New Jersey, and I'm finding that being an author and being a corporate leader ask surprisingly similar things of us: clarity, conviction, and the patience to let an idea find its people.",
    ],
  },
  story: {
    eyebrow: "How the book began",
    paragraphs: [
      "I never thought I'd be an author. When my wife once suggested I write a book, my reaction was — \"What are you saying? We don't write books. Authors write books.\"",
      "Then I started noticing something at gatherings with friends. Whenever our ancient history came up, I'd look up after fifteen or twenty minutes and realize I was the only one talking. Everyone else was just listening.",
      "It made me think that maybe I knew things others didn't — things they'd actually want to know. The book felt like the most honest way to share them.",
    ],
  },
  photos: {
    eyebrow: "In photographs",
    title: "A few moments along the way",
    items: aboutPhotos.map((photo) => ({ ...photo })),
  },
  beyond: {
    eyebrow: "Beyond the book",
    paragraphs: [
      "When I'm not writing or working, I'm usually [placeholder for personal interests — reading, walking, family, anything that makes you human on the page].",
      "I'm always glad to hear from readers. If the book reached you in some way, write to me.",
    ],
    buttonText: "Get in touch",
    buttonHref: "/contact",
  },
};

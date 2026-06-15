import { BOOK_PHYSICAL, journeyCoverDrafts } from "@/data/images";

export type JourneyImage = {
  src: string;
  alt: string;
  caption: string;
};

export type JourneyChapterContent = {
  label: string;
  year: string;
  title: string;
  body: string;
  bodyPlaceholder?: string;
  emphasisWord?: string;
  quote?: string;
  readerQuote?: string;
  image?: JourneyImage;
  coverDrafts?: JourneyImage[];
};

export type JourneyPageContent = {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
  };
  chapters: JourneyChapterContent[];
  cta: {
    text: string;
    buttonText: string;
    buttonHref: string;
  };
};

export const DEFAULT_JOURNEY_PAGE_CONTENT: JourneyPageContent = {
  hero: {
    eyebrow: "The Journey",
    titleLine1: "From an unwritten thought",
    titleLine2: "to a book in readers' hands",
    subtitle: "A book takes a road to find you. This is the one mine took.",
  },
  chapters: [
    {
      label: "Level One",
      year: "[Year]",
      title: "The seed of an idea",
      quote:
        "What are you saying? We don't write books. Authors write books.",
      body: "[Placeholder: the moment when the idea of writing first appeared. The conversation with your wife. The early noticing that you had something to say. Two or three paragraphs. End with what made you finally take it seriously.]",
    },
    {
      label: "Level Two",
      year: "[Year]",
      title: "Finding the framework",
      body: "[Placeholder: the structural insight that made the book possible — when the Dashavatar-to-modern-crises mapping clicked into place. Why ten avatars, ten crises. The moment it stopped being a vague idea and became something you could actually write.]",
    },
    {
      label: "Level Three",
      year: "[Year]",
      title: "The writing years",
      body: "[Placeholder: what writing a book while leading a corporate life actually looked like. Early mornings, weekends, the discipline. The chapters that came easily. The ones that didn't.]",
      image: {
        src: BOOK_PHYSICAL,
        alt: "Physical copy of When Gods Must Return",
        caption: "The finished book on the desk",
      },
    },
    {
      label: "Level Four",
      year: "[Year]",
      title: "The discipline of restraint",
      body: "The temptation when you're writing about something this vast — gods, civilizations, modern crises — is to over-explain. The hardest discipline was trusting the stories to do the work. Saying less. Letting an idea land instead of hammering it.",
      bodyPlaceholder:
        "[Placeholder: more on the editing process, what got cut, what got rewritten, the moments of doubt.]",
    },
    {
      label: "Level Five",
      year: "[Year]",
      title: "A face for the book",
      body: "[Placeholder: the cover design journey. Drafts, decisions, what you wanted the cover to say without saying it.]",
      coverDrafts: journeyCoverDrafts.map((item) => ({ ...item })),
    },
    {
      label: "Level Six",
      year: "March 2026",
      title: "Launch day",
      body: "[Placeholder: 25th March 2026. The staggered release — ebook, then KDP print, then IngramSpark. The first sale. The first reader to finish. What that morning felt like.]",
    },
    {
      label: "Level Seven",
      year: "The world responds",
      title: "Finding its readers",
      body: "In the weeks after the book went out, readers began to write. Across countries, across ages, across faiths. What I didn't expect was how many would say the same thing — not that they loved the book, but that the book had made them remember they loved reading.",
      emphasisWord: "reading",
      readerQuote:
        "I realized after reading this book that I can read. I love to read. I was just being lazy.",
    },
    {
      label: "Level Eight",
      year: "Onward",
      title: "What's next",
      body: "[Placeholder: a short, open-ended close. What you're working on, thinking about, hoping for. Doesn't need to promise a second book — just signal that the road continues.]",
    },
  ],
  cta: {
    text: "If the journey moved you, perhaps the book will too.",
    buttonText: "Read the book →",
    buttonHref: "/book",
  },
};

export function emptyChapter(): JourneyChapterContent {
  return {
    label: "Level",
    year: "[Year]",
    title: "",
    body: "",
  };
}

export function emptyCoverDraft(): JourneyImage {
  return { src: "", alt: "", caption: "" };
}

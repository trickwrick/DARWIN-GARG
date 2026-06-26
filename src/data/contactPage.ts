import { socialLinks } from "@/data/social";
import type { SocialLink } from "@/data/homepage";

export type ContactCard = {
  title: string;
  description: string;
};

export type ContactPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  cards: ContactCard[];
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectHint: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitText: string;
    options: { value: string; label: string }[];
  };
  elsewhere: {
    eyebrow: string;
    title: string;
  };
  newsletter: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  socialLinks: SocialLink[];
};

export const DEFAULT_CONTACT_PAGE_CONTENT: ContactPageContent = {
  hero: {
    eyebrow: "Connect",
    title: "I'm always glad to hear from readers",
    subtitle:
      "If the book reached you in some way — or if you'd like to invite me to speak or write — write to me below.",
  },
  cards: [
    {
      title: "Readers",
      description:
        "Thoughts on the book, questions, or a passage that stayed with you.",
    },
    {
      title: "Speaking & events",
      description:
        "Talks, panels, book clubs, podcasts, and corporate conversations.",
    },
    {
      title: "Media & interviews",
      description:
        "Reviews, features, interviews. Press kit available on request.",
    },
  ],
  form: {
    nameLabel: "Your name",
    namePlaceholder: "First and last name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    subjectLabel: "What's this about?",
    subjectHint:
      "Options: A reader message · Speaking inquiry · Media inquiry · Something else",
    messageLabel: "Your message",
    messagePlaceholder: "Write as much or as little as you like.",
    submitText: "Send message",
    options: [
      { value: "reader", label: "A reader message" },
      { value: "speaking", label: "Speaking inquiry" },
      { value: "media", label: "Media inquiry" },
      { value: "other", label: "Something else" },
    ],
  },
  elsewhere: {
    eyebrow: "Elsewhere",
    title: "Find me across the web",
  },
  newsletter: {
    eyebrow: "Stay Connected",
    title: "Join the Journey",
    description:
      "Receive insights on ancient wisdom, new articles, and updates on When Gods Must Return.",
    placeholder: "your@email.com",
    buttonText: "Subscribe",
  },
  socialLinks: socialLinks.map((link) => ({ ...link })),
};

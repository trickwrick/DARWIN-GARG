import {
  AUTHOR_IMAGE,
  AVATAR_IMAGES,
  BOOK_COVER_FRONT,
  BOOK_PHYSICAL,
  BOOK_PHYSICAL_LIFESTYLE,
} from "@/data/images";

export type EssayBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export type EssayFaq = {
  id: string;
  question: string;
  answerHtml: string;
};

export type EssaySeo = {
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  otherMeta: string;
};

export type WritingStatus = "ACTIVE" | "INACTIVE";

export type Essay = {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  dek: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  author: string;
  blocks: EssayBlock[];
  bodyHtml?: string;
  faqs?: EssayFaq[];
  seo?: EssaySeo;
  tags?: string[];
  status?: WritingStatus;
};

export const essays: Record<string, Essay> = {
  "why-our-age-needs-ten-wisdoms": {
    slug: "why-our-age-needs-ten-wisdoms",
    category: "Essays",
    date: "March 2026",
    readTime: "8 min read",
    title: "Why our age needs ten wisdoms, not one",
    dek: "The world isn't facing one crisis. It's facing ten — simultaneously. No single idea, leader, or movement can fix this. What we need isn't one answer. We need ten — working together.",
    image: BOOK_PHYSICAL_LIFESTYLE,
    imageAlt: "When Gods Must Return on a balcony table",
    imageCaption: "When Gods Must Return — ancient wisdom for modern chaos",
    author: "Darwin Garg",
    blocks: [
      {
        type: "paragraph",
        text: "We have been trained to look for the one big answer. The framework. The leader. The book that explains everything in a single sweep. It is a comforting habit — and a dangerous one.",
      },
      {
        type: "paragraph",
        text: "Look around and the pattern is unmistakable. Misinformation does not arrive alone. It travels with loneliness, with economic anxiety, with the slow burn of climate dread. Mental health collapses do not happen in a vacuum; they rise alongside the collapse of trust. Power concentrates while institutions fray. None of these crises waits politely for the others to finish.",
      },
      {
        type: "heading",
        text: "Ten crises, one age",
      },
      {
        type: "paragraph",
        text: "When I began writing When Gods Must Return, I did not set out to find ten problems. I set out to understand why the ancient Dashavatar — the ten avatars of Vishnu — had never felt like mere mythology to me. Each form arrives when the world has tipped too far in one direction. Each carries a particular kind of wisdom, not a universal solvent.",
      },
      {
        type: "paragraph",
        text: "Matsya does not solve what Narasimha solves. Krishna does not replace Kalki. The tradition never pretended otherwise. It offered something harder and more honest: a map for complexity.",
      },
      {
        type: "quote",
        text: "What we need isn't one answer. We need ten — working together.",
      },
      {
        type: "heading",
        text: "Why one wisdom fails",
      },
      {
        type: "paragraph",
        text: "A single ideology always overreaches. It takes a partial truth — discipline, compassion, reason, faith — and asks it to carry the full weight of a civilisation. Eventually it cracks. The crack is not a failure of the idea. It is a failure of scale.",
      },
      {
        type: "list",
        items: [
          "When we treat technology as salvation, we forget the human cost of speed.",
          "When we treat tradition as complete, we forget the world it was built for has changed.",
          "When we treat outrage as clarity, we forget that discernment is slower and more necessary than ever.",
        ],
      },
      {
        type: "paragraph",
        text: "Our age does not suffer from a shortage of opinions. It suffers from a shortage of integrated wisdom — the kind that can hold contradiction without collapsing into cynicism.",
      },
      {
        type: "heading",
        text: "The work of ten",
      },
      {
        type: "paragraph",
        text: "Ten wisdoms is not ten times the noise. It is ten forms of attention. Navigation when the flood rises. Courage when power hides inside civility. Restraint when appetite masquerades as freedom. Each avatar, in the book, meets an ordinary person facing an ordinary Tuesday that has become impossible.",
      },
      {
        type: "paragraph",
        text: "That was the test I set for myself as a writer: not to preach ten lessons, but to show ten ways of seeing. If the book works, it is not because it solves everything. It is because it refuses the lie that one thing alone ever could.",
      },
      {
        type: "quote",
        text: "The gods return not when we are ready for a single revelation, but when we are humble enough to need many.",
        attribution: "From the author's notes",
      },
      {
        type: "heading",
        text: "What comes next",
      },
      {
        type: "paragraph",
        text: "This essay is an invitation — to read slowly, to hold more than one frame at a time, to notice which crisis in your own life is asking for which kind of wisdom. The journey does not begin with agreement. It begins with attention.",
      },
      {
        type: "paragraph",
        text: "If that sounds like the world you are already living in, then this book was written for you.",
      },
    ],
  },
  "opening-excerpt": {
    slug: "opening-excerpt",
    category: "Excerpts",
    date: "March 2026",
    readTime: "5 min read",
    title: "Opening lines: ten crises at once",
    dek: "The first pages of When Gods Must Return — naming misinformation, mental health, climate, and the crises that arrive together.",
    image: BOOK_COVER_FRONT,
    imageAlt: "When Gods Must Return front cover",
    imageCaption: "Front cover — When Gods Must Return",
    author: "Darwin Garg",
    blocks: [
      {
        type: "paragraph",
        text: "Every book announces itself before it explains itself. The opening is a contract with the reader: here is the world we are entering, and here is the cost of staying.",
      },
      {
        type: "paragraph",
        text: "When Gods Must Return opens not with a thesis but with a pressure — the sense that something has broken in how we name our problems. We still speak as if misinformation were separate from loneliness, as if climate dread were unrelated to the collapse of trust, as if mental health were a private matter while power concentrates in public.",
      },
      {
        type: "quote",
        text: "The world isn't facing one crisis. It's facing ten — simultaneously.",
      },
      {
        type: "heading",
        text: "Naming the flood",
      },
      {
        type: "paragraph",
        text: "The first pages refuse the comfort of a single villain. There is no one institution to blame, no one ideology to defeat. Instead, the book names a weather system — ten forces that arrive together, amplify each other, and ask different kinds of courage from the people living inside them.",
      },
      {
        type: "list",
        items: [
          "The flood of information that outruns discernment.",
          "The erosion of mental health in a world that never stops performing.",
          "The climate crisis that makes every future feel conditional.",
          "The concentration of power behind polite surfaces.",
        ],
      },
      {
        type: "paragraph",
        text: "To name ten crises is not to multiply despair. It is to refuse the smaller lie that one clean answer will be enough. The opening lines are an invitation to read with your whole attention — not for escape, but for orientation.",
      },
    ],
  },
  "dashavatar-framework": {
    slug: "dashavatar-framework",
    category: "Behind the book",
    date: "February 2026",
    readTime: "7 min read",
    title: "How the Dashavatar framework found me",
    dek: "The moment the ten avatars stopped being stories and became a map for modern chaos — and why the book had to hold all ten at once.",
    image: BOOK_PHYSICAL,
    imageAlt: "Physical copy of When Gods Must Return",
    imageCaption: "The finished book — ancient wisdom for modern chaos",
    author: "Darwin Garg",
    blocks: [
      {
        type: "paragraph",
        text: "I did not begin with the Dashavatar. I began with a restlessness I could not name — the feeling that the stories I had grown up with were not obsolete, but unfinished. They were waiting for a world loud enough to need them again.",
      },
      {
        type: "heading",
        text: "When stories become maps",
      },
      {
        type: "paragraph",
        text: "The turning point came quietly. I was not in a temple or a library. I was in the middle of an ordinary week — notifications, headlines, a meeting that ran long — when the pattern clicked. Each avatar in the tradition arrives when the world has tipped too far in one direction. Not to repeat the old order, but to restore a balance the age has lost.",
      },
      {
        type: "paragraph",
        text: "Matsya is not a metaphor for heroism. It is navigation in a flood. Kurma is not patience as personality. It is the slow work of holding weight while the churning continues. Once I saw that, I could not unsee it. The avatars were never ten versions of the same lesson. They were ten forms of attention.",
      },
      {
        type: "quote",
        text: "The book had to hold all ten at once — because our age refuses to arrive one crisis at a time.",
        attribution: "From the author's notes",
      },
      {
        type: "heading",
        text: "Why the framework had to stay whole",
      },
      {
        type: "paragraph",
        text: "There were moments in the writing when a single avatar would have made the project easier to market, easier to summarise, easier to defend. One crisis. One wisdom. One clean promise. I resisted that temptation because it would have betrayed the reader's actual life.",
      },
      {
        type: "paragraph",
        text: "The framework found me because I needed a way to write about complexity without turning complexity into an excuse for vagueness. Ten avatars. Ten crises. One book — not to solve everything, but to restore the dignity of seeing clearly.",
      },
    ],
  },
  "corporate-and-myth": {
    slug: "corporate-and-myth",
    category: "Interviews",
    date: "January 2026",
    readTime: "6 min read",
    title: "Writing between the boardroom and the Bhagavata",
    dek: "On building a book while leading in the corporate world — and why ancient stories still speak to quarterly goals and global noise.",
    image: AUTHOR_IMAGE,
    imageAlt: "Darwin Garg portrait",
    imageCaption: "Darwin Garg — author and strategist",
    author: "Darwin Garg",
    blocks: [
      {
        type: "paragraph",
        text: "People ask how a book like this gets written by someone who still lives inside deadlines, dashboards, and the ordinary discipline of a working life. The honest answer is: slowly, and in stolen hours — but also with a strange continuity between the boardroom and the Bhagavata.",
      },
      {
        type: "heading",
        text: "Two kinds of pressure",
      },
      {
        type: "paragraph",
        text: "Corporate life trains you to reduce ambiguity. Ancient stories train you to respect it. One wants the slide deck. The other wants the parable. For years I thought those were opposite instincts. Writing the book taught me they could be allies.",
      },
      {
        type: "paragraph",
        text: "Strategy asks what must be protected when everything accelerates. Myth asks what must be remembered when everything forgets. Both are forms of navigation — one in quarters, one in centuries.",
      },
      {
        type: "quote",
        text: "The ancient stories still speak to quarterly goals because human pressure has not changed as much as our tools have.",
      },
      {
        type: "heading",
        text: "What the corporate world gave the book",
      },
      {
        type: "list",
        items: [
          "Discipline — the book was written in mornings, not moods.",
          "Restraint — not every insight deserved a chapter.",
          "Audience sense — clarity is a form of respect.",
          "Humility — the world does not pause because you have a manuscript.",
        ],
      },
      {
        type: "paragraph",
        text: "I never wanted to write a book that required the reader to leave their life to understand it. If myth still matters, it must matter on a Tuesday — between meetings, between headlines, between the versions of ourselves we perform and the ones we are.",
      },
    ],
  },
  "matsya-misinformation": {
    slug: "matsya-misinformation",
    category: "Essays",
    date: "April 2026",
    readTime: "7 min read",
    title: "Matsya and the flood of misinformation",
    dek: "What the first avatar teaches about navigation when every screen is a storm — and why discernment is a collective act, not a solo virtue.",
    image: AVATAR_IMAGES.Matsya,
    imageAlt: "Matsya avatar illustration",
    imageCaption: "Matsya — the first avatar, guide through the flood",
    author: "Darwin Garg",
    blocks: [
      {
        type: "paragraph",
        text: "The first avatar arrives as a fish — small, easy to miss, absurd to trust. That is the point. When the flood comes, salvation does not always enter the story with thunder. Sometimes it arrives as orientation.",
      },
      {
        type: "heading",
        text: "Every screen is a storm",
      },
      {
        type: "paragraph",
        text: "We call it misinformation, but the older word is flood. Too much. Too fast. Too many voices claiming the center. The problem is not only falsehood. It is volume — the sheer quantity of signal that makes discernment feel like a luxury we cannot afford.",
      },
      {
        type: "paragraph",
        text: "Matsya does not teach us to win the argument. The tradition is wiser than that. It teaches navigation: how to move when the landmarks disappear, how to preserve what must survive the deluge, how to trust the small voice that knows the direction when the horizon is gone.",
      },
      {
        type: "quote",
        text: "Discernment is a collective act, not a solo virtue.",
      },
      {
        type: "heading",
        text: "What the first wisdom asks of us",
      },
      {
        type: "list",
        items: [
          "Slow down before you share — speed is often the flood's ally.",
          "Protect primary trust — family, friendship, local truth-telling.",
          "Seek guides, not gurus — orientation beats certainty.",
          "Preserve the seed — some knowledge must survive the noise.",
        ],
      },
      {
        type: "paragraph",
        text: "In the book, Matsya meets the modern world not as a mascot for virtue-signalling, but as a pressure on attention itself. The first crisis is not out there alone. It prepares the ground for every other crisis that follows.",
      },
      {
        type: "paragraph",
        text: "If our age feels disorienting, perhaps it is not because we lack opinions. Perhaps it is because we have forgotten how to navigate together while the water rises.",
      },
    ],
  },
};

export function getEssay(slug: string): Essay | undefined {
  return essays[slug];
}

export function getAllEssaySlugs(): string[] {
  return Object.keys(essays);
}

"use server";

import { revalidatePath } from "next/cache";
import {
  DEFAULT_CONTACT_PAGE_CONTENT,
  type ContactPageContent,
} from "@/data/contactPage";
import { getContactPageContent } from "@/lib/contactPage";
import { persistContactPageContent } from "@/lib/contactPageStorage";

function sanitizeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function sanitizeContent(input: ContactPageContent): ContactPageContent {
  const defaults = DEFAULT_CONTACT_PAGE_CONTENT;
  return {
    hero: {
      eyebrow: sanitizeString(input.hero?.eyebrow, defaults.hero.eyebrow),
      title: sanitizeString(input.hero?.title, defaults.hero.title),
      subtitle: sanitizeString(input.hero?.subtitle, defaults.hero.subtitle),
    },
    cards: (input.cards ?? [])
      .map((card, index) => ({
        title: sanitizeString(card.title, defaults.cards[index]?.title ?? ""),
        description: sanitizeString(
          card.description,
          defaults.cards[index]?.description ?? ""
        ),
      }))
      .filter((card) => card.title)
      .slice(0, 6),
    form: {
      nameLabel: sanitizeString(input.form?.nameLabel, defaults.form.nameLabel),
      namePlaceholder: sanitizeString(
        input.form?.namePlaceholder,
        defaults.form.namePlaceholder
      ),
      emailLabel: sanitizeString(input.form?.emailLabel, defaults.form.emailLabel),
      emailPlaceholder: sanitizeString(
        input.form?.emailPlaceholder,
        defaults.form.emailPlaceholder
      ),
      subjectLabel: sanitizeString(
        input.form?.subjectLabel,
        defaults.form.subjectLabel
      ),
      subjectHint: sanitizeString(input.form?.subjectHint, defaults.form.subjectHint),
      messageLabel: sanitizeString(
        input.form?.messageLabel,
        defaults.form.messageLabel
      ),
      messagePlaceholder: sanitizeString(
        input.form?.messagePlaceholder,
        defaults.form.messagePlaceholder
      ),
      submitText: sanitizeString(input.form?.submitText, defaults.form.submitText),
      options: (input.form?.options ?? [])
        .map((option) => ({
          value: sanitizeString(option.value, ""),
          label: sanitizeString(option.label, ""),
        }))
        .filter((option) => option.value && option.label)
        .slice(0, 8),
    },
    elsewhere: {
      eyebrow: sanitizeString(
        input.elsewhere?.eyebrow,
        defaults.elsewhere.eyebrow
      ),
      title: sanitizeString(input.elsewhere?.title, defaults.elsewhere.title),
    },
    newsletter: {
      eyebrow: sanitizeString(
        input.newsletter?.eyebrow,
        defaults.newsletter.eyebrow
      ),
      title: sanitizeString(input.newsletter?.title, defaults.newsletter.title),
      description: sanitizeString(
        input.newsletter?.description,
        defaults.newsletter.description
      ),
      placeholder: sanitizeString(
        input.newsletter?.placeholder,
        defaults.newsletter.placeholder
      ),
      buttonText: sanitizeString(
        input.newsletter?.buttonText,
        defaults.newsletter.buttonText
      ),
    },
    socialLinks: (input.socialLinks ?? [])
      .map((item) => ({
        label: sanitizeString(item.label, ""),
        href: sanitizeString(item.href, ""),
        handle: sanitizeString(item.handle, ""),
      }))
      .filter((item) => item.label && item.href)
      .slice(0, 8),
  };
}

export async function getContactPageContentForAdmin() {
  return getContactPageContent();
}

export async function saveContactPageContent(input: ContactPageContent) {
  const content = sanitizeContent(input);
  if (!content.cards.length) content.cards = DEFAULT_CONTACT_PAGE_CONTENT.cards;
  if (!content.form.options.length) {
    content.form.options = DEFAULT_CONTACT_PAGE_CONTENT.form.options;
  }
  if (!content.socialLinks.length) {
    content.socialLinks = DEFAULT_CONTACT_PAGE_CONTENT.socialLinks;
  }
  const result = await persistContactPageContent(content);
  if (result.success) {
    revalidatePath("/contact");
    revalidatePath("/admin/connect");
  }
  return result;
}

import {
  essayToPostForm,
  normalizePostForm,
  type WritingsPostForm,
  type WritingCategory,
} from "@/data/writingsPage";
import { getWritingsPageContent } from "@/lib/writingsPage";

export async function getWritingPostForEdit(slug: string) {
  const content = await getWritingsPageContent();
  const essay = content.essays.find((item) => item.slug === slug);

  if (essay) {
    return {
      form: essayToPostForm(essay, {
        isFeatured: content.featured.slug === slug,
      }),
    };
  }

  if (content.featured.slug === slug) {
    const fallbackEssay = content.essays.find((item) => item.slug === slug);
    if (fallbackEssay) {
      return {
        form: essayToPostForm(fallbackEssay, { isFeatured: true }),
      };
    }

    return {
      form: normalizePostForm({
        slug: content.featured.slug,
        title: content.featured.title,
        date: content.featured.date,
        category: content.featured.category,
        shortDescription: content.featured.excerpt,
        bodyHtml: "",
        readTime: content.featured.readTime,
        image: content.featured.image,
        imageAlt: content.featured.imageAlt,
        author: "Darwin Garg",
        tags: [],
        status: "ACTIVE",
        isFeatured: true,
        faqs: [],
        seo: {
          metaTitle: content.featured.title.slice(0, 70),
          metaKeywords: "",
          metaDescription: content.featured.excerpt.slice(0, 250),
          otherMeta: "",
        },
      }),
    };
  }

  const writing = content.writings.find((item) => item.slug === slug);
  if (!writing) return null;

  const linkedEssay = content.essays.find((item) => item.slug === slug);
  if (linkedEssay) {
    return {
      form: essayToPostForm(linkedEssay, {
        isFeatured: content.featured.slug === slug,
      }),
    };
  }

  return {
    form: normalizePostForm({
      slug: writing.slug,
      title: writing.title,
      date: writing.date,
      category: writing.category,
      shortDescription: writing.description,
      bodyHtml: "",
      readTime: "5 min read",
      image: writing.image,
      imageAlt: writing.imageAlt,
      author: "Darwin Garg",
      tags: [],
      status: writing.status ?? "ACTIVE",
      isFeatured: content.featured.slug === writing.slug,
      faqs: [],
      seo: {
        metaTitle: writing.title.slice(0, 70),
        metaKeywords: "",
        metaDescription: writing.description.slice(0, 250),
        otherMeta: "",
      },
    }),
  };
}

export type { WritingsPostForm, WritingCategory };

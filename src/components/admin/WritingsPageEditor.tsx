"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { saveWritingsPageContent } from "@/app/actions/writingsPageActions";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import EssayBlocksEditor from "@/components/admin/EssayBlocksEditor";
import { writingCategories, type WritingFilter } from "@/data/writings";
import {
  emptyEssay,
  emptyWritingCard,
  type Essay,
  type FeaturedWriting,
  type WritingCard,
  type WritingsPageContent,
  type WritingCategory,
} from "@/data/writingsPage";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type WritingsPageEditorProps = {
  initialContent: WritingsPageContent;
};

type ListItem =
  | { kind: "featured"; data: FeaturedWriting }
  | { kind: "writing"; index: number; data: WritingCard };

function categoryForAdd(filter: WritingFilter): WritingCategory {
  return filter === "All" ? "Essays" : filter;
}

export default function WritingsPageEditor({
  initialContent,
}: WritingsPageEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);
  const [activeCategory, setActiveCategory] = useState<WritingFilter>("All");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const essayIndexBySlug = useMemo(() => {
    const map = new Map<string, number>();
    content.essays.forEach((essay, index) => {
      if (essay.slug) map.set(essay.slug, index);
    });
    return map;
  }, [content.essays]);

  const listItems = useMemo((): ListItem[] => {
    const items: ListItem[] = [];

    if (
      activeCategory === "All" ||
      content.featured.category === activeCategory
    ) {
      items.push({ kind: "featured", data: content.featured });
    }

    content.writings.forEach((writing, index) => {
      if (activeCategory === "All" || writing.category === activeCategory) {
        items.push({ kind: "writing", index, data: writing });
      }
    });

    return items;
  }, [activeCategory, content.featured, content.writings]);

  const editingEssayIndex =
    editingSlug !== null ? essayIndexBySlug.get(editingSlug) : undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const result = await saveWritingsPageContent(content);

    setPopup(
      result.success
        ? { type: "success", message: result.message }
        : { type: "error", message: result.message }
    );
    setLoading(false);
  };

  const updateFeatured = (field: keyof FeaturedWriting, value: string) => {
    setContent((prev) => {
      const featured = { ...prev.featured, [field]: value };
      const essays = prev.essays.map((essay) => {
        if (essay.slug !== prev.featured.slug) return essay;
        return {
          ...essay,
          slug: field === "slug" ? value : essay.slug,
          category:
            field === "category" ? (value as WritingCategory) : essay.category,
          date: field === "date" ? value : essay.date,
          title: field === "title" ? value : essay.title,
          image: field === "image" ? value : essay.image,
          imageAlt: field === "imageAlt" ? value : essay.imageAlt,
          dek: field === "excerpt" ? value : essay.dek,
          readTime: field === "readTime" ? value : essay.readTime,
        };
      });
      return { ...prev, featured, essays };
    });
  };

  const updateWriting = (
    index: number,
    field: keyof WritingCard,
    value: string
  ) => {
    setContent((prev) => {
      const target = prev.writings[index];
      const writings = prev.writings.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      const essays = target
        ? prev.essays.map((essay) => {
            if (essay.slug !== target.slug) return essay;
            return {
              ...essay,
              slug: field === "slug" ? value : essay.slug,
              category:
                field === "category" ? (value as WritingCategory) : essay.category,
              date: field === "date" ? value : essay.date,
              title: field === "title" ? value : essay.title,
              image: field === "image" ? value : essay.image,
              imageAlt: field === "imageAlt" ? value : essay.imageAlt,
              dek: field === "description" ? value : essay.dek,
            };
          })
        : prev.essays;
      return { ...prev, writings, essays };
    });
  };

  const updateEssay = (index: number, field: keyof Essay, value: string) => {
    setContent((prev) => {
      const essay = prev.essays[index];
      const essays = prev.essays.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );

      let featured = prev.featured;
      let writings = prev.writings;

      if (essay && prev.featured.slug === essay.slug) {
        featured = {
          ...prev.featured,
          ...(field === "slug" ? { slug: value } : {}),
          ...(field === "category" ? { category: value as WritingCategory } : {}),
          ...(field === "date" ? { date: value } : {}),
          ...(field === "title" ? { title: value } : {}),
          ...(field === "readTime" ? { readTime: value } : {}),
          ...(field === "dek" ? { excerpt: value } : {}),
          ...(field === "image" ? { image: value } : {}),
          ...(field === "imageAlt" ? { imageAlt: value } : {}),
        };
      } else if (essay) {
        writings = prev.writings.map((item) => {
          if (item.slug !== essay.slug) return item;
          return {
            ...item,
            ...(field === "slug" ? { slug: value } : {}),
            ...(field === "category" ? { category: value as WritingCategory } : {}),
            ...(field === "date" ? { date: value } : {}),
            ...(field === "title" ? { title: value } : {}),
            ...(field === "dek" ? { description: value } : {}),
            ...(field === "image" ? { image: value } : {}),
            ...(field === "imageAlt" ? { imageAlt: value } : {}),
          };
        });
      }

      return { ...prev, essays, featured, writings };
    });
  };

  const updateEssayBlocks = (index: number, blocks: Essay["blocks"]) => {
    setContent((prev) => ({
      ...prev,
      essays: prev.essays.map((item, i) =>
        i === index ? { ...item, blocks } : item
      ),
    }));
  };

  const removeWriting = (index: number) => {
    const slug = content.writings[index]?.slug;
    setContent((prev) => ({
      ...prev,
      writings: prev.writings.filter((_, i) => i !== index),
      essays: slug
        ? prev.essays.filter((essay) => essay.slug !== slug)
        : prev.essays,
    }));
    if (editingSlug === slug) setEditingSlug(null);
  };

  const addWritingInCategory = () => {
    const category = categoryForAdd(activeCategory);
    const slug = `new-writing-${Date.now()}`;
    const card = {
      ...emptyWritingCard(),
      slug,
      category,
    };
    const essay = {
      ...emptyEssay(),
      slug,
      category,
    };

    setContent((prev) => ({
      ...prev,
      writings: [...prev.writings, card],
      essays: [...prev.essays, essay],
    }));
  };

  const renderOuterCard = (item: ListItem) => {
    if (item.kind === "featured") {
      const featured = content.featured;
      return (
        <div key="featured" className={styles.writingAdminCard}>
          <div className={styles.writingAdminCardHeader}>
            <div>
              <p className={styles.writingAdminBadge}>Featured essay</p>
              <h3 className={styles.repeatableTitle}>
                {featured.title || "Featured essay"}
              </h3>
            </div>
          </div>

          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Date</label>
              <input
                className={styles.input}
                value={featured.date}
                onChange={(e) => updateFeatured("date", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Read time</label>
              <input
                className={styles.input}
                value={featured.readTime}
                onChange={(e) => updateFeatured("readTime", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                value={featured.title}
                onChange={(e) => updateFeatured("title", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Excerpt</label>
              <textarea
                className={styles.textarea}
                rows={3}
                value={featured.excerpt}
                onChange={(e) => updateFeatured("excerpt", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <AdminImageUpload
                label="Featured image"
                value={featured.image}
                onChange={(url) => updateFeatured("image", url)}
                altValue={featured.imageAlt}
                onAltChange={(value) => updateFeatured("imageAlt", value)}
              />
            </div>
          </div>

          <button
            type="button"
            className={styles.readEssayBtn}
            onClick={() => setEditingSlug(featured.slug)}
          >
            Read the essay <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      );
    }

    const { index, data } = item;
    return (
      <div key={data.id} className={styles.writingAdminCard}>
        <div className={styles.writingAdminCardHeader}>
          <div>
            <p className={styles.writingAdminBadge}>{data.category}</p>
            <h3 className={styles.repeatableTitle}>
              {data.title || `Article ${index + 1}`}
            </h3>
          </div>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeWriting(index)}
          >
            Remove
          </button>
        </div>

        <div className={styles.editorGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Date</label>
            <input
              className={styles.input}
              value={data.date}
              onChange={(e) => updateWriting(index, "date", e.target.value)}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              value={data.title}
              onChange={(e) => updateWriting(index, "title", e.target.value)}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={data.description}
              onChange={(e) =>
                updateWriting(index, "description", e.target.value)
              }
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <AdminImageUpload
              label="Card image"
              value={data.image}
              onChange={(url) => updateWriting(index, "image", url)}
              altValue={data.imageAlt}
              onAltChange={(value) => updateWriting(index, "imageAlt", value)}
            />
          </div>
        </div>

        <button
          type="button"
          className={styles.readEssayBtn}
          onClick={() => setEditingSlug(data.slug)}
          disabled={!data.slug}
        >
          Read the essay <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    );
  };

  const renderInnerEditor = () => {
    if (editingEssayIndex === undefined) {
      return (
        <section className={styles.editorSection}>
          <p className={styles.sectionNote}>
            Essay not found for this item. Save after adding a slug, or go back
            and try again.
          </p>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setEditingSlug(null)}
          >
            &larr; Back to writings list
          </button>
        </section>
      );
    }

    const essay = content.essays[editingEssayIndex];
    const isFeatured = content.featured.slug === essay.slug;

    return (
      <section className={styles.editorSection}>
        <button
          type="button"
          className={styles.backLinkBtn}
          onClick={() => setEditingSlug(null)}
        >
          &larr; Back to writings list
        </button>

        <div className={styles.writingAdminCardHeader}>
          <div>
            <p className={styles.writingAdminBadge}>
              {isFeatured ? "Featured essay · inner content" : "Essay page"}
            </p>
            <h2 className={styles.editorSectionTitle}>
              {essay.title || "Edit essay"}
            </h2>
          </div>
          {essay.slug ? (
            <Link
              href={`/blog/${essay.slug}`}
              className={styles.viewSiteBtn}
              target="_blank"
            >
              Preview &rarr;
            </Link>
          ) : null}
        </div>

        <div className={styles.editorGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Slug</label>
            <input
              className={styles.input}
              value={essay.slug}
              onChange={(e) => {
                const newSlug = e.target.value;
                updateEssay(editingEssayIndex, "slug", newSlug);
                if (editingSlug !== newSlug) setEditingSlug(newSlug);
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select
              className={styles.input}
              value={essay.category}
              onChange={(e) =>
                updateEssay(editingEssayIndex, "category", e.target.value)
              }
            >
              {writingCategories
                .filter((cat) => cat !== "All")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Date</label>
            <input
              className={styles.input}
              value={essay.date}
              onChange={(e) => updateEssay(editingEssayIndex, "date", e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Read time</label>
            <input
              className={styles.input}
              value={essay.readTime}
              onChange={(e) =>
                updateEssay(editingEssayIndex, "readTime", e.target.value)
              }
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              value={essay.title}
              onChange={(e) => updateEssay(editingEssayIndex, "title", e.target.value)}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Dek / opening summary</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={essay.dek}
              onChange={(e) => updateEssay(editingEssayIndex, "dek", e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Author</label>
            <input
              className={styles.input}
              value={essay.author}
              onChange={(e) => updateEssay(editingEssayIndex, "author", e.target.value)}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <AdminImageUpload
              label="Hero image"
              value={essay.image}
              onChange={(url) => updateEssay(editingEssayIndex, "image", url)}
              altValue={essay.imageAlt}
              onAltChange={(value) =>
                updateEssay(editingEssayIndex, "imageAlt", value)
              }
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Image caption (optional)</label>
            <input
              className={styles.input}
              value={essay.imageCaption ?? ""}
              onChange={(e) =>
                updateEssay(editingEssayIndex, "imageCaption", e.target.value)
              }
            />
          </div>
        </div>

        <div className={styles.nestedBlock}>
          <h4 className={styles.nestedTitle}>Essay body</h4>
          <EssayBlocksEditor
            blocks={essay.blocks}
            onChange={(blocks) => updateEssayBlocks(editingEssayIndex, blocks)}
          />
        </div>
      </section>
    );
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Writings</h1>
          <p className={styles.pageDescription}>
            Choose a category, edit card image and content, then open the full
            essay with Read the essay.
          </p>
        </div>
        <Link href="/blog" className={styles.viewSiteBtn} target="_blank">
          View writings page &rarr;
        </Link>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="Writings page saved successfully"
        errorTitle="Could not save writings page"
        idPrefix="writingspage"
      />

      <form onSubmit={handleSubmit} className={styles.editorForm}>
        {editingSlug ? (
          renderInnerEditor()
        ) : (
          <>
            <section className={styles.editorSection}>
              <h2 className={styles.editorSectionTitle}>Page Hero</h2>
              <div className={styles.editorGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Eyebrow</label>
                  <input
                    className={styles.input}
                    value={content.hero.eyebrow}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, eyebrow: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Title</label>
                  <input
                    className={styles.input}
                    value={content.hero.title}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, title: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Subtitle</label>
                  <textarea
                    className={styles.textarea}
                    rows={2}
                    value={content.hero.subtitle}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, subtitle: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </section>

            <section className={styles.editorSection}>
              <h2 className={styles.editorSectionTitle}>Writings by category</h2>

              <nav
                className={styles.adminCategoryNav}
                aria-label="Filter writings by category"
              >
                {writingCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      activeCategory === category
                        ? styles.adminCategoryActive
                        : styles.adminCategory
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </nav>

              <div className={styles.repeatableList}>
                {listItems.length > 0 ? (
                  listItems.map((item) => renderOuterCard(item))
                ) : (
                  <p className={styles.sectionNote}>{content.emptyState}</p>
                )}
              </div>

              <button
                type="button"
                className={styles.addBtn}
                onClick={addWritingInCategory}
              >
                + Add writing in{" "}
                {activeCategory === "All" ? "Essays" : activeCategory}
              </button>
            </section>

            <section className={styles.editorSection}>
              <h2 className={styles.editorSectionTitle}>Newsletter</h2>
              <div className={styles.editorGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Eyebrow</label>
                  <input
                    className={styles.input}
                    value={content.newsletter.eyebrow}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        newsletter: {
                          ...prev.newsletter,
                          eyebrow: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Title</label>
                  <input
                    className={styles.input}
                    value={content.newsletter.title}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        newsletter: {
                          ...prev.newsletter,
                          title: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Note</label>
                  <textarea
                    className={styles.textarea}
                    rows={2}
                    value={content.newsletter.note}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        newsletter: { ...prev.newsletter, note: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email placeholder</label>
                  <input
                    className={styles.input}
                    value={content.newsletter.placeholder}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        newsletter: {
                          ...prev.newsletter,
                          placeholder: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Button text</label>
                  <input
                    className={styles.input}
                    value={content.newsletter.buttonText}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        newsletter: {
                          ...prev.newsletter,
                          buttonText: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </section>
          </>
        )}

        <div className={styles.editorActions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Saving..." : "Save writings page"}
          </button>
        </div>
      </form>
    </div>
  );
}

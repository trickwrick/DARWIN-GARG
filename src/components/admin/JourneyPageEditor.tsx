"use client";

import { useState } from "react";
import Link from "next/link";
import { saveJourneyPageContent } from "@/app/actions/journeyPageActions";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import {
  emptyChapter,
  emptyCoverDraft,
  type JourneyChapterContent,
  type JourneyPageContent,
} from "@/data/journeyPage";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type JourneyPageEditorProps = {
  initialContent: JourneyPageContent;
};

export default function JourneyPageEditor({
  initialContent,
}: JourneyPageEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const result = await saveJourneyPageContent(content);

    setPopup(
      result.success
        ? { type: "success", message: result.message }
        : { type: "error", message: result.message }
    );
    setLoading(false);
  };

  const updateHero = (
    field: keyof JourneyPageContent["hero"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateCta = (field: keyof JourneyPageContent["cta"], value: string) => {
    setContent((prev) => ({
      ...prev,
      cta: { ...prev.cta, [field]: value },
    }));
  };

  const updateChapter = (
    index: number,
    field: keyof JourneyChapterContent,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) =>
        i === index ? { ...chapter, [field]: value } : chapter
      ),
    }));
  };

  const updateChapterImage = (
    index: number,
    field: "src" | "alt" | "caption",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) => {
        if (i !== index) return chapter;
        return {
          ...chapter,
          image: {
            src: chapter.image?.src ?? "",
            alt: chapter.image?.alt ?? "",
            caption: chapter.image?.caption ?? "",
            [field]: value,
          },
        };
      }),
    }));
  };

  const clearChapterImage = (index: number) => {
    setContent((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) => {
        if (i !== index) return chapter;
        const { image, ...rest } = chapter;
        return rest;
      }),
    }));
  };

  const updateCoverDraft = (
    chapterIndex: number,
    draftIndex: number,
    field: "src" | "alt" | "caption",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) => {
        if (i !== chapterIndex) return chapter;
        const drafts = [...(chapter.coverDrafts ?? [])];
        drafts[draftIndex] = {
          ...drafts[draftIndex],
          [field]: value,
        };
        return { ...chapter, coverDrafts: drafts };
      }),
    }));
  };

  const addCoverDraft = (chapterIndex: number) => {
    setContent((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) =>
        i === chapterIndex
          ? {
              ...chapter,
              coverDrafts: [...(chapter.coverDrafts ?? []), emptyCoverDraft()],
            }
          : chapter
      ),
    }));
  };

  const removeCoverDraft = (chapterIndex: number, draftIndex: number) => {
    setContent((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) => {
        if (i !== chapterIndex) return chapter;
        const drafts = (chapter.coverDrafts ?? []).filter(
          (_, j) => j !== draftIndex
        );
        return drafts.length
          ? { ...chapter, coverDrafts: drafts }
          : (() => {
              const { coverDrafts, ...rest } = chapter;
              return rest;
            })();
      }),
    }));
  };

  const addChapter = () => {
    setContent((prev) => ({
      ...prev,
      chapters: [...prev.chapters, emptyChapter()],
    }));
  };

  const removeChapter = (index: number) => {
    setContent((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>The Journey</h1>
          <p className={styles.pageDescription}>
            Edit the journey hero, timeline levels, chapter content, images, and
            CTA.
          </p>
        </div>
        <Link href="/journey" className={styles.viewSiteBtn} target="_blank">
          View journey page &rarr;
        </Link>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="Journey page saved successfully"
        errorTitle="Could not save journey page"
        idPrefix="journeypage"
      />

      <form onSubmit={handleSubmit} className={styles.editorForm}>
        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Hero</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.hero.eyebrow}
                onChange={(e) => updateHero("eyebrow", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title line 1</label>
              <input
                className={styles.input}
                value={content.hero.titleLine1}
                onChange={(e) => updateHero("titleLine1", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title line 2</label>
              <input
                className={styles.input}
                value={content.hero.titleLine2}
                onChange={(e) => updateHero("titleLine2", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Subtitle</label>
              <textarea
                className={styles.textarea}
                rows={2}
                value={content.hero.subtitle}
                onChange={(e) => updateHero("subtitle", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Timeline Levels</h2>
          <p className={styles.sectionNote}>
            Each level appears on the zigzag timeline. Optional fields: quote,
            extra body text, emphasis word, reader quote, image, or cover drafts.
          </p>

          <div className={styles.repeatableList}>
            {content.chapters.map((chapter, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>
                    {chapter.label || `Level ${index + 1}`}
                  </h3>
                  {content.chapters.length > 1 ? (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeChapter(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>

                <div className={styles.editorGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Label</label>
                    <input
                      className={styles.input}
                      value={chapter.label}
                      onChange={(e) =>
                        updateChapter(index, "label", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Year / badge</label>
                    <input
                      className={styles.input}
                      value={chapter.year}
                      onChange={(e) =>
                        updateChapter(index, "year", e.target.value)
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Title</label>
                    <input
                      className={styles.input}
                      value={chapter.title}
                      onChange={(e) =>
                        updateChapter(index, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Quote (optional)</label>
                    <textarea
                      className={styles.textarea}
                      rows={2}
                      value={chapter.quote ?? ""}
                      onChange={(e) =>
                        updateChapter(index, "quote", e.target.value)
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Body</label>
                    <textarea
                      className={styles.textarea}
                      rows={4}
                      value={chapter.body}
                      onChange={(e) =>
                        updateChapter(index, "body", e.target.value)
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>
                      Extra body text (optional)
                    </label>
                    <textarea
                      className={styles.textarea}
                      rows={3}
                      value={chapter.bodyPlaceholder ?? ""}
                      onChange={(e) =>
                        updateChapter(index, "bodyPlaceholder", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Emphasis word (optional)
                    </label>
                    <input
                      className={styles.input}
                      placeholder="reading"
                      value={chapter.emphasisWord ?? ""}
                      onChange={(e) =>
                        updateChapter(index, "emphasisWord", e.target.value)
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>
                      Reader quote (optional)
                    </label>
                    <textarea
                      className={styles.textarea}
                      rows={2}
                      value={chapter.readerQuote ?? ""}
                      onChange={(e) =>
                        updateChapter(index, "readerQuote", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className={styles.nestedBlock}>
                  <div className={styles.repeatableHeader}>
                    <h4 className={styles.nestedTitle}>Chapter image (optional)</h4>
                    {chapter.image?.src ? (
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => clearChapterImage(index)}
                      >
                        Remove image
                      </button>
                    ) : null}
                  </div>
                  <AdminImageUpload
                    label="Chapter image"
                    value={chapter.image?.src ?? ""}
                    onChange={(url) => {
                      if (!url) clearChapterImage(index);
                      else updateChapterImage(index, "src", url);
                    }}
                    altValue={chapter.image?.alt ?? ""}
                    onAltChange={(value) =>
                      updateChapterImage(index, "alt", value)
                    }
                    altLabel="Image alt text"
                  />
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Caption</label>
                    <input
                      className={styles.input}
                      value={chapter.image?.caption ?? ""}
                      onChange={(e) =>
                        updateChapterImage(index, "caption", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className={styles.nestedBlock}>
                  <h4 className={styles.nestedTitle}>Cover drafts (optional)</h4>
                  {(chapter.coverDrafts ?? []).map((draft, draftIndex) => (
                    <div key={draftIndex} className={styles.nestedItem}>
                      <div className={styles.repeatableHeader}>
                        <span className={styles.nestedLabel}>
                          Draft {draftIndex + 1}
                        </span>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeCoverDraft(index, draftIndex)}
                        >
                          Remove
                        </button>
                      </div>
                      <AdminImageUpload
                        label={`Cover draft ${draftIndex + 1}`}
                        value={draft.src}
                        onChange={(url) =>
                          updateCoverDraft(index, draftIndex, "src", url)
                        }
                        altValue={draft.alt}
                        onAltChange={(value) =>
                          updateCoverDraft(index, draftIndex, "alt", value)
                        }
                      />
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Caption</label>
                        <input
                          className={styles.input}
                          value={draft.caption}
                          onChange={(e) =>
                            updateCoverDraft(
                              index,
                              draftIndex,
                              "caption",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className={styles.addBtn}
                    onClick={() => addCoverDraft(index)}
                  >
                    + Add cover draft
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className={styles.addBtn} onClick={addChapter}>
            + Add level
          </button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Bottom CTA</h2>
          <div className={styles.editorGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Text</label>
              <textarea
                className={styles.textarea}
                rows={2}
                value={content.cta.text}
                onChange={(e) => updateCta("text", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Button text</label>
              <input
                className={styles.input}
                value={content.cta.buttonText}
                onChange={(e) => updateCta("buttonText", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Button link</label>
              <input
                className={styles.input}
                value={content.cta.buttonHref}
                onChange={(e) => updateCta("buttonHref", e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className={styles.editorActions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Saving..." : "Save journey page"}
          </button>
        </div>
      </form>
    </div>
  );
}

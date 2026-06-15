"use client";

import { useState } from "react";
import Link from "next/link";
import { saveBookPageContent } from "@/app/actions/bookPageActions";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import type { BookPageContent } from "@/data/bookPage";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type BookPageEditorProps = {
  initialContent: BookPageContent;
};

export default function BookPageEditor({ initialContent }: BookPageEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const result = await saveBookPageContent(content);

    setPopup(
      result.success
        ? { type: "success", message: result.message }
        : { type: "error", message: result.message }
    );
    setLoading(false);
  };

  const updateHero = (field: keyof BookPageContent["hero"], value: string) => {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const updateSectionTitle = <
    K extends "premise" | "audience" | "inside" | "excerpt" | "reviews" | "faq" | "explore" | "structure",
  >(
    section: K,
    field: "eyebrow" | "title",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateParagraph = (
    section: "premise" | "audience" | "inside" | "excerpt",
    index: number,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        paragraphs: prev[section].paragraphs.map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const addParagraph = (section: "premise" | "audience" | "inside" | "excerpt") => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        paragraphs: [...prev[section].paragraphs, ""],
      },
    }));
  };

  const removeParagraph = (
    section: "premise" | "audience" | "inside" | "excerpt",
    index: number
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        paragraphs: prev[section].paragraphs.filter((_, i) => i !== index),
      },
    }));
  };

  const updateStructure = (field: "eyebrow" | "title" | "intro", value: string) => {
    setContent((prev) => ({
      ...prev,
      structure: { ...prev.structure, [field]: value },
    }));
  };

  const updateAvatar = (
    index: number,
    field: "name" | "crisis",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      structure: {
        ...prev.structure,
        avatars: prev.structure.avatars.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const updateReview = (
    index: number,
    field: "quote" | "attribution",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        items: prev.reviews.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addReview = () => {
    setContent((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        items: [...prev.reviews.items, { quote: "", attribution: "A reader" }],
      },
    }));
  };

  const removeReview = (index: number) => {
    setContent((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        items: prev.reviews.items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: prev.faq.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addFaq = () => {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: [...prev.faq.items, { question: "", answer: "" }],
      },
    }));
  };

  const removeFaq = (index: number) => {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: prev.faq.items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateExploreLink = (
    index: number,
    field: "text" | "href",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      explore: {
        ...prev.explore,
        links: prev.explore.links.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addExploreLink = () => {
    setContent((prev) => ({
      ...prev,
      explore: {
        ...prev.explore,
        links: [...prev.explore.links, { text: "", href: "" }],
      },
    }));
  };

  const removeExploreLink = (index: number) => {
    setContent((prev) => ({
      ...prev,
      explore: {
        ...prev.explore,
        links: prev.explore.links.filter((_, i) => i !== index),
      },
    }));
  };

  const paragraphSection = (
    title: string,
    section: "premise" | "audience" | "inside" | "excerpt"
  ) => (
    <section className={styles.editorSection}>
      <h2 className={styles.editorSectionTitle}>{title}</h2>
      <div className={styles.editorGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Eyebrow</label>
          <input
            className={styles.input}
            value={content[section].eyebrow}
            onChange={(e) => updateSectionTitle(section, "eyebrow", e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Section title</label>
          <input
            className={styles.input}
            value={content[section].title}
            onChange={(e) => updateSectionTitle(section, "title", e.target.value)}
          />
        </div>
      </div>
      <div className={styles.repeatableList}>
        {content[section].paragraphs.map((paragraph, index) => (
          <div key={index} className={styles.repeatableItem}>
            <div className={styles.repeatableHeader}>
              <h3 className={styles.repeatableTitle}>Paragraph {index + 1}</h3>
              {content[section].paragraphs.length > 1 ? (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeParagraph(section, index)}
                >
                  Remove
                </button>
              ) : null}
            </div>
            <textarea
              className={styles.textarea}
              rows={3}
              value={paragraph}
              onChange={(e) => updateParagraph(section, index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.addBtn}
        onClick={() => addParagraph(section)}
      >
        + Add paragraph
      </button>
    </section>
  );

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>The Book</h1>
          <p className={styles.pageDescription}>
            Edit the full book page — hero, premise, avatars, reviews, FAQ, and
            more.
          </p>
        </div>
        <Link href="/book" className={styles.viewSiteBtn} target="_blank">
          View book page &rarr;
        </Link>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="Book page saved successfully"
        errorTitle="Could not save book page"
        idPrefix="bookpage"
      />

      <form onSubmit={handleSubmit} className={styles.editorForm}>
        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Hero</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input className={styles.input} value={content.hero.eyebrow} onChange={(e) => updateHero("eyebrow", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input className={styles.input} value={content.hero.title} onChange={(e) => updateHero("title", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tagline</label>
              <input className={styles.input} value={content.hero.tagline} onChange={(e) => updateHero("tagline", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Author name</label>
              <input className={styles.input} value={content.hero.authorName} onChange={(e) => updateHero("authorName", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Author link</label>
              <input className={styles.input} value={content.hero.authorLink} onChange={(e) => updateHero("authorLink", e.target.value)} />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Author byline suffix</label>
              <input className={styles.input} value={content.hero.authorSuffix} onChange={(e) => updateHero("authorSuffix", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Rating text</label>
              <input className={styles.input} value={content.hero.ratingText} onChange={(e) => updateHero("ratingText", e.target.value)} />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Description</label>
              <textarea className={styles.textarea} rows={3} value={content.hero.description} onChange={(e) => updateHero("description", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Amazon link</label>
              <input className={styles.input} value={content.hero.amazonLink} onChange={(e) => updateHero("amazonLink", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Primary button text</label>
              <input className={styles.input} value={content.hero.primaryButtonText} onChange={(e) => updateHero("primaryButtonText", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Secondary button text</label>
              <input className={styles.input} value={content.hero.secondaryButtonText} onChange={(e) => updateHero("secondaryButtonText", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Secondary button link</label>
              <input className={styles.input} value={content.hero.secondaryButtonHref} onChange={(e) => updateHero("secondaryButtonHref", e.target.value)} />
            </div>
          </div>
        </section>

        {paragraphSection("The Premise", "premise")}
        {paragraphSection("Who It's For", "audience")}

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Ten Avatars · Ten Crises</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input className={styles.input} value={content.structure.eyebrow} onChange={(e) => updateStructure("eyebrow", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section title</label>
              <input className={styles.input} value={content.structure.title} onChange={(e) => updateStructure("title", e.target.value)} />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Intro</label>
              <textarea className={styles.textarea} rows={2} value={content.structure.intro} onChange={(e) => updateStructure("intro", e.target.value)} />
            </div>
          </div>
          <div className={styles.repeatableList}>
            {content.structure.avatars.map((avatar, index) => (
              <div key={index} className={styles.repeatableItem}>
                <h3 className={styles.repeatableTitle}>Avatar {index + 1}</h3>
                <div className={styles.editorGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Name</label>
                    <input className={styles.input} value={avatar.name} onChange={(e) => updateAvatar(index, "name", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Crisis</label>
                    <input className={styles.input} value={avatar.crisis} onChange={(e) => updateAvatar(index, "crisis", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {paragraphSection("Inside the Book", "inside")}

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Table of Contents</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.toc.eyebrow}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    toc: { ...prev.toc, eyebrow: e.target.value },
                  }))
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section title</label>
              <input
                className={styles.input}
                value={content.toc.title}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    toc: { ...prev.toc, title: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Excerpt</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input className={styles.input} value={content.excerpt.eyebrow} onChange={(e) => updateSectionTitle("excerpt", "eyebrow", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section title</label>
              <input className={styles.input} value={content.excerpt.title} onChange={(e) => updateSectionTitle("excerpt", "title", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Sample link text</label>
              <input className={styles.input} value={content.excerpt.linkText} onChange={(e) => setContent((prev) => ({ ...prev, excerpt: { ...prev.excerpt, linkText: e.target.value } }))} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Sample link URL</label>
              <input className={styles.input} value={content.excerpt.linkHref} onChange={(e) => setContent((prev) => ({ ...prev, excerpt: { ...prev.excerpt, linkHref: e.target.value } }))} />
            </div>
          </div>
          <div className={styles.repeatableList}>
            {content.excerpt.paragraphs.map((paragraph, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>Excerpt paragraph {index + 1}</h3>
                  {content.excerpt.paragraphs.length > 1 ? (
                    <button type="button" className={styles.removeBtn} onClick={() => removeParagraph("excerpt", index)}>Remove</button>
                  ) : null}
                </div>
                <textarea className={styles.textarea} rows={3} value={paragraph} onChange={(e) => updateParagraph("excerpt", index, e.target.value)} />
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={() => addParagraph("excerpt")}>+ Add excerpt paragraph</button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Reviews</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input className={styles.input} value={content.reviews.eyebrow} onChange={(e) => updateSectionTitle("reviews", "eyebrow", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section title</label>
              <input className={styles.input} value={content.reviews.title} onChange={(e) => updateSectionTitle("reviews", "title", e.target.value)} />
            </div>
          </div>
          <div className={styles.repeatableList}>
            {content.reviews.items.map((item, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>Review {index + 1}</h3>
                  <button type="button" className={styles.removeBtn} onClick={() => removeReview(index)}>Remove</button>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quote</label>
                  <textarea className={styles.textarea} rows={3} value={item.quote} onChange={(e) => updateReview(index, "quote", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Attribution</label>
                  <input className={styles.input} value={item.attribution} onChange={(e) => updateReview(index, "attribution", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={addReview}>+ Add review</button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>FAQ</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input className={styles.input} value={content.faq.eyebrow} onChange={(e) => updateSectionTitle("faq", "eyebrow", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section title</label>
              <input className={styles.input} value={content.faq.title} onChange={(e) => updateSectionTitle("faq", "title", e.target.value)} />
            </div>
          </div>
          <div className={styles.repeatableList}>
            {content.faq.items.map((item, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>FAQ {index + 1}</h3>
                  <button type="button" className={styles.removeBtn} onClick={() => removeFaq(index)}>Remove</button>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Question</label>
                  <input className={styles.input} value={item.question} onChange={(e) => updateFaq(index, "question", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Answer</label>
                  <textarea className={styles.textarea} rows={3} value={item.answer} onChange={(e) => updateFaq(index, "answer", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={addFaq}>+ Add FAQ</button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Go Deeper Links</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input className={styles.input} value={content.explore.eyebrow} onChange={(e) => updateSectionTitle("explore", "eyebrow", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section title</label>
              <input className={styles.input} value={content.explore.title} onChange={(e) => updateSectionTitle("explore", "title", e.target.value)} />
            </div>
          </div>
          <div className={styles.repeatableList}>
            {content.explore.links.map((item, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>Link {index + 1}</h3>
                  <button type="button" className={styles.removeBtn} onClick={() => removeExploreLink(index)}>Remove</button>
                </div>
                <div className={styles.editorGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Link text</label>
                    <input className={styles.input} value={item.text} onChange={(e) => updateExploreLink(index, "text", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>URL</label>
                    <input className={styles.input} value={item.href} onChange={(e) => updateExploreLink(index, "href", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={addExploreLink}>+ Add link</button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Speaking & Media</h2>
          <div className={styles.editorGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Text</label>
              <textarea className={styles.textarea} rows={2} value={content.press.text} onChange={(e) => setContent((prev) => ({ ...prev, press: { ...prev.press, text: e.target.value } }))} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Link text</label>
              <input className={styles.input} value={content.press.linkText} onChange={(e) => setContent((prev) => ({ ...prev, press: { ...prev.press, linkText: e.target.value } }))} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Link URL</label>
              <input className={styles.input} value={content.press.linkHref} onChange={(e) => setContent((prev) => ({ ...prev, press: { ...prev.press, linkHref: e.target.value } }))} />
            </div>
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Retailers Section</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input className={styles.input} value={content.retailers.title} onChange={(e) => setContent((prev) => ({ ...prev, retailers: { ...prev.retailers, title: e.target.value } }))} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Formats</label>
              <input className={styles.input} value={content.retailers.formats} onChange={(e) => setContent((prev) => ({ ...prev, retailers: { ...prev.retailers, formats: e.target.value } }))} />
            </div>
          </div>
        </section>

        <div className={styles.editorActions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Saving..." : "Save book page"}
          </button>
        </div>
      </form>
    </div>
  );
}

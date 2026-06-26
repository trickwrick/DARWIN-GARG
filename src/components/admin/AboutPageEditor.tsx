"use client";

import { useState } from "react";
import Link from "next/link";
import { saveAboutPageContent } from "@/app/actions/aboutPageActions";
import type { AboutPageContent, AboutPhoto } from "@/data/aboutPage";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type AboutPageEditorProps = {
  initialContent: AboutPageContent;
};

type ParagraphSection = "intro" | "story" | "beyond";

function emptyPhoto(): AboutPhoto {
  return { src: "", alt: "", caption: "" };
}

export default function AboutPageEditor({ initialContent }: AboutPageEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const updateHero = (
    field: keyof AboutPageContent["hero"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateIntro = (
    field: "portraitImage" | "portraitAlt",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      intro: { ...prev.intro, [field]: value },
    }));
  };

  const updateParagraph = (
    section: ParagraphSection,
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

  const addParagraph = (section: ParagraphSection) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        paragraphs: [...prev[section].paragraphs, ""],
      },
    }));
  };

  const removeParagraph = (section: ParagraphSection, index: number) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        paragraphs: prev[section].paragraphs.filter((_, i) => i !== index),
      },
    }));
  };

  const updateStory = (field: "eyebrow", value: string) => {
    setContent((prev) => ({
      ...prev,
      story: { ...prev.story, [field]: value },
    }));
  };

  const updatePhotos = (
    field: "eyebrow" | "title",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      photos: { ...prev.photos, [field]: value },
    }));
  };

  const updatePhotoItem = (
    index: number,
    field: keyof AboutPhoto,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        items: prev.photos.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addPhoto = () => {
    setContent((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        items: [...prev.photos.items, emptyPhoto()],
      },
    }));
  };

  const removePhoto = (index: number) => {
    setContent((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        items: prev.photos.items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateBeyond = (
    field: keyof Omit<AboutPageContent["beyond"], "paragraphs">,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      beyond: { ...prev.beyond, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const result = await saveAboutPageContent(content);

    setPopup(
      result.success
        ? { type: "success", message: result.message }
        : { type: "error", message: result.message }
    );
    setLoading(false);
  };

  const paragraphList = (section: ParagraphSection, label: string) => (
    <>
      <div className={styles.repeatableList}>
        {content[section].paragraphs.map((paragraph, index) => (
          <div key={index} className={styles.repeatableItem}>
            <div className={styles.repeatableHeader}>
              <h3 className={styles.repeatableTitle}>
                {label} {index + 1}
              </h3>
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
    </>
  );

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>About</h1>
          <p className={styles.pageDescription}>
            Edit the about page hero, intro, story, photo gallery, and beyond
            section.
          </p>
        </div>
        <Link href="/about" className={styles.viewSiteBtn} target="_blank">
          View about page &rarr;
        </Link>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="About page saved successfully"
        errorTitle="Could not save about page"
        idPrefix="aboutpage"
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
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                value={content.hero.title}
                onChange={(e) => updateHero("title", e.target.value)}
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
          <h2 className={styles.editorSectionTitle}>Intro</h2>
          <div className={styles.editorGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <AdminImageUpload
                label="Portrait image"
                value={content.intro.portraitImage}
                onChange={(url) => updateIntro("portraitImage", url)}
                altValue={content.intro.portraitAlt}
                onAltChange={(value) => updateIntro("portraitAlt", value)}
              />
            </div>
          </div>
          {paragraphList("intro", "Paragraph")}
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Story</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.story.eyebrow}
                onChange={(e) => updateStory("eyebrow", e.target.value)}
              />
            </div>
          </div>
          {paragraphList("story", "Paragraph")}
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Photos</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.photos.eyebrow}
                onChange={(e) => updatePhotos("eyebrow", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section title</label>
              <input
                className={styles.input}
                value={content.photos.title}
                onChange={(e) => updatePhotos("title", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.repeatableList}>
            {content.photos.items.map((item, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>Photo {index + 1}</h3>
                  {content.photos.items.length > 1 ? (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removePhoto(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <AdminImageUpload
                  label="Photo"
                  value={item.src}
                  onChange={(url) => updatePhotoItem(index, "src", url)}
                  altValue={item.alt}
                  onAltChange={(value) => updatePhotoItem(index, "alt", value)}
                />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Caption</label>
                  <input
                    className={styles.input}
                    value={item.caption}
                    onChange={(e) =>
                      updatePhotoItem(index, "caption", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={addPhoto}>
            + Add photo
          </button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Beyond</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.beyond.eyebrow}
                onChange={(e) => updateBeyond("eyebrow", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Button text</label>
              <input
                className={styles.input}
                value={content.beyond.buttonText}
                onChange={(e) => updateBeyond("buttonText", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Button link</label>
              <input
                className={styles.input}
                value={content.beyond.buttonHref}
                onChange={(e) => updateBeyond("buttonHref", e.target.value)}
              />
            </div>
          </div>
          {paragraphList("beyond", "Paragraph")}
        </section>

        <div className={styles.editorActions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Saving..." : "Save about page"}
          </button>
        </div>
      </form>
    </div>
  );
}

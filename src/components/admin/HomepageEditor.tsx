"use client";

import { useState } from "react";
import Link from "next/link";
import { saveHomepageContent } from "@/app/actions/homepageActions";
import type { HomepageContent, SocialLink, Testimonial } from "@/data/homepage";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type HomepageEditorProps = {
  initialContent: HomepageContent;
};

function emptyTestimonial(): Testimonial {
  return { quote: "", attribution: "A reader" };
}

function emptySocialLink(): SocialLink {
  return { label: "", href: "", handle: "" };
}

export default function HomepageEditor({ initialContent }: HomepageEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const updateAuthor = (field: keyof HomepageContent["author"], value: string) => {
    setContent((prev) => ({
      ...prev,
      author: { ...prev.author, [field]: value },
    }));
  };

  const updateBook = (field: keyof HomepageContent["book"], value: string) => {
    setContent((prev) => ({
      ...prev,
      book: { ...prev.book, [field]: value },
    }));
  };

  const updateReaderVoices = (
    field: "eyebrow" | "title",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      readerVoices: { ...prev.readerVoices, [field]: value },
    }));
  };

  const updateTestimonial = (
    index: number,
    field: keyof Testimonial,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      readerVoices: {
        ...prev.readerVoices,
        testimonials: prev.readerVoices.testimonials.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addTestimonial = () => {
    setContent((prev) => ({
      ...prev,
      readerVoices: {
        ...prev.readerVoices,
        testimonials: [...prev.readerVoices.testimonials, emptyTestimonial()],
      },
    }));
  };

  const removeTestimonial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      readerVoices: {
        ...prev.readerVoices,
        testimonials: prev.readerVoices.testimonials.filter((_, i) => i !== index),
      },
    }));
  };

  const updateAboutAuthor = (
    field: keyof HomepageContent["aboutAuthor"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      aboutAuthor: { ...prev.aboutAuthor, [field]: value },
    }));
  };

  const updateFooter = (value: string) => {
    setContent((prev) => ({
      ...prev,
      footer: { message: value },
    }));
  };

  const updateSocialLink = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addSocialLink = () => {
    setContent((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, emptySocialLink()],
    }));
  };

  const removeSocialLink = (index: number) => {
    setContent((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const result = await saveHomepageContent(content);

    if (result.success) {
      setPopup({ type: "success", message: result.message });
    } else {
      setPopup({ type: "error", message: result.message });
    }

    setLoading(false);
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Homepage</h1>
          <p className={styles.pageDescription}>
            Edit Author, The Book, Reader Voices, About the Author, and social
            links shown on the homepage.
          </p>
        </div>
        <Link href="/" className={styles.viewSiteBtn} target="_blank">
          View homepage &rarr;
        </Link>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="Homepage saved successfully"
        errorTitle="Could not save homepage"
        idPrefix="homepage"
      />

      <form onSubmit={handleSubmit} className={styles.editorForm}>
        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Author</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.author.eyebrow}
                onChange={(e) => updateAuthor("eyebrow", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Heading</label>
              <input
                className={styles.input}
                value={content.author.heading}
                onChange={(e) => updateAuthor("heading", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Tagline</label>
              <textarea
                className={styles.textarea}
                rows={2}
                value={content.author.tagline}
                onChange={(e) => updateAuthor("tagline", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <AdminImageUpload
                label="Author portrait"
                value={content.author.portraitImage}
                onChange={(url) => updateAuthor("portraitImage", url)}
                altValue={content.author.portraitAlt}
                onAltChange={(value) => updateAuthor("portraitAlt", value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Primary button text</label>
              <input
                className={styles.input}
                value={content.author.primaryButtonText}
                onChange={(e) => updateAuthor("primaryButtonText", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Primary button link</label>
              <input
                className={styles.input}
                value={content.author.primaryButtonHref}
                onChange={(e) => updateAuthor("primaryButtonHref", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Secondary button text</label>
              <input
                className={styles.input}
                value={content.author.secondaryButtonText}
                onChange={(e) =>
                  updateAuthor("secondaryButtonText", e.target.value)
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Secondary button link</label>
              <input
                className={styles.input}
                value={content.author.secondaryButtonHref}
                onChange={(e) =>
                  updateAuthor("secondaryButtonHref", e.target.value)
                }
              />
            </div>
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>The Book</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.book.eyebrow}
                onChange={(e) => updateBook("eyebrow", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                value={content.book.title}
                onChange={(e) => updateBook("title", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Subtitle</label>
              <input
                className={styles.input}
                value={content.book.subtitle}
                onChange={(e) => updateBook("subtitle", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textarea}
                rows={4}
                value={content.book.description}
                onChange={(e) => updateBook("description", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <AdminImageUpload
                label="Book cover"
                value={content.book.coverImage}
                onChange={(url) => updateBook("coverImage", url)}
                altValue={content.book.coverAlt}
                onAltChange={(value) => updateBook("coverAlt", value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Link text</label>
              <input
                className={styles.input}
                value={content.book.linkText}
                onChange={(e) => updateBook("linkText", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Link URL</label>
              <input
                className={styles.input}
                value={content.book.linkHref}
                onChange={(e) => updateBook("linkHref", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Reader Voices</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.readerVoices.eyebrow}
                onChange={(e) => updateReaderVoices("eyebrow", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section title</label>
              <input
                className={styles.input}
                value={content.readerVoices.title}
                onChange={(e) => updateReaderVoices("title", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.repeatableList}>
            {content.readerVoices.testimonials.map((item, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>Testimonial {index + 1}</h3>
                  {content.readerVoices.testimonials.length > 1 ? (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeTestimonial(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quote</label>
                  <textarea
                    className={styles.textarea}
                    rows={3}
                    value={item.quote}
                    onChange={(e) =>
                      updateTestimonial(index, "quote", e.target.value)
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Attribution</label>
                  <input
                    className={styles.input}
                    value={item.attribution}
                    onChange={(e) =>
                      updateTestimonial(index, "attribution", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addBtn}
            onClick={addTestimonial}
          >
            + Add testimonial
          </button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>About the Author</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.aboutAuthor.eyebrow}
                onChange={(e) => updateAboutAuthor("eyebrow", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Bio</label>
              <textarea
                className={styles.textarea}
                rows={4}
                value={content.aboutAuthor.bio}
                onChange={(e) => updateAboutAuthor("bio", e.target.value)}
              />
              <p className={styles.fieldHint}>
                You can use simple HTML like &lt;em&gt; for italics.
              </p>
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <AdminImageUpload
                label="About photo"
                value={content.aboutAuthor.portraitImage}
                onChange={(url) => updateAboutAuthor("portraitImage", url)}
                altValue={content.aboutAuthor.portraitAlt}
                onAltChange={(value) => updateAboutAuthor("portraitAlt", value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Link text</label>
              <input
                className={styles.input}
                value={content.aboutAuthor.linkText}
                onChange={(e) => updateAboutAuthor("linkText", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Link URL</label>
              <input
                className={styles.input}
                value={content.aboutAuthor.linkHref}
                onChange={(e) => updateAboutAuthor("linkHref", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Footer message</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Message above retailer buttons</label>
            <textarea
              className={styles.textarea}
              rows={3}
              value={content.footer.message}
              onChange={(e) => updateFooter(e.target.value)}
            />
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Social links</h2>
          <p className={styles.sectionNote}>
            Facebook, Instagram, LinkedIn, and other links shown in the homepage
            footer bar.
          </p>

          <div className={styles.repeatableList}>
            {content.socialLinks.map((item, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>Link {index + 1}</h3>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeSocialLink(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.editorGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Label</label>
                    <input
                      className={styles.input}
                      placeholder="Facebook"
                      value={item.label}
                      onChange={(e) =>
                        updateSocialLink(index, "label", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>URL</label>
                    <input
                      className={styles.input}
                      placeholder="https://..."
                      value={item.href}
                      onChange={(e) =>
                        updateSocialLink(index, "href", e.target.value)
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Handle (optional)</label>
                    <input
                      className={styles.input}
                      placeholder="@username"
                      value={item.handle}
                      onChange={(e) =>
                        updateSocialLink(index, "handle", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={addSocialLink}>
            + Add social link
          </button>
        </section>

        <div className={styles.editorActions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Saving..." : "Save homepage"}
          </button>
        </div>
      </form>
    </div>
  );
}

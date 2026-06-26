"use client";

import { useState } from "react";
import Link from "next/link";
import { saveContactPageContent } from "@/app/actions/contactPageActions";
import type { ContactCard, ContactPageContent } from "@/data/contactPage";
import type { SocialLink } from "@/data/homepage";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type ContactPageEditorProps = {
  initialContent: ContactPageContent;
};

function emptyContactCard(): ContactCard {
  return { title: "", description: "" };
}

function emptyFormOption(): { value: string; label: string } {
  return { value: "", label: "" };
}

function emptySocialLink(): SocialLink {
  return { label: "", href: "", handle: "" };
}

export default function ContactPageEditor({
  initialContent,
}: ContactPageEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const updateHero = (
    field: keyof ContactPageContent["hero"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateCard = (
    index: number,
    field: keyof ContactCard,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      cards: prev.cards.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addCard = () => {
    setContent((prev) => ({
      ...prev,
      cards: [...prev.cards, emptyContactCard()],
    }));
  };

  const removeCard = (index: number) => {
    setContent((prev) => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index),
    }));
  };

  const updateForm = (
    field: keyof Omit<ContactPageContent["form"], "options">,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      form: { ...prev.form, [field]: value },
    }));
  };

  const updateFormOption = (
    index: number,
    field: "value" | "label",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        options: prev.form.options.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addFormOption = () => {
    setContent((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        options: [...prev.form.options, emptyFormOption()],
      },
    }));
  };

  const removeFormOption = (index: number) => {
    setContent((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        options: prev.form.options.filter((_, i) => i !== index),
      },
    }));
  };

  const updateElsewhere = (
    field: keyof ContactPageContent["elsewhere"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      elsewhere: { ...prev.elsewhere, [field]: value },
    }));
  };

  const updateNewsletter = (
    field: keyof ContactPageContent["newsletter"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      newsletter: { ...prev.newsletter, [field]: value },
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

    const result = await saveContactPageContent(content);

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
          <h1 className={styles.pageTitle}>Connect</h1>
          <p className={styles.pageDescription}>
            Edit the hero, contact cards, form labels, elsewhere section,
            newsletter, and social links shown on the Connect page.
          </p>
        </div>
        <Link href="/contact" className={styles.viewSiteBtn} target="_blank">
          View Connect page &rarr;
        </Link>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="Connect page saved successfully"
        errorTitle="Could not save Connect page"
        idPrefix="connect"
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
                rows={3}
                value={content.hero.subtitle}
                onChange={(e) => updateHero("subtitle", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Contact cards</h2>
          <p className={styles.sectionNote}>
            Short cards shown beside the contact form describing who can reach
            out and why.
          </p>

          <div className={styles.repeatableList}>
            {content.cards.map((item, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>Card {index + 1}</h3>
                  {content.cards.length > 1 ? (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeCard(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className={styles.editorGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Title</label>
                    <input
                      className={styles.input}
                      value={item.title}
                      onChange={(e) =>
                        updateCard(index, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Description</label>
                    <textarea
                      className={styles.textarea}
                      rows={3}
                      value={item.description}
                      onChange={(e) =>
                        updateCard(index, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addBtn} onClick={addCard}>
            + Add contact card
          </button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Form labels</h2>
          <p className={styles.sectionNote}>
            Text shown on the contact form. Submissions appear in Queries.
          </p>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name label</label>
              <input
                className={styles.input}
                value={content.form.nameLabel}
                onChange={(e) => updateForm("nameLabel", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name placeholder</label>
              <input
                className={styles.input}
                value={content.form.namePlaceholder}
                onChange={(e) =>
                  updateForm("namePlaceholder", e.target.value)
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email label</label>
              <input
                className={styles.input}
                value={content.form.emailLabel}
                onChange={(e) => updateForm("emailLabel", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email placeholder</label>
              <input
                className={styles.input}
                value={content.form.emailPlaceholder}
                onChange={(e) =>
                  updateForm("emailPlaceholder", e.target.value)
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Subject label</label>
              <input
                className={styles.input}
                value={content.form.subjectLabel}
                onChange={(e) => updateForm("subjectLabel", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Subject hint</label>
              <input
                className={styles.input}
                value={content.form.subjectHint}
                onChange={(e) => updateForm("subjectHint", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Message label</label>
              <input
                className={styles.input}
                value={content.form.messageLabel}
                onChange={(e) => updateForm("messageLabel", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Message placeholder</label>
              <input
                className={styles.input}
                value={content.form.messagePlaceholder}
                onChange={(e) =>
                  updateForm("messagePlaceholder", e.target.value)
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Submit button text</label>
              <input
                className={styles.input}
                value={content.form.submitText}
                onChange={(e) => updateForm("submitText", e.target.value)}
              />
            </div>
          </div>

          <p className={styles.sectionNote}>Subject dropdown options</p>
          <div className={styles.repeatableList}>
            {content.form.options.map((item, index) => (
              <div key={index} className={styles.repeatableItem}>
                <div className={styles.repeatableHeader}>
                  <h3 className={styles.repeatableTitle}>Option {index + 1}</h3>
                  {content.form.options.length > 1 ? (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeFormOption(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className={styles.editorGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Value</label>
                    <input
                      className={styles.input}
                      placeholder="reader"
                      value={item.value}
                      onChange={(e) =>
                        updateFormOption(index, "value", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Label</label>
                    <input
                      className={styles.input}
                      placeholder="A reader message"
                      value={item.label}
                      onChange={(e) =>
                        updateFormOption(index, "label", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.addBtn}
            onClick={addFormOption}
          >
            + Add subject option
          </button>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Elsewhere</h2>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.elsewhere.eyebrow}
                onChange={(e) => updateElsewhere("eyebrow", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                value={content.elsewhere.title}
                onChange={(e) => updateElsewhere("title", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Social links</h2>
          <p className={styles.sectionNote}>
            Links shown in the Elsewhere section below the contact form.
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

        <section className={styles.editorSection}>
          <h2 className={styles.editorSectionTitle}>Newsletter</h2>
          <p className={styles.sectionNote}>
            Shown below the social links. Footer &quot;Newsletter&quot; link scrolls
            here.
          </p>
          <div className={styles.editorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Eyebrow</label>
              <input
                className={styles.input}
                value={content.newsletter.eyebrow}
                onChange={(e) => updateNewsletter("eyebrow", e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                value={content.newsletter.title}
                onChange={(e) => updateNewsletter("title", e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textarea}
                rows={3}
                value={content.newsletter.description}
                onChange={(e) =>
                  updateNewsletter("description", e.target.value)
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email placeholder</label>
              <input
                className={styles.input}
                value={content.newsletter.placeholder}
                onChange={(e) =>
                  updateNewsletter("placeholder", e.target.value)
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Button text</label>
              <input
                className={styles.input}
                value={content.newsletter.buttonText}
                onChange={(e) => updateNewsletter("buttonText", e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className={styles.editorActions}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Saving..." : "Save Connect page"}
          </button>
        </div>
      </form>
    </div>
  );
}

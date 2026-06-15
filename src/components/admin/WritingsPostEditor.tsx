"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveWritingPost } from "@/app/actions/writingsPostActions";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminRichTextEditor from "@/components/admin/AdminRichTextEditor";
import {
  emptyFaq,
  normalizePostForm,
  SUGGESTED_WRITING_TAGS,
  WRITING_CATEGORIES,
  type EssayFaq,
  type WritingsPostForm,
  type WritingCategory,
} from "@/data/writingsPage";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type WritingsPostEditorProps = {
  mode: "new" | "edit";
  initialForm: WritingsPostForm;
  originalSlug?: string;
};

function slugifyTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function WritingsPostEditor({
  mode,
  initialForm,
  originalSlug,
}: WritingsPostEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState(() => normalizePostForm(initialForm));
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);
  const [newTag, setNewTag] = useState("");

  const pageTitle = mode === "new" ? "Add Writings" : "Edit Writings";

  const updateForm = <K extends keyof WritingsPostForm>(
    key: K,
    value: WritingsPostForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateSeo = (key: keyof WritingsPostForm["seo"], value: string) => {
    setForm((prev) => ({
      ...prev,
      seo: { ...prev.seo, [key]: value },
    }));
  };

  const toggleTag = (tag: string) => {
    setForm((prev) => {
      const tags = prev.tags ?? [];
      const hasTag = tags.includes(tag);
      return {
        ...prev,
        tags: hasTag
          ? tags.filter((item) => item !== tag)
          : [...tags, tag],
      };
    });
  };

  const addCustomTag = () => {
    const tag = newTag.trim();
    if (!tag) return;
    setForm((prev) => {
      const tags = prev.tags ?? [];
      return {
        ...prev,
        tags: tags.includes(tag) ? tags : [...tags, tag],
      };
    });
    setNewTag("");
  };

  const updateFaq = (index: number, field: keyof EssayFaq, value: string) => {
    setForm((prev) => ({
      ...prev,
      faqs: (prev.faqs ?? []).map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const removeFaq = (index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: (prev.faqs ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const result = await saveWritingPost({
      form,
      originalSlug,
    });

    if (result.success) {
      setPopup({ type: "success", message: result.message });
      setTimeout(() => router.push("/admin/writings"), 1200);
    } else {
      setPopup({ type: "error", message: result.message });
    }

    setLoading(false);
  };

  return (
    <div>
      <div className={styles.postTopBar}>
        <h1 className={styles.listingsPageTitle}>{pageTitle}</h1>
        <p className={styles.listingsBreadcrumb}>
          <Link href="/admin/writings">Writings</Link>
          <span className={styles.listingsBreadcrumbSep}>&gt;</span>
          <span className={styles.listingsBreadcrumbCurrent}>
            {mode === "new" ? "Add New" : "Edit"}
          </span>
        </p>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="Writing saved successfully"
        errorTitle="Could not save writing"
        idPrefix="writingspost"
      />

      <form onSubmit={handleSubmit}>
        <div className={styles.postEditorLayout}>
          <div className={styles.postEditorMain}>
            <section className={styles.postPanel}>
              <h2 className={styles.postPanelTitle}>Add New</h2>

              <div className={styles.postTitleRow}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Blog Name / Title *</label>
                  <input
                    className={styles.input}
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        title,
                        slug:
                          mode === "new" && !prev.slug
                            ? slugifyTitle(title)
                            : prev.slug,
                        seo: {
                          ...prev.seo,
                          metaTitle: prev.seo.metaTitle || title.slice(0, 70),
                        },
                      }));
                    }}
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date</label>
                  <input
                    className={styles.input}
                    value={form.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    placeholder="March 2026"
                  />
                </div>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Blog URL *</label>
                <input
                  className={styles.input}
                  value={form.slug}
                  onChange={(e) =>
                    updateForm(
                      "slug",
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "-")
                    )
                  }
                  placeholder="blog-url-slug"
                  required
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Short Description</label>
                <textarea
                  className={styles.textarea}
                  rows={3}
                  value={form.shortDescription}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      shortDescription: value,
                      seo: {
                        ...prev.seo,
                        metaDescription:
                          prev.seo.metaDescription || value.slice(0, 250),
                      },
                    }));
                  }}
                  placeholder="Brief summary for listings and SEO"
                />
              </div>
            </section>

            <section className={styles.postPanel}>
              <h2 className={styles.postPanelTitle}>Description</h2>
              <AdminRichTextEditor
                value={form.bodyHtml}
                onChange={(html) => updateForm("bodyHtml", html)}
                minHeight={360}
              />
            </section>

            <section className={styles.postPanel}>
              <h2 className={styles.postPanelTitle}>Faq&apos;s</h2>
              <p className={styles.sectionNote}>
                Add questions and answers for this writing.
              </p>

              {(form.faqs ?? []).map((faq, index) => (
                <div key={faq.id} className={styles.faqBlock}>
                  <div className={styles.faqQuestionRow}>
                    <input
                      className={styles.input}
                      value={faq.question}
                      onChange={(e) =>
                        updateFaq(index, "question", e.target.value)
                      }
                      placeholder="Question"
                    />
                    <button
                      type="button"
                      className={styles.faqDeleteBtn}
                      onClick={() => removeFaq(index)}
                      aria-label="Delete FAQ"
                    >
                      ×
                    </button>
                  </div>
                  <AdminRichTextEditor
                    value={faq.answerHtml}
                    onChange={(html) => updateFaq(index, "answerHtml", html)}
                    minHeight={180}
                    placeholder="Answer"
                  />
                </div>
              ))}

              <button
                type="button"
                className={styles.faqAddBtn}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    faqs: [...(prev.faqs ?? []), emptyFaq()],
                  }))
                }
              >
                +
              </button>
            </section>

            <section className={styles.postPanel}>
              <h2 className={styles.postPanelTitle}>SEO - Meta Tags</h2>
              <p className={styles.sectionNote}>
                Define page meta title, meta keywords and meta description to
                list your page in search engines.
              </p>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Meta Title: *</label>
                <input
                  className={styles.input}
                  value={form.seo.metaTitle}
                  onChange={(e) => updateSeo("metaTitle", e.target.value)}
                  maxLength={70}
                  required
                />
                <span className={styles.fieldHint}>Max length 70 characters</span>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Meta Keyword:</label>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  value={form.seo.metaKeywords}
                  onChange={(e) => updateSeo("metaKeywords", e.target.value)}
                  maxLength={160}
                />
                <span className={styles.fieldHint}>
                  Max length 160 characters
                </span>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Meta Description:</label>
                <textarea
                  className={styles.textarea}
                  rows={4}
                  value={form.seo.metaDescription}
                  onChange={(e) => updateSeo("metaDescription", e.target.value)}
                  maxLength={250}
                />
                <span className={styles.fieldHint}>
                  Max length 250 characters
                </span>
              </div>
            </section>
          </div>

          <aside className={styles.postEditorSidebar}>
            <section className={styles.postSidePanel}>
              <h3 className={styles.postSideTitle}>Publish</h3>
              <button
                type="submit"
                className={styles.postPublishBtn}
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
              <Link href="/admin/writings" className={styles.postCancelLink}>
                Back to listings
              </Link>
            </section>

            <section className={styles.postSidePanel}>
              <h3 className={styles.postSideTitle}>Status</h3>
              <label className={styles.postCheckLabel}>
                <input
                  type="radio"
                  name="status"
                  checked={form.status === "ACTIVE"}
                  onChange={() => updateForm("status", "ACTIVE")}
                />
                <span>ACTIVE</span>
              </label>
              <label className={styles.postCheckLabel}>
                <input
                  type="radio"
                  name="status"
                  checked={form.status === "INACTIVE"}
                  onChange={() => updateForm("status", "INACTIVE")}
                />
                <span>INACTIVE</span>
              </label>
            </section>

            <section className={styles.postSidePanel}>
              <h3 className={styles.postSideTitle}>Categories</h3>
              {WRITING_CATEGORIES.map((category) => (
                <label key={category} className={styles.postCheckLabel}>
                  <input
                    type="radio"
                    name="category"
                    checked={form.category === category}
                    onChange={() =>
                      updateForm("category", category as WritingCategory)
                    }
                  />
                  <span>{category}</span>
                </label>
              ))}
            </section>

            <section className={styles.postSidePanel}>
              <h3 className={styles.postSideTitle}>Tags</h3>
              <div className={styles.postTagsList}>
                {SUGGESTED_WRITING_TAGS.map((tag) => (
                  <label key={tag} className={styles.postCheckLabel}>
                    <input
                      type="checkbox"
                      checked={(form.tags ?? []).includes(tag)}
                      onChange={() => toggleTag(tag)}
                    />
                    <span>{tag}</span>
                  </label>
                ))}
                {(form.tags ?? [])
                  .filter((tag) => !SUGGESTED_WRITING_TAGS.includes(tag))
                  .map((tag) => (
                    <label key={tag} className={styles.postCheckLabel}>
                      <input
                        type="checkbox"
                        checked
                        onChange={() => toggleTag(tag)}
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
              </div>
              <div className={styles.postTagAddRow}>
                <input
                  className={styles.input}
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add new tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomTag();
                    }
                  }}
                />
              </div>
            </section>

            <section className={styles.postSidePanel}>
              <h3 className={styles.postSideTitle}>Featured</h3>
              <label className={styles.postCheckLabel}>
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => updateForm("isFeatured", e.target.checked)}
                />
                <span>Mark as featured writing</span>
              </label>
            </section>

            <section className={styles.postSidePanel}>
              <h3 className={styles.postSideTitle}>Featured Image</h3>
              <AdminImageUpload
                label="Featured Image"
                value={form.image}
                onChange={(url) => updateForm("image", url)}
                altValue={form.imageAlt}
                onAltChange={(value) => updateForm("imageAlt", value)}
              />
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}

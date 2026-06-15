"use client";

import { useState } from "react";
import {
  deleteWritingTag,
  saveWritingTag,
} from "@/app/actions/writingTagsActions";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import {
  emptyTagForm,
  tagToForm,
  type WritingTagForm,
  type WritingTagRecord,
} from "@/data/writingTags";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type WritingsTagsManagerProps = {
  initialTags: WritingTagRecord[];
};

function PencilIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export default function WritingsTagsManager({
  initialTags,
}: WritingsTagsManagerProps) {
  const [tags, setTags] = useState<WritingTagRecord[]>(initialTags);
  const [form, setForm] = useState<WritingTagForm>(emptyTagForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const resetForm = () => {
    setForm(emptyTagForm());
    setEditingId(null);
  };

  const handleEdit = (record: WritingTagRecord) => {
    setEditingId(record.id);
    setForm(tagToForm(record));
    setPopup(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const result = await saveWritingTag({
      form,
      editingId: editingId ?? undefined,
    });

    if (result.success) {
      if ("tags" in result && Array.isArray(result.tags)) {
        setTags(result.tags);
      }
      setPopup({ type: "success", message: result.message });
      resetForm();
    } else {
      setPopup({ type: "error", message: result.message });
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this tag?")) return;

    setLoading(true);
    const result = await deleteWritingTag(id);

    if (result.success) {
      if ("tags" in result && Array.isArray(result.tags)) {
        setTags(result.tags);
      }
      if (editingId === id) resetForm();
      setPopup({ type: "success", message: "Tag deleted." });
    } else {
      setPopup({ type: "error", message: result.message });
    }

    setLoading(false);
  };

  const total = tags.length;

  return (
    <div>
      <div className={styles.listingsTopBar}>
        <h1 className={styles.listingsPageTitle}>Manage Tags</h1>
        <p className={styles.listingsBreadcrumb}>
          <span>Tags</span>
          <span className={styles.listingsBreadcrumbSep}>&gt;</span>
          <span className={styles.listingsBreadcrumbCurrent}>Manage Tags</span>
        </p>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="Tag saved successfully"
        errorTitle="Could not save tag"
        idPrefix="writingtags"
      />

      <div className={styles.categoriesLayout}>
        <section className={styles.categoriesFormCard}>
          <h2 className={styles.categoriesCardTitle}>
            {editingId ? "Edit Tag" : "Add New Tag"}
          </h2>

          <form onSubmit={handleSubmit} className={styles.categoriesForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Tag Name / Title: <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input}
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <span className={styles.fieldHint}>
                This name appears on your site
              </span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select
                className={styles.input}
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.value as WritingTagForm["status"],
                  }))
                }
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            <div className={styles.categoriesFormActions}>
              <button
                type="submit"
                className={styles.categorySaveBtn}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  className={styles.categoryCancelBtn}
                  onClick={resetForm}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className={styles.categoriesTableCard}>
          <h2 className={styles.categoriesCardTitle}>Tags Listings</h2>

          <div className={styles.listingsTableWrap}>
            <table className={styles.listingsTable}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Tag Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag, index) => (
                  <tr key={tag.id}>
                    <td className={styles.listingsCellNum}>{index + 1}</td>
                    <td className={styles.listingsCellTitle}>{tag.name}</td>
                    <td>
                      <span
                        className={
                          tag.status === "ACTIVE"
                            ? styles.listingsStatusActive
                            : styles.listingsStatusInactive
                        }
                      >
                        {tag.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.categoryActionGroup}>
                        <button
                          type="button"
                          className={styles.listingsEditBtn}
                          onClick={() => handleEdit(tag)}
                          aria-label={`Edit ${tag.name}`}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          className={styles.categoryDeleteBtn}
                          onClick={() => handleDelete(tag.id)}
                          aria-label={`Delete ${tag.name}`}
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={styles.tableFooterNote}>
            Showing 1 to {total} of {total} entries
          </p>
        </section>
      </div>
    </div>
  );
}

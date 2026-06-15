"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  deleteWritingCategory,
  saveWritingCategory,
} from "@/app/actions/writingCategoriesActions";
import AdminSavePopup from "@/components/admin/AdminSavePopup";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import {
  categoryToForm,
  emptyCategoryForm,
  MAIN_CATEGORY_VALUE,
  type WritingCategoryForm,
  type WritingCategoryRecord,
} from "@/data/writingCategories";
import styles from "@/app/admin/admin.module.css";

type PopupState = {
  type: "success" | "error";
  message: string;
} | null;

type WritingsCategoriesManagerProps = {
  initialCategories: WritingCategoryRecord[];
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

export default function WritingsCategoriesManager({
  initialCategories,
}: WritingsCategoriesManagerProps) {
  const [categories, setCategories] =
    useState<WritingCategoryRecord[]>(initialCategories);
  const [form, setForm] = useState<WritingCategoryForm>(emptyCategoryForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const parentOptions = useMemo(
    () =>
      categories.filter(
        (category) => !editingId || category.id !== editingId
      ),
    [categories, editingId]
  );

  const resetForm = () => {
    setForm(emptyCategoryForm());
    setEditingId(null);
  };

  const handleEdit = (record: WritingCategoryRecord) => {
    setEditingId(record.id);
    setForm(categoryToForm(record));
    setPopup(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);

    const result = await saveWritingCategory({
      form,
      editingId: editingId ?? undefined,
    });

    if (result.success) {
      if ("categories" in result && Array.isArray(result.categories)) {
        setCategories(result.categories);
      }
      setPopup({ type: "success", message: result.message });
      resetForm();
    } else {
      setPopup({ type: "error", message: result.message });
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;

    setLoading(true);
    const result = await deleteWritingCategory(id);

    if (result.success) {
      if ("categories" in result && Array.isArray(result.categories)) {
        setCategories(result.categories);
      }
      if (editingId === id) resetForm();
      setPopup({ type: "success", message: "Category deleted." });
    } else {
      setPopup({ type: "error", message: result.message });
    }

    setLoading(false);
  };

  const total = categories.length;

  return (
    <div>
      <div className={styles.listingsTopBar}>
        <h1 className={styles.listingsPageTitle}>Manage Categories</h1>
        <p className={styles.listingsBreadcrumb}>
          <span>Categories</span>
          <span className={styles.listingsBreadcrumbSep}>&gt;</span>
          <span className={styles.listingsBreadcrumbCurrent}>
            Manage Categories
          </span>
        </p>
      </div>

      <AdminSavePopup
        popup={popup}
        onClose={() => setPopup(null)}
        successTitle="Category saved successfully"
        errorTitle="Could not save category"
        idPrefix="writingcategories"
      />

      <div className={styles.categoriesLayout}>
        <section className={styles.categoriesFormCard}>
          <h2 className={styles.categoriesCardTitle}>
            {editingId ? "Edit Category" : "Add New Category"}
          </h2>

          <form onSubmit={handleSubmit} className={styles.categoriesForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Category Name / Title: <span className={styles.required}>*</span>
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
              <label className={styles.label}>Parent Categories:</label>
              <select
                className={styles.input}
                value={form.parentId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, parentId: e.target.value }))
                }
              >
                <option value={MAIN_CATEGORY_VALUE}>Main category</option>
                {parentOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <AdminImageUpload
              label="Image:"
              value={form.image}
              onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
              altValue={form.imageAlt}
              onAltChange={(value) =>
                setForm((prev) => ({ ...prev, imageAlt: value }))
              }
            />
            <span className={styles.fieldHint}>
              Accepted: webp, jpeg, png, jpg. Max file size 8 MB
            </span>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select
                className={styles.input}
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.value as WritingCategoryForm["status"],
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
          <h2 className={styles.categoriesCardTitle}>Category Listings</h2>

          <div className={styles.listingsTableWrap}>
            <table className={styles.listingsTable}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td className={styles.listingsCellNum}>{index + 1}</td>
                    <td>
                      <div className={styles.categoryNameCell}>
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.imageAlt || category.name}
                            width={36}
                            height={36}
                            className={styles.categoryListThumb}
                          />
                        ) : (
                          <span className={styles.categoryListThumbPlaceholder} />
                        )}
                        <span>{category.name}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={
                          category.status === "ACTIVE"
                            ? styles.listingsStatusActive
                            : styles.listingsStatusInactive
                        }
                      >
                        {category.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.categoryActionGroup}>
                        <button
                          type="button"
                          className={styles.listingsEditBtn}
                          onClick={() => handleEdit(category)}
                          aria-label={`Edit ${category.name}`}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          className={styles.categoryDeleteBtn}
                          onClick={() => handleDelete(category.id)}
                          aria-label={`Delete ${category.name}`}
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

"use client";

import { useState, useTransition } from "react";
import {
  deleteContactInquiry,
  setContactInquiryStatus,
} from "@/app/actions/contactInquiryActions";
import type { ContactInquiry } from "@/data/contactInquiry";
import { notifyAdminQueriesUpdated } from "@/lib/adminQueriesEvents";
import styles from "@/app/admin/admin.module.css";

type QueriesListProps = {
  initialInquiries: ContactInquiry[];
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function EyeIcon() {
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
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrashIcon() {
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
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export default function QueriesList({ initialInquiries }: QueriesListProps) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selected, setSelected] = useState<ContactInquiry | null>(null);
  const [isPending, startTransition] = useTransition();

  const updateStatus = (id: string, status: "pending" | "resolved") => {
    startTransition(async () => {
      const result = await setContactInquiryStatus(id, status);
      if (!result.success) return;

      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
      notifyAdminQueriesUpdated();
    });
  };

  const removeInquiry = (inquiry: ContactInquiry) => {
    const confirmed = window.confirm(
      `Delete inquiry from ${inquiry.name}? This cannot be undone.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteContactInquiry(inquiry.id);
      if (!result.success) return;

      setInquiries((prev) => prev.filter((item) => item.id !== inquiry.id));
      setSelected((prev) => (prev?.id === inquiry.id ? null : prev));
      notifyAdminQueriesUpdated();
    });
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#6b5d52" }}>
                  No inquiries yet. Messages from the Connect form will appear here.
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.subjectLabel}</td>
                  <td>{formatDate(inquiry.createdAt)}</td>
                  <td>
                    <span
                      style={{
                        color: inquiry.status === "resolved" ? "#15803d" : "#c2410c",
                      }}
                    >
                      {inquiry.status === "resolved" ? "Resolved" : "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActionGroup}>
                      <button
                        type="button"
                        className={`${styles.iconBtn} ${styles.viewBtn}`}
                        onClick={() => setSelected(inquiry)}
                        aria-label={`View inquiry from ${inquiry.name}`}
                        title="View"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        type="button"
                        className={`${styles.iconBtn} ${styles.deleteBtn}`}
                        disabled={isPending}
                        onClick={() => removeInquiry(inquiry)}
                        aria-label={`Delete inquiry from ${inquiry.name}`}
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div
          className={styles.popupOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          onClick={() => setSelected(null)}
        >
          <div
            className={styles.popupBox}
            style={{ maxWidth: "560px", textAlign: "left" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <h2 id="inquiry-modal-title" className={styles.popupTitle}>
                Inquiry from {selected.name}
              </h2>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <div style={{ color: "#2d241e", lineHeight: 1.65 }}>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
              </p>
              <p>
                <strong>Subject:</strong> {selected.subjectLabel}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selected.createdAt)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selected.status === "resolved" ? "Resolved" : "Pending"}
              </p>
              <p>
                <strong>Message:</strong>
              </p>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.65 }}>
                {selected.message}
              </p>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {selected.status === "pending" ? (
                <button
                  type="button"
                  className={styles.submitBtn}
                  disabled={isPending}
                  onClick={() => updateStatus(selected.id, "resolved")}
                >
                  Mark as resolved
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.actionBtn}
                  disabled={isPending}
                  onClick={() => updateStatus(selected.id, "pending")}
                >
                  Mark as pending
                </button>
              )}
              <button
                type="button"
                className={styles.actionBtn}
                style={{ color: "#b42318" }}
                disabled={isPending}
                onClick={() => removeInquiry(selected)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

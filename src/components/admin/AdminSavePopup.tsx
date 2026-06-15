import styles from "@/app/admin/admin.module.css";

type AdminSavePopupProps = {
  popup: { type: "success" | "error"; message: string } | null;
  onClose: () => void;
  successTitle: string;
  errorTitle: string;
  idPrefix: string;
};

export default function AdminSavePopup({
  popup,
  onClose,
  successTitle,
  errorTitle,
  idPrefix,
}: AdminSavePopupProps) {
  if (!popup) {
    return null;
  }

  const titleId = `${idPrefix}-popup-title`;

  return (
    <div
      className={styles.popupOverlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`${styles.popupBox} ${
          popup.type === "success" ? styles.popupSuccess : styles.popupError
        }`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.popupEyebrow}>
          {popup.type === "success" ? "Saved" : "Error"}
        </p>
        <h2 id={titleId} className={styles.popupTitle}>
          {popup.type === "success" ? successTitle : errorTitle}
        </h2>
        <p className={styles.popupMessage}>{popup.message}</p>
        <button type="button" className={styles.popupBtn} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadAdminImage } from "@/app/actions/uploadActions";
import styles from "@/app/admin/admin.module.css";

type AdminImageUploadProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  altLabel?: string;
  altValue?: string;
  onAltChange?: (value: string) => void;
};

export default function AdminImageUpload({
  label,
  value,
  onChange,
  altLabel = "Image alt text",
  altValue = "",
  onAltChange,
}: AdminImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    const result = await uploadAdminImage(formData);

    if (result.success && result.url) {
      onChange(result.url);
    } else {
      setError(result.message || "Upload failed.");
    }

    setUploading(false);
    e.target.value = "";
  };

  return (
    <div className={styles.imageUpload}>
      <label className={styles.label}>{label}</label>

      {value ? (
        <div className={styles.imagePreviewWrap}>
          <Image
            src={value}
            alt={altValue || "Uploaded preview"}
            width={320}
            height={220}
            className={styles.imagePreview}
            unoptimized
          />
        </div>
      ) : (
        <div className={styles.imagePreviewPlaceholder}>No image selected</div>
      )}

      <div className={styles.imageUploadActions}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.hiddenFileInput}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className={styles.uploadImageBtn}
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload image"}
        </button>
        {value ? (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onChange("")}
            disabled={uploading}
          >
            Remove
          </button>
        ) : null}
      </div>

      {error ? <p className={styles.imageUploadError}>{error}</p> : null}

      {onAltChange ? (
        <div className={styles.formGroup}>
          <label className={styles.label}>{altLabel}</label>
          <input
            className={styles.input}
            value={altValue}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Describe the image"
          />
        </div>
      ) : null}
    </div>
  );
}

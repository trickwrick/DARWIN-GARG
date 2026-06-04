"use client";

import Image from "next/image";
import { useState } from "react";
import { BOOK_COVER_SRC } from "@/data/book";
import styles from "./BookCover.module.css";

export default function BookCover() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={styles.placeholder} aria-hidden="true">
        <span className={styles.placeholderLabel}>Book cover (placeholder)</span>
      </div>
    );
  }

  return (
    <Image
      src={BOOK_COVER_SRC}
      alt="When Gods Must Return book cover"
      width={400}
      height={600}
      className={styles.image}
      priority
      onError={() => setHasError(true)}
    />
  );
}

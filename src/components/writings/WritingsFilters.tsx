"use client";

import { writingCategories, type WritingFilter } from "@/data/writings";
import styles from "./WritingsFilters.module.css";

type WritingsFiltersProps = {
  active: WritingFilter;
  onChange: (category: WritingFilter) => void;
};

export default function WritingsFilters({
  active,
  onChange,
}: WritingsFiltersProps) {
  return (
    <nav className={styles.filters} aria-label="Filter writings by category">
      <ul className={styles.list}>
        {writingCategories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={
                active === category ? styles.filterActive : styles.filter
              }
              onClick={() => onChange(category)}
              aria-current={active === category ? "true" : undefined}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

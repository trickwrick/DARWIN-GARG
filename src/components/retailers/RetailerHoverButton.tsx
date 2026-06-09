"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { RetailerMarket, RetailerRegion, RetailerWithCities } from "@/data/book";
import styles from "./RetailerButtons.module.css";

type RetailerHoverButtonProps = {
  retailer: RetailerWithCities;
  variant?: "primary" | "outline";
};

const REGION_FLAG: Record<RetailerRegion, string> = {
  IN: "🇮🇳",
  US: "🇺🇸",
  UK: "🇬🇧",
};

const ICON_CLASS: Record<RetailerWithCities["accent"], string> = {
  amazon: styles.retailerIconAmazon,
  barnes: styles.retailerIconBarnes,
  flipkart: styles.retailerIconFlipkart,
};

const ICON_LABEL: Record<RetailerWithCities["accent"], string> = {
  amazon: "a",
  barnes: "B",
  flipkart: "F",
};

export default function RetailerHoverButton({
  retailer,
  variant = "outline",
}: RetailerHoverButtonProps) {
  const { label, href, accent, markets } = retailer;
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const citiesId = useId();

  const buttonClass =
    variant === "primary" ? styles.btnPrimary : styles.btnOutline;

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const wrapClass = [
    styles.retailerWrap,
    isTouch ? styles.touch : styles.hover,
    open ? styles.open : "",
  ]
    .filter(Boolean)
    .join(" ");

  const buttonContent = (
    <>
      <span className={`${styles.retailerIcon} ${ICON_CLASS[accent]}`}>
        {ICON_LABEL[accent]}
      </span>
      <span className={styles.btnLabel}>{label}</span>
      {isTouch ? (
        <span className={styles.chevronIcon} aria-hidden="true">
          ▾
        </span>
      ) : (
        <span className={styles.btnIcon} aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );

  return (
    <div ref={wrapRef} className={wrapClass}>
      {isTouch ? (
        <button
          type="button"
          className={`${buttonClass} ${styles.retailerBtn}`}
          aria-expanded={open}
          aria-controls={citiesId}
          onClick={() => setOpen((value) => !value)}
        >
          {buttonContent}
        </button>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} ${styles.retailerBtn}`}
          aria-describedby={citiesId}
        >
          {buttonContent}
        </a>
      )}

      <div
        id={citiesId}
        className={styles.cityDropdown}
        role={isTouch ? "region" : "tooltip"}
        aria-label={`${label} availability`}
      >
        <p className={styles.cityDropdownLabel}>Shop by country</p>
        <ul className={styles.cityList}>
          {markets.map((market: RetailerMarket) => (
            <li key={market.name} className={styles.cityItem}>
              <a
                href={market.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cityLink}
                onClick={() => setOpen(false)}
              >
                <span className={styles.cityFlag} aria-hidden="true">
                  {REGION_FLAG[market.region]}
                </span>
                <span className={styles.cityName}>{market.name}</span>
                {market.inStock ? (
                  <span className={styles.stockBadge}>In stock</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
        {isTouch ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shopAllLink}
            onClick={() => setOpen(false)}
          >
            Shop all on {label} ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}

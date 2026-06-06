import Link from "next/link";
import { retailers, retailersWithCities } from "@/data/book";
import RetailerHoverButton from "@/components/retailers/RetailerHoverButton";
import styles from "./RetailerButtons.module.css";

type RetailerButtonsProps = {
  showAllLink?: boolean;
  showExtraRetailers?: boolean;
  className?: string;
};

export default function RetailerButtons({
  showAllLink = false,
  showExtraRetailers = false,
  className,
}: RetailerButtonsProps) {
  const extraRetailers = retailers.filter(
    (retailer) =>
      !retailersWithCities.some((item) => item.label === retailer.label),
  );

  return (
    <div className={`${styles.row} ${className ?? ""}`.trim()}>
      {retailersWithCities.map((retailer, index) => (
        <RetailerHoverButton
          key={retailer.label}
          retailer={retailer}
          variant={index === 0 ? "primary" : "outline"}
        />
      ))}

      {showExtraRetailers
        ? extraRetailers.map((retailer) => (
            <a
              key={retailer.label}
              href={retailer.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btnOutline} ${styles.btnPlain}`}
            >
              {retailer.label}
            </a>
          ))
        : null}

      {showAllLink ? (
        <Link
          href="/book"
          className={`${styles.btnOutline} ${styles.btnAllRetailers}`}
        >
          <span>All retailers</span>
          <span className={styles.arrowIcon} aria-hidden="true">
            &rarr;
          </span>
        </Link>
      ) : null}
    </div>
  );
}

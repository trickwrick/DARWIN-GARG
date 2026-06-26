import Link from "next/link";
import type { RetailerStore, SimpleRetailerLink } from "@/data/bookPage";
import { retailersWithCities, retailers } from "@/data/book";
import RetailerHoverButton from "@/components/retailers/RetailerHoverButton";
import styles from "./RetailerButtons.module.css";

type RetailerButtonsProps = {
  showAllLink?: boolean;
  showExtraRetailers?: boolean;
  className?: string;
  stores?: RetailerStore[];
  extra?: SimpleRetailerLink[];
};

export default function RetailerButtons({
  showAllLink = false,
  showExtraRetailers = false,
  className,
  stores,
  extra,
}: RetailerButtonsProps) {
  const mainStores =
    stores ??
    retailersWithCities.map((item) => ({
      label: item.label,
      href: item.href,
      accent: item.accent,
      markets: item.markets.map((market) => ({ ...market })),
    }));

  const extraLinks =
    extra ??
    retailers
      .filter((item) => !mainStores.some((store) => store.label === item.label))
      .map((item) => ({ label: item.label, href: item.href }));

  return (
    <div className={`${styles.row} ${className ?? ""}`.trim()}>
      {mainStores.map((retailer, index) => (
        <RetailerHoverButton
          key={retailer.label}
          retailer={retailer}
          variant={index === 0 ? "primary" : "outline"}
        />
      ))}

      {showExtraRetailers
        ? extraLinks.map((retailer) => (
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

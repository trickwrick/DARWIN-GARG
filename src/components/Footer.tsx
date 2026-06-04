import Link from "next/link";
import { PageContainer } from "@/components/home/editorial";

const AMAZON_LINK =
  "https://www.amazon.com/dp/B0GSTW86RV?ref=cm_sw_r_ffobk_cso_cp_apin_dp_NKMTKPK611WNMXVQFFMZ";

const footerPills = [
  { href: "#", label: "LinkedIn", external: false },
  { href: AMAZON_LINK, label: "Buy on Amazon", external: true },
  { href: "#", label: "Flipkart", external: false },
  { href: "/book", label: "All editions →", external: false },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-cream">
      <PageContainer className="py-20 text-center md:py-24 lg:py-28">
        <p className="mx-auto max-w-2xl font-serif text-xl leading-relaxed text-cream/95 md:text-2xl md:leading-relaxed">
          If you&apos;ve made it this far, thank you. The book is out in the
          world now, finding its readers across countries and conversations.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:mt-14 md:gap-4">
          {footerPills.map((pill) => {
            const className =
              "inline-flex h-9 items-center justify-center rounded-full border border-cream/35 px-5 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-cream/90 transition-colors hover:border-cream/60 hover:bg-cream/5";

            if (pill.external) {
              return (
                <a
                  key={pill.label}
                  href={pill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {pill.label}
                </a>
              );
            }

            return (
              <Link key={pill.label} href={pill.href} className={className}>
                {pill.label}
              </Link>
            );
          })}
        </div>
      </PageContainer>
    </footer>
  );
}

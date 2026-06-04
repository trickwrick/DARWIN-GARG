import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1200px] px-10 md:px-14 lg:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionRule({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-charcoal/10", className)} />;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[0.6rem] font-normal uppercase tracking-[0.32em] text-charcoal/55">
      {children}
    </p>
  );
}

export function EditorialLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-charcoal/70",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function RectPlaceholder({
  className,
  label = "Image",
  showLabel = false,
  dashed = false,
}: {
  className?: string;
  label?: string;
  showLabel?: boolean;
  dashed?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#E6DECB] text-center",
        dashed
          ? "border border-dashed border-charcoal/35"
          : "outline outline-1 outline-charcoal/8",
        className
      )}
    >
      {showLabel ? (
        <span className="px-4 font-serif text-sm text-charcoal/55">
          {label}
        </span>
      ) : (
        <span className="sr-only">{label} placeholder</span>
      )}
    </div>
  );
}

export function CirclePlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "shrink-0 rounded-full bg-[#E8E4DC] outline outline-1 outline-charcoal/8",
        className
      )}
    />
  );
}

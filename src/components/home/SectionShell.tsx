import { cn } from "@/lib/utils";

type SectionVariant = "cream" | "beige" | "cream-dark";

const variantClasses: Record<SectionVariant, string> = {
  cream: "bg-cream",
  "cream-dark": "bg-cream-dark",
  beige: "bg-beige",
};

interface SectionShellProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  ariaLabelledBy?: string;
}

export function SectionShell({
  id,
  children,
  className,
  variant = "cream",
  ariaLabelledBy,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "py-20 md:py-28 lg:py-32",
        variantClasses[variant],
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
        {children}
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-bronze">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "font-headline text-4xl font-medium leading-[1.1] tracking-tight text-charcoal md:text-5xl lg:text-[3.25rem]",
        className
      )}
    >
      {children}
    </h2>
  );
}

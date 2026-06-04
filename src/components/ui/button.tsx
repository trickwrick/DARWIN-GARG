import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-sans text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-charcoal text-cream hover:bg-espresso shadow-sm hover:shadow-md",
        outline:
          "border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-charcoal/5",
        ghost: "text-charcoal hover:bg-charcoal/5",
        bronze:
          "bg-bronze text-cream hover:bg-bronze-light shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6 text-[0.65rem]",
        lg: "h-14 px-10 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-border",
        available: "border-transparent bg-[hsl(145,25%,75%)] text-[hsl(145,30%,35%)] font-semibold",
        reserved: "border-transparent bg-[hsl(350,50%,90%)] text-[hsl(18,75%,55%)] font-semibold",
        male: "border-transparent bg-[hsl(175,40%,85%)] text-[hsl(175,50%,25%)] font-semibold",
        female: "border-transparent bg-[hsl(350,50%,90%)] text-[hsl(18,75%,55%)] font-semibold",
        breed: "border-[hsl(18,85%,70%)]/30 bg-[hsl(18,85%,70%)]/10 text-[hsl(18,75%,55%)] font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

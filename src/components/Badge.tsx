import { cn } from "@/lib/utils";

interface BadgeProps {
  text: string;
  variant?: "primary" | "green" | "red" | "orange";
  className?: string;
}

export const Badge = ({ text, variant = "primary", className }: BadgeProps) => {
  const baseStyles =
    "inline-flex items-center px-4 py-2 rounded-full text-xs font-medium";

  const variantStyles = {
    primary: "bg-[var(--primary-1)] text-[var(--type-dark)]",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {text}
    </span>
  );
};

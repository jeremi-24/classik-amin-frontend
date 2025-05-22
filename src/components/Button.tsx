// components/Button.tsx
import { cn } from "@/lib/utils"; // Utilitaire pour concaténer les classes conditionnelles
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "dashed" | "disabled" |"link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  icon,
  iconPosition = "left",
  loading = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyle =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors text-sm gap-2";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-6)] shadow-sm",
    secondary:
      "bg-[var(--background-2)] text-[var(--type-dark)] border border-[var(--border)] hover:bg-[var(--background)]",
    dashed:
      "border border-dashed border-[var(--border)] text-[var(--type-dark)] hover:bg-[var(--background-2)]",
    disabled:
      "bg-[var(--background-2)] text-[var(--type-disable)] cursor-not-allowed border border-[var(--border)]",
    link:
      "bg-transparent text-[var--(primary)]  underlined ",
  };

  const isDisabled = variant === "disabled" || loading;

  return (
    <button
      className={cn(
        baseStyle,
        variants[variant],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      <span className="whitespace-nowrap">{children}</span>
      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

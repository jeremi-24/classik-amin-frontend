// components/InputField.tsx
import { InputHTMLAttributes, ReactNode, useId, useState } from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelPosition?: "top" | "infield"; // label au-dessus ou flottant
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  error?: string;
}

export const InputField = ({
  label,
  labelPosition = "top",
  icon,
  iconPosition = "left",
  error,
  id,
  disabled,
  className,
  ...props
}: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [isFocused, setIsFocused] = useState(false);

  const showFloatingLabel = labelPosition === "infield";

  return (
    <div className={cn("w-full", className)}>
      {/* Label en haut */}
      {label && labelPosition === "top" && (
        <label
          htmlFor={inputId}
          className={cn(
            "block mb-1 text-sm font-medium text-[var(--type-dark)]",
            disabled && "text-[var(--type-disable)]"
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icône à gauche */}
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--type-light)]">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          id={inputId}
          className={cn(
            "peer w-full border rounded-md py-2 px-3 transition-all outline-none",
            "text-[var(--type-dark)] bg-white",
            disabled && "bg-[var(--background-2)] text-[var(--type-disable)] cursor-not-allowed",
           icon && iconPosition === "left" ? "pl-10" : undefined,
  icon && iconPosition === "right" ? "pr-10" : undefined,
            error
              ? "border-[var(--danger)] focus:ring-[var(--danger)]"
              : "border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)]"
          )}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Floating label */}
        {label && showFloatingLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-3 transition-all duration-200 text-sm",
              "pointer-events-none bg-white px-1",
              "text-[var(--type-light)]",
              props.value || isFocused
                ? "top-[-0.65rem] text-xs scale-90"
                : "top-1/2 -translate-y-1/2"
            )}
          >
            {label}
          </label>
        )}

        {/* Icône à droite */}
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--type-light)]">
            {icon}
          </div>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <p className="mt-1 text-xs text-[var(--danger)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

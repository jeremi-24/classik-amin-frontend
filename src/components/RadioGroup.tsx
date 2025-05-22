import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const RadioGroup = ({
  options,
  value,
  defaultValue,
  onChange,
  className,
  orientation = "vertical",
}: RadioGroupProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value);
  const activeValue = isControlled ? value : internalValue;

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = options.findIndex((o) => o.value === activeValue);
    let nextIndex = currentIndex;

    if (
      (orientation === "horizontal" && e.key === "ArrowRight") ||
      (orientation === "vertical" && e.key === "ArrowDown")
    ) {
      e.preventDefault();
      do {
        nextIndex = (nextIndex + 1) % options.length;
      } while (options[nextIndex].disabled);
    }

    if (
      (orientation === "horizontal" && e.key === "ArrowLeft") ||
      (orientation === "vertical" && e.key === "ArrowUp")
    ) {
      e.preventDefault();
      do {
        nextIndex = (nextIndex - 1 + options.length) % options.length;
      } while (options[nextIndex].disabled);
    }

    const nextOption = options[nextIndex];
    itemRefs.current[nextIndex]?.focus();
    if (nextOption && !nextOption.disabled) {
      handleSelect(nextOption.value);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "flex gap-4" : "flex flex-col gap-2",
        className
      )}
      onKeyDown={handleKeyDown}
    >
      {options.map((option, i) => {
        const selected = activeValue === option.value;

        return (
          <button
            key={option.value}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            role="radio"
            aria-checked={selected}
            aria-disabled={option.disabled}
            disabled={option.disabled}
            className={cn(
              "px-4 py-2 rounded-full text-sm border transition-colors outline-none",
              selected
                ? "bg-[var(--primary-1)] text-[var(--type-dark)] border-[var(--primary)]"
                : "bg-white text-[var(--type-light)] border-[var(--border)] hover:text-[var(--type-dark)]",
              option.disabled && "opacity-50 pointer-events-none"
            )}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

// components/Select.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Sélectionner...",
  disabled = false,
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const toggleOpen = () => {
    if (!disabled) setOpen((prev) => !prev);
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setOpen(true);
        setHighlightedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setOpen(true);
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (open && highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex]);
        } else {
          setOpen(true);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  
  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const el = listRef.current.children[highlightedIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div
      className={cn("relative inline-block w-64", className)}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-disabled={disabled}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
        aria-controls="select-listbox"
        className={cn(
          "w-full px-4 py-2 text-left border-border border rounded-md bg-white text-[var(--type-dark)] flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)]",
          disabled
            ? "cursor-not-allowed opacity-50 bg-[var(--background-2)]"
            : "hover:border-[var(--primary)]",
          open && "border-[var(--primary)]"
        )}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 ml-2 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="select-listbox"
            role="listbox"
            ref={listRef}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-auto focus:outline-none"
          >
            {options.map((option, index) => {
              const isSelected = value === option.value;
              const isHighlighted = index === highlightedIndex;

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "px-4 py-2 cursor-pointer flex items-center justify-between",
                    isSelected && "bg-[var(--primary-2)] font-medium",
                    isHighlighted && "bg-[var(--primary-1)]"
                  )}
                >
                  {option.label}
                  {isSelected && (
                    <Check className="w-4 h-4 text-[var(--primary)]" />
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

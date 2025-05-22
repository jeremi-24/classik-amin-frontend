// components/SearchBar.tsx
import { useState, useRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  iconPosition?: "left" | "right";
  focused?: boolean;
  onSearch: (query: string) => void;
  disabled?: boolean;
  className?: string;
}

export const SearchBar = ({
  placeholder = "Rechercher...",
  iconPosition = "left",
  focused = false,
  onSearch,
  disabled = false,
  className,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) onSearch(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex items-center w-full max-w-md",
        className
      )}
    >
      {iconPosition === "left" && (
        <Search
          className={cn(
            "absolute left-3 w-4 h-4 text-[var(--type-light)] pointer-events-none",
            disabled && "opacity-50"
          )}
        />
      )}

      <input
        type="text"
        ref={inputRef}
        disabled={disabled}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full py-2 pr-4 pl-10 rounded-md border transition-all outline-none",
          focused && "focus:ring-2 focus:ring-[var(--primary)] border-[var(--primary)]",
          !focused && "focus:border-[var(--primary)]",
          disabled
            ? "bg-[var(--background-2)] text-[var(--type-disable)] cursor-not-allowed"
            : "bg-white text-[var(--type-dark)]"
        )}
        aria-label="Search"
      />

      {iconPosition === "right" && (
        <button
          type="submit"
          disabled={disabled}
          className={cn(
            "absolute right-3 text-[var(--type-light)]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          aria-label="Lancer la recherche"
        >
          <Search className="w-4 h-4" />
        </button>
      )}
    </form>
  );
};

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
}

export const Tabs = ({ tabs, defaultValue, className }: TabsProps) => {
  const [active, setActive] = useState<string>(
    defaultValue ?? tabs[0]?.value ?? ""
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((t) => t.value === active);

    if (currentIndex === -1) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      tabRefs.current[nextIndex]?.focus();
      setActive(tabs[nextIndex].value);
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      tabRefs.current[prevIndex]?.focus();
      setActive(tabs[prevIndex].value);
    }
  };

  const currentTab = tabs.find((tab) => tab.value === active);

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        className="flex gap-2 border-b border-[var(--border)] mb-4"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
         ref={(el) => {
  tabRefs.current[index] = el;
}}

            id={`tab-${tab.value}`}
            role="tab"
            aria-selected={active === tab.value}
            aria-controls={`panel-${tab.value}`}
            className={cn(
              "px-4 py-2 rounded-t-md text-sm font-medium transition-colors outline-none",
              active === tab.value
                ? "bg-[var(--primary-1)] text-[var(--type-dark)]"
                : "bg-transparent text-[var(--type-light)] hover:text-[var(--type-dark)]"
            )}
            onClick={() => setActive(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${currentTab?.value}`}
        aria-labelledby={`tab-${currentTab?.value}`}
        className="p-4 bg-white rounded-md shadow"
      >
        {currentTab?.content ?? null}
      </div>
    </div>
  );
};

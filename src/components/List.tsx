import { cn } from "@/lib/utils";
import { Eye } from "lucide-react"; 
import { Button } from "./Button";

interface ListItem {
  id: string | number;
  label: React.ReactNode;   
  onClick?: () => void;      
  actionLabel?: string;       
}

interface ListProps {
  items: ListItem[];
  className?: string;
}

export const List = ({ items, className }: ListProps) => {
  return (
    <div className={cn("w-full", className)} role="list">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]"
          role="listitem"
        >
          <span className="text-sm font-medium text-[var(--type-dark)]">
            {item.label}
          </span>

          <Button
            onClick={item.onClick}
            variant="link"
           
            iconPosition="left"
            icon={<Eye className="w-4 h-4" />}
            className="text-blue-600 hover:underline hover:text-blue-700 bg-transparent"
          >
            {item.actionLabel ?? "Voir"}
          </Button>
        </div>
      ))}
    </div>
  );
};

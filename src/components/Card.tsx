import { cn } from "@/lib/utils";
import { Button } from "./Button";


interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-base shadow-md border border-[var(--border)] w-full max-w-xl mx-auto flex flex-col",
        className
      )}
      role="region"
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  className,
  children,
}: CardProps) => (
  <div className={cn("p-4 border-b border-[var(--border)]", className)}>
    {children}
  </div>
);

export const CardTitle = ({
  children,
  className,
}: CardProps) => (
  <h2
    className={cn(
      "text-2xl font-semibold text-[var(--type-dark)]",
      className
    )}
  >
    {children}
  </h2>
);

export const CardDescription = ({
  children,
  className,
}: CardProps) => (
  <p className={cn("text-base text-[var(--type-light)]", className)}>
    {children}
  </p>
);

export const CardContent = ({
  children,
  className,
}: CardProps) => (
  <div className={cn("p-4 space-y-2", className)}>{children}</div>
);

interface CardFooterProps {
  className?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  cancelText?: string;
  submitText?: string;
  isSubmitting?: boolean;
}


export const CardFooter = ({
  className,
  onCancel,
  onSubmit,
  cancelText = "Annuler",
  submitText = "Soumettre",
  isSubmitting = false,
}: CardFooterProps) => {
  return (
    <div
      className={cn(
        "p-4 border-t border-[var(--border)] flex justify-end gap-2",
        className
      )}
    >
      {onCancel && (
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
      )}
      {onSubmit && (
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "En cours..." : submitText}
        </Button>
      )}
    </div>
  );
};

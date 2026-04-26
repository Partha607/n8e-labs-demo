import * as React from "react";

type DividerVariant = "default" | "glow" | "dashed";
type DividerOrientation = "horizontal" | "vertical";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  variant?: DividerVariant;
  orientation?: DividerOrientation;
}

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

export function Divider({
  label,
  variant = "default",
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

  if (!isHorizontal) {
    return (
      <div
        data-slot="tron-divider"
        className={cx(
          "relative inline-flex self-stretch",
          variant === "default" && "w-px bg-primary/20",
          variant === "glow" && "w-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
          variant === "dashed" && "w-px border-l border-dashed border-primary/30",
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div data-slot="tron-divider" className={cx("relative flex items-center", className)} {...props}>
      <div
        className={cx(
          "flex-1",
          variant === "default" && "h-px bg-primary/20",
          variant === "glow" && "h-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
          variant === "dashed" && "border-t border-dashed border-primary/30"
        )}
      />
      {label && (
        <span className="mx-3 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
          {label}
        </span>
      )}
      <div
        className={cx(
          "flex-1",
          variant === "default" && "h-px bg-primary/20",
          variant === "glow" && "h-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
          variant === "dashed" && "border-t border-dashed border-primary/30"
        )}
      />
    </div>
  );
}

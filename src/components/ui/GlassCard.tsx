import { HTMLAttributes } from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GlassCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

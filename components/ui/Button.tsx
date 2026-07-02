import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ring-focus disabled:opacity-60 disabled:pointer-events-none select-none cursor-pointer whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-glow hover:bg-green-600 hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-blue-600 text-white shadow-soft hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-blue-200 bg-white text-blue-700 hover:border-blue-400 hover:bg-blue-50",
  ghost: "text-blue-700 hover:bg-blue-50",
  white: "bg-white text-blue-700 shadow-soft hover:bg-ink-50 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base sm:text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const classes = cn(base, variants[variant], sizes[size], className);
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...(props as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

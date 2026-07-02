import { cn } from "@/lib/utils";

/**
 * Signature flowing divider for the "river path" identity. Renders a soft
 * curved edge between two sections. `topColor` is the section above, `color`
 * is the section below (the curve is filled in `color`).
 */
export function WaveDivider({
  color = "#ffffff",
  topColor = "transparent",
  flip = false,
  className,
}: {
  color?: string;
  topColor?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative leading-[0]", className)}
      style={{ background: topColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn("block h-[52px] w-full sm:h-[88px]", flip && "rotate-180")}
      >
        <path
          d="M0,48 C240,118 520,4 760,46 C1000,88 1230,118 1440,58 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

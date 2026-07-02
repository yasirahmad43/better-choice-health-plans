import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Better Choice Health Plans brand mark.
 *
 * Default: a crisp SVG recreation of the shield + checkmark + winding-path logo,
 * so the header is always on-brand and razor-sharp at any size.
 *
 * To use the official artwork instead: drop the supplied file at
 *   public/brand/logo-horizontal.png  (full lockup)  and/or
 *   public/brand/logo-icon.png        (shield only)
 * then flip USE_IMAGE_LOGO to true below.
 */
const USE_IMAGE_LOGO = true;

export function ShieldMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 108 112"
      className={cn("h-10 w-auto", className)}
      role="img"
      aria-label="Better Choice Health Plans shield"
    >
      <defs>
        <linearGradient id="bc-border" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#2f6fb8" />
          <stop offset="0.5" stopColor="#1f5fa8" />
          <stop offset="1" stopColor="#163f70" />
        </linearGradient>
        <linearGradient id="bc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef6f8" />
        </linearGradient>
        <linearGradient id="bc-check" x1="0.1" y1="1" x2="0.9" y2="0">
          <stop offset="0" stopColor="#1f8f97" />
          <stop offset="1" stopColor="#41c4c6" />
        </linearGradient>
        <linearGradient id="bc-hills" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cc56a" />
          <stop offset="1" stopColor="#2fa85a" />
        </linearGradient>
        <linearGradient id="bc-river" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1f5fa8" />
          <stop offset="1" stopColor="#5aa0d8" />
        </linearGradient>
        <clipPath id="bc-clip">
          <path d="M50 5 L90 18 V53 C90 81 72 98 50 105 C28 98 10 81 10 53 V18 Z" />
        </clipPath>
      </defs>

      {/* interior + landscape (clipped to shield) */}
      <g clipPath="url(#bc-clip)">
        <rect x="0" y="0" width="108" height="112" fill="url(#bc-sky)" />
        {/* back hill */}
        <path d="M2 76 C22 64 40 80 60 73 C78 67 92 74 106 69 V112 H2 Z" fill="#bfe3a8" opacity="0.75" />
        {/* front hill */}
        <path d="M2 86 C20 79 40 90 60 84 C80 79 94 85 106 82 V112 H2 Z" fill="url(#bc-hills)" />
        {/* winding river */}
        <path
          d="M52 106 C44 96 62 88 51 79 C42 71 60 65 50 57"
          fill="none"
          stroke="url(#bc-river)"
          strokeWidth="7.5"
          strokeLinecap="round"
        />
      </g>

      {/* shield border */}
      <path
        d="M50 5 L90 18 V53 C90 81 72 98 50 105 C28 98 10 81 10 53 V18 Z"
        fill="none"
        stroke="url(#bc-border)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* checkmark — tail sweeps up and beyond the shield (drawn unclipped) */}
      <path
        d="M27 41 L44 57 L101 3"
        fill="none"
        stroke="url(#bc-check)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  variant = "horizontal",
  className,
}: {
  variant?: "horizontal" | "stacked" | "icon";
  className?: string;
}) {
  // Official-artwork mode
  if (USE_IMAGE_LOGO) {
    // The small square "icon" still uses the crisp vector mark (the supplied
    // PNGs are full lockups with the wordmark).
    if (variant === "icon") {
      return <ShieldMark className={className} />;
    }
    if (variant === "stacked") {
      return (
        <Image
          src="/brand/logo-social-t.png"
          alt="Better Choice Health Plans"
          width={1254}
          height={1254}
          className={cn("h-32 w-auto", className)}
          priority
        />
      );
    }
    return (
      <Image
        src="/brand/logo-horizontal-t.png"
        alt="Better Choice Health Plans"
        width={2172}
        height={724}
        className={cn("h-12 w-auto sm:h-14", className)}
        priority
      />
    );
  }

  if (variant === "icon") {
    return <ShieldMark className={className} />;
  }

  const Wordmark = (
    <span className="leading-none">
      <span className="block font-display text-blue-700">Better Choice</span>
      <span className="mt-0.5 block font-sans text-[0.58em] font-semibold uppercase tracking-[0.34em] text-teal-500">
        Health Plans
      </span>
    </span>
  );

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
        <ShieldMark className="h-16" />
        <div className="text-2xl">{Wordmark}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <ShieldMark className="h-10 sm:h-11" />
      <div className="text-xl sm:text-[1.35rem]">{Wordmark}</div>
    </div>
  );
}

"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

/** Mobile-only sticky bottom bar: call + quote. Drives ad-traffic conversion. */
export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="border-t border-ink-200 bg-white/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-8px_24px_rgba(15,27,45,0.08)] backdrop-blur">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={site.phoneHref}
            className="ring-focus inline-flex h-12 items-center justify-center gap-2 rounded-full border border-blue-200 font-semibold text-blue-700"
          >
            <Phone className="h-4 w-4" aria-hidden /> Call now
          </a>
          <Link
            href="/#quote"
            className="ring-focus inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent font-semibold text-white shadow-glow"
          >
            Get my quote
          </Link>
        </div>
      </div>
    </div>
  );
}

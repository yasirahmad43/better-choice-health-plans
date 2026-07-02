"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-200 bg-white/90 backdrop-blur-md shadow-soft"
          : "border-b border-transparent bg-white/0"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo className="h-14 w-auto sm:h-16" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 sm:flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span>{site.phone}</span>
          </a>
          <ButtonLink href="/#get-started" size="md" className="hidden shadow-glow sm:inline-flex">
            Get My Options →
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="ring-focus group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/85 px-3.5 py-2 font-bold text-ink-800 shadow-soft backdrop-blur transition-colors hover:border-blue-300 hover:text-blue-700 lg:hidden"
          >
            <span className="flex flex-col gap-[3px]">
              <span className="h-[2px] w-4 rounded-full bg-current transition-transform group-hover:w-5" />
              <span className="h-[2px] w-4 rounded-full bg-current" />
              <span className="h-[2px] w-4 rounded-full bg-current transition-transform group-hover:w-3" />
            </span>
            <span className="text-sm">Menu</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-white p-6 shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="ring-focus inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-700"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-lg font-medium text-ink-800 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <ButtonLink href="/#get-started" size="lg" onClick={() => setOpen(false)}>
                  Get My Free Options
                </ButtonLink>
                <a
                  href={site.phoneHref}
                  className="ring-focus inline-flex h-12 items-center justify-center gap-2 rounded-full border border-blue-200 font-semibold text-blue-700"
                >
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

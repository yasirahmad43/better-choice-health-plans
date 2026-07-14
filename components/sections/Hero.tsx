"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Star, Clock, ShieldCheck, BadgeCheck } from "lucide-react";
import { Survey } from "@/components/survey/Survey";
import { ShieldMark } from "@/components/site/Logo";
import { WaveDivider } from "@/components/site/WaveDivider";
import { site } from "@/lib/site";
import { trustBadges } from "@/data/content";

/**
 * Drop a looping MP4 at public/videos/hero.mp4 and set this to "/videos/hero.mp4"
 * to use real video footage instead of the animated still. The still uses a slow
 * Ken Burns pan/zoom so the hero feels cinematic without a video file.
 */
const HERO_VIDEO_SRC = "/videos/hero.mp4";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-landscape">
      {/* animated media background — video behind the hero on desktop */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {HERO_VIDEO_SRC ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/hero-video-poster.jpg"
              className="absolute inset-0 hidden h-full w-full object-cover lg:block"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
            {/* mobile keeps a still backdrop; the video shows above the hero instead */}
            <Image
              src="/images/hero-landscape.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover lg:hidden"
            />
          </>
        ) : (
          <Image
            src="/images/hero-landscape.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover"
          />
        )}
        {/* legibility scrims keep text + form crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/35 to-white/55" />
      </div>

      {/* mobile: video above the hero content */}
      {HERO_VIDEO_SRC && (
        <div className="container-page relative pt-4 lg:hidden">
          <div className="overflow-hidden rounded-2xl border border-ink-200 shadow-card">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/hero-video-poster.jpg"
              className="aspect-video w-full object-cover"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      <div className="container-page relative grid items-center gap-10 pb-16 pt-5 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-24 lg:pt-20">
        {/* Left: message */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-soft backdrop-blur"
          >
            <BadgeCheck className="h-4 w-4 text-green-600" /> Independent brokerage · all 50 states
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-ink-900 sm:text-6xl lg:text-[4rem]"
          >
            Find private health coverage that{" "}
            <span className="text-gradient-brand">fits your life &amp; budget</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl"
          >
            Compare private PPO plans from top national carriers in minutes — broad networks,
            year-round enrollment, and a free review from licensed advisors.{" "}
            <strong className="font-semibold text-ink-900">No cost. No obligation.</strong>
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
          >
            {trustBadges.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm font-medium text-ink-800">
                <ShieldCheck className="h-4 w-4 text-green-600" /> {b}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={site.phoneHref}
              className="ring-focus inline-flex h-12 items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-5 font-semibold text-blue-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-blue-300"
            >
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <div className="flex items-center gap-3 rounded-full bg-white/70 px-3 py-1.5 backdrop-blur">
              <div className="flex -space-x-2.5">
                {[
                  { i: "JM", c: "from-blue-500 to-blue-600" },
                  { i: "AR", c: "from-teal-400 to-teal-600" },
                  { i: "DP", c: "from-green-400 to-green-600" },
                  { i: "GT", c: "from-blue-400 to-teal-500" },
                ].map((a) => (
                  <span
                    key={a.i}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${a.c} text-[0.65rem] font-bold text-white shadow-soft`}
                  >
                    {a.i}
                  </span>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-ink-700">
                  <strong className="text-ink-900">4.9/5</strong> · 1,200+ members helped
                </span>
              </div>
            </div>
          </motion.div>

          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-600">
            <Clock className="h-4 w-4" /> Takes less than 30 seconds · no obligation
          </p>
        </div>

        {/* Right: shield-framed survey */}
        <motion.div
          id="get-started"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative scroll-mt-24"
        >
          {/* soft halo */}
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-300/60 via-teal-300/50 to-green-300/60 blur-2xl"
          />
          {/* floating shield badge — sits on the card's top-right, clear of the heading */}
          <div className="absolute -top-4 right-4 z-20 hidden items-center gap-2 rounded-full border border-ink-100 bg-white px-3 py-1.5 shadow-card sm:flex">
            <ShieldMark className="h-6" />
            <span className="text-xs font-bold text-ink-800">Free plan match</span>
          </div>
          <div className="mb-3 pr-28 text-center lg:text-left">
            <span className="font-display text-lg font-semibold text-ink-900">
              See your plan options
            </span>
            <span className="ml-2 text-sm text-ink-600">— free &amp; instant</span>
          </div>
          <div className="rounded-[1.35rem] bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 p-[3px] shadow-lift">
            <Survey className="border-transparent shadow-none ring-0" />
          </div>
        </motion.div>
      </div>

      {/* flowing curve into the next (white) section */}
      <WaveDivider color="#ffffff" className="relative z-[1]" />
    </section>
  );
}

import Image from "next/image";
import { carriers } from "@/lib/carriers";

/** Auto-scrolling trust bar of real carrier logos, with brand-colored
 *  wordmarks for carriers without a logo file. Two copies for a seamless loop. */
export function Carriers() {
  const list = [...carriers, ...carriers];
  return (
    <section className="bg-white py-9">
      <div className="container-page">
        <p className="text-center text-sm font-bold uppercase tracking-[0.16em] text-ink-700">
          Compare options from nationally recognized carriers
        </p>
        <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className="flex w-max items-center animate-[marquee_36s_linear_infinite] group-hover:[animation-play-state:paused]">
            {list.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="flex h-24 shrink-0 items-center justify-center px-10 sm:px-16"
              >
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={c.width}
                    height={c.height}
                    className="h-11 w-auto opacity-100 transition sm:h-[3.25rem]"
                  />
                ) : (
                  <span
                    className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                    style={{ color: c.color }}
                    aria-label={`${c.name} logo`}
                  >
                    {c.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-ink-500">
          Carrier availability varies by state, eligibility, plan type, and enrollment rules.
        </p>
      </div>
    </section>
  );
}

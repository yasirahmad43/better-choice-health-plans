export type CompareRow = { feature: string; a: string; b: string };

export type Comparison = {
  slug: string;
  vs: string;
  navLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  takeaway: string;
  columns: { a: string; b: string };
  rows: CompareRow[];
  body: { h: string; p: string }[];
  bestFor: { a: string[]; b: string[] };
};

export const comparisons: Comparison[] = [
  {
    slug: "vs-aca-marketplace",
    vs: "ACA Marketplace",
    navLabel: "Private PPO vs ACA Marketplace",
    title: "Private PPO vs. ACA Marketplace Plans",
    metaTitle: "Private PPO vs ACA Marketplace: Which Saves You More?",
    metaDescription:
      "Compare private PPO health plans with ACA Marketplace coverage â€” premiums, networks, enrollment windows, and who each option fits best.",
    intro:
      "If you don't qualify for a Marketplace subsidy, a private PPO plan often delivers comparable coverage for far less. Here's an honest, side-by-side look at how the two options compare.",
    takeaway:
      "Choose the ACA Marketplace if you qualify for a meaningful subsidy or have significant pre-existing conditions. Choose a private PPO if you earn too much for subsidies and want lower premiums, a broad network, and year-round enrollment.",
    columns: { a: "ACA Marketplace", b: "Private PPO (Better Choice)" },
    rows: [
      { feature: "Monthly premium (no subsidy)", a: "Often $600â€“$900", b: "Frequently $250â€“$450" },
      { feature: "Enrollment window", a: "Open Enrollment only", b: "Year-round" },
      { feature: "Network breadth", a: "Often narrow HMO/EPO", b: "Broad nationwide PPO" },
      { feature: "Pre-existing conditions", a: "Always covered", b: "Medically underwritten" },
      { feature: "Subsidy eligible", a: "Yes (if income qualifies)", b: "No" },
      { feature: "Best for", a: "Subsidy-eligible buyers", b: "Healthy, unsubsidized buyers" },
    ],
    body: [
      {
        h: "How are the premiums different?",
        p: "Marketplace premiums are community-rated and, without a subsidy, reflect the full cost of the plan. Private PPO plans are medically underwritten, so healthy applicants frequently qualify for noticeably lower premiums â€” sometimes close to half â€” for a comparable level of coverage.",
      },
      {
        h: "Can I switch any time of year?",
        p: "Marketplace plans generally require you to wait for Open Enrollment unless you have a qualifying life event. The private PPO plans we offer can be applied for year-round, so coverage can begin without a months-long wait.",
      },
      {
        h: "What about my doctors?",
        p: "Many low-cost Marketplace plans use narrow HMO or EPO networks. Private PPO plans typically offer broad national networks, making it easier to keep the doctors and hospitals you already use.",
      },
    ],
    bestFor: {
      a: ["You qualify for a subsidy", "You have major pre-existing conditions", "You want guaranteed-issue coverage"],
      b: ["You earn too much for subsidies", "You're generally healthy", "You want a broad PPO network and year-round enrollment"],
    },
  },
  {
    slug: "vs-cobra",
    vs: "COBRA",
    navLabel: "Private PPO vs COBRA",
    title: "Private PPO vs. COBRA Coverage",
    metaTitle: "Private PPO vs COBRA: A Cheaper Way to Stay Covered?",
    metaDescription:
      "Just left a job? Compare COBRA continuation coverage with private PPO plans â€” cost, flexibility, and how to avoid a coverage gap.",
    intro:
      "COBRA lets you keep your old employer plan â€” but you pay the full premium plus an admin fee, which is often expensive. For many people leaving a job, a private PPO plan is a more affordable way to stay covered.",
    takeaway:
      "Keep COBRA if you're mid-treatment and need to preserve your exact plan and network short-term. Otherwise, a private PPO usually costs far less for similar coverage â€” and can start right away.",
    columns: { a: "COBRA", b: "Private PPO (Better Choice)" },
    rows: [
      { feature: "Typical monthly cost", a: "$650â€“$1,200+ (full premium)", b: "Frequently $250â€“$450" },
      { feature: "How long it lasts", a: "Usually up to 18 months", b: "Ongoing, month-to-month" },
      { feature: "Keeps your exact plan", a: "Yes", b: "New plan, broad PPO network" },
      { feature: "When it starts", a: "Retroactive to coverage loss", b: "Right away" },
      { feature: "Flexibility", a: "Locked to former employer plan", b: "Choose the plan that fits" },
      { feature: "Best for", a: "Mid-treatment continuity", b: "Affordable ongoing coverage" },
    ],
    body: [
      {
        h: "Why is COBRA so expensive?",
        p: "While employed, your employer pays most of your premium. With COBRA you pay 100% of it â€” plus up to a 2% administrative fee. That's why COBRA bills often come as a shock, frequently running well over $700 a month for an individual.",
      },
      {
        h: "Will I have a coverage gap?",
        p: "A private PPO plan can typically be put in place quickly, so you don't have to risk a gap. An advisor can help time your start date to line up with the end of your employer coverage.",
      },
      {
        h: "When does COBRA actually make sense?",
        p: "COBRA is worth the higher cost mainly if you're in the middle of treatment and need to keep the exact same doctors and plan for continuity. In most other cases, a private PPO offers similar protection for a lot less.",
      },
    ],
    bestFor: {
      a: ["You're mid-treatment", "You must keep your exact plan", "You only need a few months of coverage"],
      b: ["You want to cut your premium", "You're between jobs longer-term", "You want to choose your own plan"],
    },
  },
  {
    slug: "vs-short-term",
    vs: "Short-Term Plans",
    navLabel: "Private PPO vs Short-Term",
    title: "Private PPO vs. Short-Term Health Plans",
    metaTitle: "Private PPO vs Short-Term Health Plans: What's the Difference?",
    metaDescription:
      "Understand the difference between short-term medical plans and private PPO coverage â€” benefits, limits, networks, and which fits your situation.",
    intro:
      "Short-term plans are cheap but limited â€” they're designed to bridge brief gaps, not to be your main coverage. A private PPO plan offers more comprehensive, ongoing protection.",
    takeaway:
      "Use a short-term plan only to bridge a brief, defined gap. For ongoing, comprehensive coverage with a real network, a private PPO is the stronger long-term choice.",
    columns: { a: "Short-Term Plan", b: "Private PPO (Better Choice)" },
    rows: [
      { feature: "Coverage depth", a: "Limited / capped benefits", b: "Comprehensive PPO benefits" },
      { feature: "Network", a: "Often restricted", b: "Broad nationwide PPO" },
      { feature: "Duration", a: "A few months", b: "Ongoing, month-to-month" },
      { feature: "Preventive care", a: "Frequently excluded", b: "Typically included" },
      { feature: "Premium", a: "Lowest upfront", b: "Affordable, more value" },
      { feature: "Best for", a: "Very short gaps", b: "Real, ongoing coverage" },
    ],
    body: [
      {
        h: "What do short-term plans actually cover?",
        p: "Short-term medical plans usually carry benefit caps and exclude many services, including most preventive care. They can be useful for a healthy person bridging a one- or two-month gap, but they aren't meant to replace comprehensive coverage.",
      },
      {
        h: "Why choose a private PPO instead?",
        p: "A private PPO plan provides far more complete protection â€” broad networks, preventive care, and no hard benefit caps in the way short-term plans have â€” while still being affordable for healthy individuals and families.",
      },
    ],
    bestFor: {
      a: ["You need coverage for under 2â€“3 months", "You're young and healthy", "You want the lowest possible premium temporarily"],
      b: ["You need real, ongoing coverage", "You want preventive care included", "You want a broad PPO network"],
    },
  },
];

export const getComparison = (slug: string) => comparisons.find((c) => c.slug === slug);

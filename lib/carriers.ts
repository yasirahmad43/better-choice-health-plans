// Carrier trust bar. Aetna, Humana, BCBS and UnitedHealthcare are real logo
// files. Cigna and Oscar are brand-colored text wordmarks (their official logo
// files weren't fetchable here) — drop a real SVG/PNG into /public/carriers and
// set `logo` to swap a wordmark for the real mark.

export type Carrier = {
  name: string;
  logo?: string;
  width?: number;
  height?: number;
  color?: string; // wordmark color when no logo file
};

export const carriers: Carrier[] = [
  { name: "Aetna", logo: "/carriers/aetna.jpeg", width: 560, height: 240 },
  { name: "UnitedHealthcare", logo: "/carriers/uhc.png", width: 2560, height: 805 },
  { name: "Blue Cross Blue Shield", logo: "/carriers/bcbs.png", width: 503, height: 100 },
  { name: "Humana", logo: "/carriers/humana.jpeg", width: 368, height: 156 },
  { name: "Cigna", color: "#0a3a5a" },
  { name: "Oscar", color: "#1c6fb5" },
];

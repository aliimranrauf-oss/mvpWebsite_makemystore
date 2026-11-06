/**
 * Shared pricing-card colour themes — the same look as the CV & Career Writing
 * pricing cards (soft gradient, tinted chip, coloured tick badge, dark button).
 * Style only: no prices or copy live here.
 */
export type CardTheme = {
  card: string;
  text: string;
  sub: string;
  tick: string;
  chip: string;
  btn: string;
};

export const CARD_THEMES: Record<"green" | "blue" | "gold" | "dark", CardTheme> = {
  green: {
    card: "bg-gradient-to-br from-[#EAF7EC] to-[#CBEAD1] border-[#B3DBBB]",
    text: "text-ink",
    sub: "text-ink/70",
    tick: "bg-[#2E9E48] text-white",
    chip: "bg-white/70 text-[#1F7A38]",
    btn: "bg-ink text-white hover:bg-ink/90",
  },
  blue: {
    card: "bg-gradient-to-br from-[#E8F5FD] to-[#C2E3F7] border-[#A6D3EE]",
    text: "text-ink",
    sub: "text-ink/70",
    tick: "bg-[#0EA5E9] text-white",
    chip: "bg-white/70 text-[#0B6FA3]",
    btn: "bg-ink text-white hover:bg-ink/90",
  },
  gold: {
    card: "bg-gradient-to-br from-[#FFF5DE] to-[#FFE2A6] border-[#F0CC80]",
    text: "text-ink",
    sub: "text-ink/70",
    tick: "bg-[#C98A0B] text-white",
    chip: "bg-white/70 text-[#8A5A00]",
    btn: "bg-ink text-white hover:bg-ink/90",
  },
  dark: {
    card: "bg-gradient-to-br from-[#10241E] to-[#26493E] border-[#10241E]",
    text: "text-white",
    sub: "text-white/75",
    tick: "bg-[#6FD08A] text-ink",
    chip: "bg-white/15 text-white",
    btn: "bg-white text-ink hover:bg-white/90",
  },
};

const ORDER: CardTheme[] = [CARD_THEMES.green, CARD_THEMES.blue, CARD_THEMES.gold, CARD_THEMES.dark];

/** Theme for the n-th card in a plain row (cycles green → blue → gold → dark). */
export function themeAt(i: number): CardTheme {
  return ORDER[i % ORDER.length];
}

/**
 * Themes for a row of tiers. The highlighted ("most popular") tier gets the dark
 * card so it stands out; the others take green → blue → gold in order.
 */
export function tierThemes(tiers: { highlight?: boolean }[]): CardTheme[] {
  const rest = [CARD_THEMES.green, CARD_THEMES.blue, CARD_THEMES.gold];
  let n = 0;
  return tiers.map((t) => (t.highlight ? CARD_THEMES.dark : rest[n++ % rest.length]));
}

import type { ReactElement } from "react";

/**
 * E.V.A.-style craft illustrations for the category cards.
 * Each drawing mimics cut-foam pieces: flat fills, thick white outlines,
 * googly eyes and a soft stitched look — no external assets needed.
 */

export type EvaKind = "flower" | "animal" | "letters" | "numbers" | "school" | "gift" | "party" | "dates" | "craft";

/** Googly eye used across the drawings. */
function Eye({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fff" stroke="#4a3b5c" strokeWidth="1.4" />
      <circle cx={x + r * 0.18} cy={y + r * 0.15} r={r * 0.5} fill="#2d2238" />
      <circle cx={x - r * 0.15} cy={y - r * 0.2} r={r * 0.18} fill="#fff" />
    </g>
  );
}

function Smile({ x, y, w = 10 }: { x: number; y: number; w?: number }) {
  return <path d={`M ${x - w / 2} ${y} Q ${x} ${y + w * 0.7} ${x + w / 2} ${y}`} fill="none" stroke="#4a3b5c" strokeWidth="2.4" strokeLinecap="round" />;
}

const OUT = "#fff";

function FlowerArt() {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* leaves */}
      <path d="M48 62 C30 66 20 78 23 88 C38 88 48 78 50 66 Z" fill="#7bc86c" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M52 66 C62 70 70 80 67 89 C56 87 50 78 48 70 Z" fill="#8fd47e" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      {/* petals */}
      {petals.map((a) => (
        <g key={a} transform={`rotate(${a} 50 40)`}>
          <ellipse cx="50" cy="17" rx="13" ry="17" fill="#f78fb8" stroke={OUT} strokeWidth="4" />
        </g>
      ))}
      {/* center with face */}
      <circle cx="50" cy="40" r="14" fill="#f8c831" stroke={OUT} strokeWidth="4" />
      <Eye x={45} y={37} r={3.6} />
      <Eye x={55} y={37} r={3.6} />
      <Smile x={50} y={45} w={8} />
    </svg>
  );
}

function AnimalArt() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* ears */}
      <circle cx="28" cy="34" r="10" fill="#a86f4b" stroke={OUT} strokeWidth="4" />
      <circle cx="72" cy="34" r="10" fill="#a86f4b" stroke={OUT} strokeWidth="4" />
      <circle cx="28" cy="34" r="4.5" fill="#f5b8c4" />
      <circle cx="72" cy="34" r="4.5" fill="#f5b8c4" />
      {/* head */}
      <circle cx="50" cy="56" r="26" fill="#c08552" stroke={OUT} strokeWidth="4" />
      {/* muzzle */}
      <ellipse cx="50" cy="66" rx="13" ry="10" fill="#f7e3c8" stroke={OUT} strokeWidth="3" />
      <ellipse cx="50" cy="61" rx="5" ry="4" fill="#4a3b5c" />
      <path d="M50 65 L50 68 M46 70 Q50 73 54 70" fill="none" stroke="#4a3b5c" strokeWidth="2.2" strokeLinecap="round" />
      <Eye x={40} y={50} r={5} />
      <Eye x={60} y={50} r={5} />
      {/* bow */}
      <path d="M50 82 L42 77 L42 87 Z" fill="#ec3a8c" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <path d="M50 82 L58 77 L58 87 Z" fill="#ec3a8c" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="50" cy="82" r="3" fill="#c2246f" stroke={OUT} strokeWidth="2" />
    </svg>
  );
}

function LettersArt() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="64"
        fill="#7b3fb8"
        stroke="#fff"
        strokeWidth="5"
        paintOrder="stroke"
        strokeLinejoin="round"
      >
        A
      </text>
      {/* a tiny foam flower leaning on the letter */}
      <g transform="translate(76 62) scale(0.55)">
        {[0, 72, 144, 216, 288].map((a) => (
          <g key={a} transform={`rotate(${a} 0 0)`}>
            <ellipse cx="0" cy="-12" rx="7" ry="11" fill="#f78fb8" stroke={OUT} strokeWidth="5" />
          </g>
        ))}
        <circle r="6.5" fill="#f8c831" stroke={OUT} strokeWidth="5" />
      </g>
      <Eye x={38} y={72} r={4.5} />
      <Eye x={56} y={72} r={4.5} />
      <Smile x={47} y={80} w={8} />
    </svg>
  );
}

function NumbersArt() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* star */}
      <path
        d="M30 22 L36 36 L52 37 L40 47 L44 62 L30 54 L16 62 L20 47 L8 37 L24 36 Z"
        fill="#f8c831"
        stroke={OUT}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* number 3 as foam piece */}
      <text
        x="66"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="58"
        fill="#1fb5bf"
        stroke="#fff"
        strokeWidth="5"
        paintOrder="stroke"
        strokeLinejoin="round"
      >
        3
      </text>
      {/* small triangle piece */}
      <path d="M40 78 L58 78 L49 62 Z" fill="#ec3a8c" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="72" cy="80" r="8" fill="#f6735a" stroke={OUT} strokeWidth="4" />
    </svg>
  );
}

function SchoolArt() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* book */}
      <path d="M14 66 Q30 58 48 66 L48 82 Q30 74 14 82 Z" fill="#7b3fb8" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M48 66 Q66 58 82 66 L82 82 Q66 74 48 82 Z" fill="#9d64d8" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <line x1="48" y1="66" x2="48" y2="82" stroke={OUT} strokeWidth="3" />
      {/* pencil */}
      <g transform="rotate(32 58 34)">
        <rect x="34" y="26" width="44" height="15" rx="3" fill="#f8c831" stroke={OUT} strokeWidth="4" />
        <path d="M78 26 L90 33.5 L78 41 Z" fill="#f7e3c8" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M85 30 L90 33.5 L85 37 Z" fill="#4a3b5c" />
        <rect x="26" y="26" width="10" height="15" rx="3" fill="#f5b8c4" stroke={OUT} strokeWidth="3.5" />
      </g>
      {/* star sparkle */}
      <path d="M26 22 L29 29 L36 30 L30 35 L32 42 L26 38 L20 42 L22 35 L16 30 L23 29 Z" fill="#1fb5bf" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function GiftArt() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* bow */}
      <path d="M50 26 C38 12 26 18 34 28 Z" fill="#ec3a8c" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 26 C62 12 74 18 66 28 Z" fill="#ec3a8c" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="50" cy="27" r="5" fill="#c2246f" stroke={OUT} strokeWidth="3" />
      {/* box */}
      <rect x="22" y="42" width="56" height="40" rx="6" fill="#7b3fb8" stroke={OUT} strokeWidth="4" />
      <rect x="17" y="30" width="66" height="16" rx="5" fill="#9d64d8" stroke={OUT} strokeWidth="4" />
      <rect x="44" y="30" width="12" height="52" fill="#f8c831" stroke={OUT} strokeWidth="3" />
      <Eye x={38} y={63} r={4.5} />
      <Eye x={62} y={63} r={4.5} />
      <Smile x={50} y={70} w={8} />
    </svg>
  );
}

function PartyArt() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* balloon */}
      <ellipse cx="42" cy="38" rx="20" ry="24" fill="#f78fb8" stroke={OUT} strokeWidth="4" />
      <path d="M38 62 L46 62 L42 68 Z" fill="#ec3a8c" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 68 Q34 78 42 88 Q50 96 44 100" fill="none" stroke="#4a3b5c" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="36" cy="30" rx="5" ry="8" fill="#fbb6cd" transform="rotate(-20 36 30)" />
      {/* party hat */}
      <path d="M70 78 L82 34 L94 78 Z" fill="#1fb5bf" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="82" cy="30" r="6" fill="#f8c831" stroke={OUT} strokeWidth="3.5" />
      <path d="M74 62 L90 62 M77 50 L87 50" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
      {/* confetti */}
      <circle cx="20" cy="84" r="4" fill="#f6735a" stroke={OUT} strokeWidth="3" />
      <path d="M60 90 l5 5 M65 90 l-5 5" stroke={OUT} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="86" cy="90" r="3.5" fill="#9be3c4" stroke={OUT} strokeWidth="3" />
    </svg>
  );
}

function DatesArt() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* calendar sheet */}
      <rect x="18" y="24" width="64" height="58" rx="8" fill="#f7e3c8" stroke={OUT} strokeWidth="4" />
      <rect x="18" y="24" width="64" height="16" rx="8" fill="#f6735a" stroke={OUT} strokeWidth="4" />
      <rect x="32" y="16" width="7" height="14" rx="3.5" fill="#4a3b5c" stroke={OUT} strokeWidth="3" />
      <rect x="61" y="16" width="7" height="14" rx="3.5" fill="#4a3b5c" stroke={OUT} strokeWidth="3" />
      {/* heart inside */}
      <path
        d="M50 70 C34 58 30 46 38 40 C44 36 50 40 50 45 C50 40 56 36 62 40 C70 46 66 58 50 70 Z"
        fill="#ec3a8c"
        stroke={OUT}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Eye x={44} y={49} r={3.4} />
      <Eye x={56} y={49} r={3.4} />
      <Smile x={50} y={55} w={7} />
    </svg>
  );
}

function CraftArt() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      {/* scissors */}
      <g transform="rotate(8 50 55)">
        <path d="M28 30 L60 66" stroke="#cfd8e3" strokeWidth="8" strokeLinecap="round" />
        <path d="M72 30 L40 66" stroke="#aab8c9" strokeWidth="8" strokeLinecap="round" />
        <circle cx="63" cy="72" r="9" fill="none" stroke="#ec3a8c" strokeWidth="6" />
        <circle cx="37" cy="72" r="9" fill="none" stroke="#ec3a8c" strokeWidth="6" />
        <circle cx="50" cy="49" r="4" fill="#4a3b5c" />
      </g>
      {/* foam sheet with flower cut */}
      <g transform="translate(68 30) scale(0.6)">
        {[0, 72, 144, 216, 288].map((a) => (
          <g key={a} transform={`rotate(${a} 0 0)`}>
            <ellipse cx="0" cy="-13" rx="8" ry="12" fill="#f78fb8" stroke={OUT} strokeWidth="5" />
          </g>
        ))}
        <circle r="7" fill="#f8c831" stroke={OUT} strokeWidth="5" />
      </g>
      {/* rainbow arc */}
      <path d="M22 22 A14 14 0 0 1 50 22" fill="none" stroke="#f8c831" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

const ART: Record<EvaKind, () => ReactElement> = {
  flower: FlowerArt,
  animal: AnimalArt,
  letters: LettersArt,
  numbers: NumbersArt,
  school: SchoolArt,
  gift: GiftArt,
  party: PartyArt,
  dates: DatesArt,
  craft: CraftArt,
};

/** Picks the drawing that matches a category title (pt-BR keywords). */
export function evaKindFor(title: string): EvaKind {
  const t = title.toLocaleLowerCase("pt-BR");
  if (t.includes("flor") || t.includes("folh") || t.includes("planta")) return "flower";
  if (t.includes("animal") || t.includes("bich")) return "animal";
  if (t.includes("letra")) return "letters";
  if (t.includes("número") || t.includes("numero") || t.includes("forma")) return "numbers";
  if (t.includes("escolar") || t.includes("painel") || t.includes("mural")) return "school";
  if (t.includes("lembranc")) return "gift";
  if (t.includes("festa") || t.includes("anivers") || t.includes("decor")) return "party";
  if (t.includes("data")) return "dates";
  if (t.includes("enfeite") || t.includes("aplique")) return "craft";
  if (t.includes("infantil") || t.includes("personagem")) return "animal";
  return "craft";
}

export function EvaArt({ kind, className = "" }: { kind: EvaKind; className?: string }) {
  const Draw = ART[kind] ?? CraftArt;
  return (
    <div className={className} role="img" aria-label="Ilustração estilo artesanato em E.V.A.">
      <Draw />
    </div>
  );
}

// ── Sprite REAL dimensions ─────────────────────────────

const CARD_WIDTH = 71;
const CARD_HEIGHT = 95;

// ── Orden REAL del sprite ──────────────────────────────
// Columnas:
// A 2 3 4 5 6 7 8 9 10 J Q K

const RANK_INDEX = {
  "A": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  "10": 9,
  "J": 10,
  "Q": 11,
  "K": 12,
};

// Filas:
// ♥ ♣ ♦ ♠

const SUIT_INDEX = {
  "♥": 0,
  "♣": 1,
  "♦": 2,
  "♠": 3,
};

export function getCardSpriteStyle(
  rank,
  suit,
  spriteUrl
) {
  const col = RANK_INDEX[rank];
  const row = SUIT_INDEX[suit];

  const x = col * CARD_WIDTH;
  const y = row * CARD_HEIGHT;

  return {
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,

    backgroundImage: `url(${spriteUrl})`,
    backgroundRepeat: "no-repeat",

    backgroundPosition: `-${x}px -${y}px`,

    imageRendering: "pixelated",

    flexShrink: 0,
  };
}
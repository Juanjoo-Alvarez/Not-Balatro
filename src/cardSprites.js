// ── Sprite REAL dimensions ─────────────────────────────

const CARD_WIDTH = 71;
const CARD_HEIGHT = 95;

// ── Orden REAL del sprite ──────────────────────────────
// Columnas:
// 2 3 4 5 6 7 8 9 10 J Q K A

const RANK_INDEX = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  "10": 8,
  "J": 9,
  "Q": 10,
  "K": 11,
  "A": 12,
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

  const scale = 1.45;

  return {
    width: `${CARD_WIDTH * scale}px`,
    height: `${CARD_HEIGHT * scale}px`,

    backgroundImage: `url(${spriteUrl})`,
    backgroundRepeat: "no-repeat",

    backgroundPosition: `-${x * scale}px -${y * scale}px`,

    backgroundSize: `${13 * CARD_WIDTH * scale}px ${
      4 * CARD_HEIGHT * scale
    }px`,

    imageRendering: "pixelated",

    flexShrink: 0,
  };
}
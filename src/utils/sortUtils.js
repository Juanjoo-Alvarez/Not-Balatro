// Para ordenar las cartas

const rankOrder = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  10: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

// Ordena por valor, luego por palo
export function sortByRank(hand) {
  return [...hand].sort(
    (a, b) =>
      rankOrder[b.value] -
      rankOrder[a.value]
  );
}

// Ordena por palo, luego por valor
export function sortBySuit(hand) {
  const suitOrder = {
    "♠": 0,
    "♥": 1,
    "♦": 2,
    "♣": 3,
  };

  return [...hand].sort(
    (a, b) => {
      const suitDiff =
        suitOrder[a.suit] -
        suitOrder[b.suit];

      if (suitDiff !== 0)
        return suitDiff;

      return (
        rankOrder[b.value] -
        rankOrder[a.value]
      );
    }
  );
}
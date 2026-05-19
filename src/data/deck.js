const suits = ["♠", "♥", "♦", "♣"];

const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export function createDeck() {
  let deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({
        suit,
        value,
        selected: false,
      });
    }
  }

  return deck;
}
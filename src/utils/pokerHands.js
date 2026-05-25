const cardValues = {
  A: 11,
  K: 10,
  Q: 10,
  J: 10,
};

function getNumericValue(value) {
  return cardValues[value] || Number(value);
}

export function evaluateHand(selectedCards) {
  if (selectedCards.length === 0) {
    return {
      handName: "No hand",
      score: 0,
    };
  }

  const values = selectedCards.map((card) =>
    getNumericValue(card.value)
  );

  const suits = selectedCards.map((card) => card.suit);

  const counts = {};

  values.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  const repetitions = Object.values(counts);

  const isFlush = suits.every(
    (suit) => suit === suits[0]
  );

  const sortedValues = [...values].sort((a, b) => a - b);

  let isStraight = true;

  for (let i = 1; i < sortedValues.length; i++) {
    if (
      sortedValues[i] !==
      sortedValues[i - 1] + 1
    ) {
      isStraight = false;
      break;
    }
  }

  // Royal Flush
  if (
    isStraight &&
    isFlush &&
    sortedValues[4] === 14
  ) {
    return {
      handName: "Royal Flush",
      score: 500,
    };
  }


  // Straight flush 
  if (isStraight && isFlush) {
    return {
      handName: "Straight Flush",
      score: 450,
    };
  }

  // Poker
  if (repetitions.includes(4)) {
    return {
      handName: "Poker",
      score: 400,
    };
  }

  // FULL HOUSE
  if (
    repetitions.includes(3) &&
    repetitions.includes(2)
  ) {
    return {
      handName: "Full House",
      score: 350,
    };
  }

  // FLUSH
  if (isFlush && selectedCards.length >= 5) {
    return {
      handName: "Flush",
      score: 300,
    };
  }

  // STRAIGHT
  if (isStraight && selectedCards.length >= 5) {
    return {
      handName: "Straight",
      score: 250,
    };
  }

  // THREE OF A KIND
  if (repetitions.includes(3)) {
    return {
      handName: "Three of a Kind",
      score: 150,
    };
  }

  // TWO PAIR
  const pairs = repetitions.filter(
    (value) => value === 2
  ).length;

  if (pairs === 2) {
    return {
      handName: "Two Pair",
      score: 100,
    };
  }

  // ONE PAIR
  if (pairs === 1) {
    return {
      handName: "Pair",
      score: 50,
    };
  }

  return {
    handName: "High Card",
    score: 10,
  };
}
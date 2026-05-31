// Funciones para evaluar la mano de poker y asignar puntajes

const cardValues = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
};

function getNumericValue(value) {
  return (
    cardValues[value] ||
    Number(value)
  );
}


// Solo para puntaje de High Card
const scoreValues = {
  A: 11,
  K: 10,
  Q: 10,
  J: 10,
};

function getScoreValue(value) {
  return scoreValues[value] ?? Number(value);
}


// Praa stright con A como 1 o 14
function checkStraight(values) {
  const sorted =
    [...new Set(values)]
      .sort((a, b) => a - b);

  if (sorted.length !== 5)
    return false;

  const normal =
    sorted.every(
      (value, index) =>
        index === 0 ||
        value ===
          sorted[index - 1] + 1
    );

  const aceLow =
    JSON.stringify(sorted) ===
    JSON.stringify([2,3,4,5,14]);

  return normal || aceLow;
}


// Evalúa la mano seleccionada y devuelve el nombre y puntaje
export function evaluateHand(
  selectedCards
) {
  if (
    selectedCards.length === 0
  ) {
    return {
      handName: "No hand",
      score: 0,
    };
  }

  const values =
    selectedCards.map((card) =>
      getNumericValue(
        card.value
      )
    );

  const suits =
    selectedCards.map(
      (card) => card.suit
    );

  const counts = {};

  values.forEach((value) => {
    counts[value] =
      (counts[value] || 0) + 1;
  });

  const repetitions =
    Object.values(counts);

// Pairs = 2 cartas del mismo valor, Three of a Kind = 3, etc.
  const pairs =
    repetitions.filter(
      (v) => v === 2
    ).length;

// Flush = todas del mismo palo
  const isFlush =
    selectedCards.length === 5 &&
    suits.every(
      (suit) =>
        suit === suits[0]
    );

// Straight = valores consecutivos
  const isStraight =
    checkStraight(values);


 // Royal Flush = 10, J, Q, K, A del mismo palo   
  const isRoyal =
    [10,11,12,13,14]
      .every((v) =>
        values.includes(v)
      );

   
  // Para los puntaajes

  // Royal Flush
  if (
    isStraight &&
    isFlush &&
    isRoyal
  ) {
    return {
      handName:
        "Royal Flush",
      score: 500,
    };
  }

  // Straight Flush
  if (
    isStraight &&
    isFlush
  ) {
    return {
      handName:
        "Straight Flush",
      score: 450,
    };
  }

  // Poker = 4 cartas del mismo valor
  if (
    repetitions.includes(4)
  ) {
    return {
      handName: "Poker",
      score: 400,
    };
  }

  //Full House
  if (
    repetitions.includes(3) &&
    repetitions.includes(2)
  ) {
    return {
      handName:
        "Full House",
      score: 350,
    };
  }

  // Flush
  if (isFlush) {
    return {
      handName: "Flush",
      score: 300,
    };
  }

  // Straight
  if (isStraight) {
    return {
      handName: "Straight",
      score: 250,
    };
  }

  // Tercia
  if (
    repetitions.includes(3)
  ) {
    return {
      handName:
        "Three of a Kind",
      score: 150,
    };
  }

  // Dos pares
  if (pairs === 2) {
    return {
      handName:
        "Two Pair",
      score: 100,
    };
  }

  // Un par
  if (pairs === 1) {
    return {
      handName: "Pair",
      score: 50,
    };
  }

  // Carta alta
return {
  handName: "High Card",
  score: Math.max(...selectedCards.map(c => getScoreValue(c.value))),
};
}
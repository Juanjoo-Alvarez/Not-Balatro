// Para reemplazar las cartas seleccionadas en la mano jugada
// con nuevas del mazo


export function replaceSelectedCards(hand,deck ) {
  const newDeck = [...deck];

  const newHand =
    hand
      .map((card) => {
        if (card.selected) {
          const next =
            newDeck.shift();

          return next
            ? {
                ...next,
                selected: false,
              }
            : null;
        }

        return {
          ...card,
          selected: false,
        };
      })
      .filter(Boolean);

  return {
    newHand,
    newDeck,
  };
}
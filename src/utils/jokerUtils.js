// Aqui esta la lógica de aplicación de jokers a un resultado de mano
// Cada joker tiene su propio efecto, algunos con estado interno (como Popcorn)
// La función recibe el resultado base de la mano, las cartas seleccionadas, los jokers activos, y una función para actualizar el estado de los jokers

export function applyJokers(result, selectedCards, activeJokers, setActiveJokers) {
  let { chips, mult } = result;
  const jokersToRemove = [];
  const jokersToUpdate = [];

  for (const joker of activeJokers) {
    switch (joker.id) {

      case "joker_base":
        mult += 4;
        break;

      case "gros_michel": {
        mult += 15;
        // 1 en 6 chances de destruirse
        if (Math.floor(Math.random() * 6) === 0) {
          jokersToRemove.push(joker.id);
        }
        break;
      }

      case "baron": {
        const kings = selectedCards.filter(c => c.value === "K").length;
        mult *= Math.pow(1.5, kings); // ×1.5 por cada K
        break;
      }

      case "popcorn": {
        mult += joker.currentMult;
        const next = joker.currentMult - 4;
        if (next <= 0) {
          jokersToRemove.push(joker.id); // se agota
        } else {
          jokersToUpdate.push({ ...joker, currentMult: next });
        }
        break;
      }

      case "the_duo": {
        if (result.handName === "Two Pair") {
          mult *= 2;
        }
        break;
      }
    }
  }

  // Aplicar cambios de estado tras el loop
  if (jokersToRemove.length > 0 || jokersToUpdate.length > 0) {
    setActiveJokers(prev =>
      prev
        .filter(j => !jokersToRemove.includes(j.id))
        .map(j => {
          const updated = jokersToUpdate.find(u => u.id === j.id);
          return updated ?? j;
        })
    );
  }

  const score = Math.round(chips * mult);
  return { ...result, score, chips, mult };
}
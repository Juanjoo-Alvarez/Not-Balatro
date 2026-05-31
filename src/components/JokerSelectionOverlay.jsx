// Componente de la pantalla de selección de Jokers

import { useState } from "react";

import { JOKER_CATALOG }from "../data/jokers";

import JokerCard from "./JokerCard";

import {
  overlayStyle,
  boxStyle,
  titleStyle,
  subtitleStyle,
  cardsRowStyle,
  backBtnStyle,
} from "../styles/jokerStyles";


// Para solo obtener 2 randoms sin contar los que ya estan activos (seleccionados)
function getRandomJokers(activeIds) {
  const available =
    JOKER_CATALOG.filter(j => !activeIds.includes(j.id)
    );

  const shuffled =[...available].sort(() =>Math.random() - 0.5
    );

  return shuffled.slice(0, 2);
}

export default function
JokerSelectionOverlay({
  activeJokers,
  onSelect,
  onDiscard,
}) {
  const isFull = activeJokers.length >= 5;

  const offered =getRandomJokers(activeJokers.map(j => j.id));

  const [discarding,setDiscarding,] = useState(false);

  const [pendingJoker,setPendingJoker,] = useState(null);

  function handleSelect(
    jokerDef
  ) {
    if (isFull) {
      setPendingJoker(
        jokerDef
      );

      setDiscarding(true);

      return;
    }

    onSelect(jokerDef);
  }

  function handleDiscard(
    index
  ) {
    onDiscard(index);

    onSelect(pendingJoker);
  }

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>

        {!discarding ? (
          <>
            <div
              style={titleStyle}
            >
              Elige un Joker
            </div>

            <div
              style={subtitleStyle}
            >
              Selecciona uno
            </div>

            <div
              style={
                cardsRowStyle
              }
            >
              {offered.map(
                joker => (
                  <JokerCard
                    key={
                      joker.id
                    }
                    joker={
                      joker
                    }
                    onClick={() =>
                      handleSelect(
                        joker
                      )
                    }
                  />
                )
              )}
            </div>
          </>
        ) : (
          <>
            <div
              style={titleStyle}
            >
              Descarta uno
            </div>

            <div
              style={
                cardsRowStyle
              }
            >
              {activeJokers.map(
                (
                  joker,
                  index
                ) => (
                  <JokerCard
                    key={
                      joker.id
                    }
                    joker={
                      joker
                    }
                    danger
                    onClick={() =>
                      handleDiscard(
                        index
                      )
                    }
                  />
                )
              )}
            </div>

            <button
              style={
                backBtnStyle
              }
              onClick={() => {
                setDiscarding(
                  false
                );

                setPendingJoker(
                  null
                );
              }}
            >
              ← Volver
            </button>
          </>
        )}
      </div>
    </div>
  );
}
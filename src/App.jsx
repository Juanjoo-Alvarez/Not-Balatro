import { useEffect, useState } from "react";
import { createDeck } from "./data/deck";
import { shuffleDeck } from "./utils/shuffle";
import { evaluateHand } from "./utils/pokerHands";

function App() {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    const newDeck = shuffleDeck(createDeck());

    const initialHand = newDeck.slice(0, 8);

    setHand(initialHand);
    setDeck(newDeck.slice(8));
  }

  function toggleCard(index) {
    const updatedHand = [...hand];

    updatedHand[index].selected =
      !updatedHand[index].selected;

    setHand(updatedHand);
  }

  function checkHand() {
    const selectedCards = hand.filter(
      (card) => card.selected
    );

    const evaluatedHand =
      evaluateHand(selectedCards);

    setResult(evaluatedHand);
  }

  return (
    <div>
      <h1>NOT-BALATRO</h1>

      <h2>Tu mano</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        {hand.map((card, index) => (
          <div
            key={index}
            onClick={() => toggleCard(index)}
            style={{
              border: "1px solid white",
              padding: "20px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: card.selected
                ? "green"
                : "black",
            }}
          >
            <h3>
              {card.value}
              {card.suit}
            </h3>
          </div>
        ))}
      </div>

      <button onClick={checkHand}>
        Evaluar mano
      </button>
      {result && (
        <div>
          <h2>{result.handName}</h2>
          <h3>Puntaje: {result.score}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
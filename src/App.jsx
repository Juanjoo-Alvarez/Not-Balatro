import { useEffect, useState } from "react";
import { createDeck } from "./data/deck";
import { shuffleDeck } from "./utils/shuffle";
import { evaluateHand } from "./utils/pokerHands";

// Componente de card 
import Card from "./components/Card";

// Para reemplazar las cartas seleccionadas en la mano jugada
import {replaceSelectedCards, } from "./utils/handUtils";


// Para los estilos, los tengo en un objeto S (de Styles) que importo desde styles/gameStyles.js
import { S } from "./styles/gameStyle";


// Para ordenar las cartas  
import {sortByRank, sortBySuit, } from "./utils/sortUtils";


// ── Main App ──────────────────────────────────────────────────
const TARGET_SCORE = 300;
const MAX_HAND_SIZE = 8;
const MAX_JOKERS = 5;
const MAX_TAROTS = 2;

function App() {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [result, setResult] = useState(null);

  const [totalScore, setTotalScore] = useState(0);
  const [discardsLeft, setDiscardsLeft] = useState(3);
  const [handsLeft, setHandsLeft] = useState(5);

  // Jokers & Tarots — vacíos por ahora, listos para llenar
  const [jokers] = useState([]); // array de { id, name, img }
  const [tarots] = useState([]); // array de { id, name, img }

  const gameOver = handsLeft === 0 && totalScore < TARGET_SCORE;
  const win = totalScore >= TARGET_SCORE;
  const selectedCards = hand.filter((c) => c.selected);
  const canPlay = selectedCards.length > 0 && handsLeft > 0 && !gameOver && !win;
  const canDiscard = selectedCards.length > 0 && discardsLeft > 0 && !gameOver && !win;

  useEffect(() => { startGame(); }, []);

  function startGame() {
    const newDeck = shuffleDeck(createDeck());
    setHand(newDeck.slice(0, MAX_HAND_SIZE).map((c) => ({ ...c, selected: false })));
    setDeck(newDeck.slice(MAX_HAND_SIZE));
    setResult(null);
    setTotalScore(0);
    setHandsLeft(5);
    setDiscardsLeft(3);
  }

  function toggleCard(index) {
    const current = hand.filter((c) => c.selected).length;
    if (!hand[index].selected && current >= 5) return; // max 5 seleccionadas
    setHand((h) =>
      h.map((c, i) => (i === index ? { ...c, selected: !c.selected } : c))
    );
  }

  function playHand() {
    if (!canPlay) return;
    const ev = evaluateHand(selectedCards);
    setResult(ev);
    setTotalScore((prev) => prev + ev.score);
    const { newHand, newDeck } = replaceSelectedCards(hand, deck);
    setHand(newHand);
    setDeck(newDeck);
    setHandsLeft((prev) => prev - 1);
  }

  function discardCards() {
    if (!canDiscard) return;
    const { newHand, newDeck } = replaceSelectedCards(hand, deck);
    setHand(newHand);
    setDeck(newDeck);
    setDiscardsLeft((prev) => prev - 1);
    setResult(null);
  };

  

  // Google Fonts (Press Start 2P)
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;700;900&display=swap";
    document.head.appendChild(link);
    // Evitar scroll en la página
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div style={S.root}>
      <div style={S.felt} />

      {/* ── SIDEBAR ── */}
      <div style={S.sidebar}>
        <div style={S.blindHeader}>
          <div style={S.blindTitle}>Small Blind</div>
        </div>

        <div style={S.blindInfo}>
          <div style={S.blindBadge}>SMALL{"\n"}BLIND</div>
          <div>
            <div style={S.scoreLabel}>Score at least</div>
            <div style={S.scoreTarget}>
              <span>✳</span>
              <span>{TARGET_SCORE}</span>
            </div>
            <div style={S.rewardText}>
              Reward: <span style={S.rewardVal}>$$$</span>
            </div>
          </div>
        </div>

        <div style={S.roundScoreRow}>
          <div style={S.rsLabel}>Round score</div>
          <div style={S.rsValue}>
            <span>✳</span>
            <span>{totalScore}</span>
          </div>
        </div>

        <div style={S.multRow}>
          <div style={S.multDisplay}>
            <div style={S.multChips}>{result?.chips ?? 0}</div>
            <div style={S.multX}>×</div>
            <div style={S.multMult}>{result?.mult ?? 0}</div>
          </div>
        </div>

        <div style={S.statsGrid}>
          <div style={S.statBox}>
            <div style={S.statLabel}>Hands</div>
            <div style={S.statValHands}>{handsLeft}</div>
          </div>
          <div style={S.statBox}>
            <div style={S.statLabel}>Discards</div>
            <div style={S.statValDiscards}>{discardsLeft}</div>
          </div>
        </div>

        <div style={S.moneyRow}>
          <div style={S.moneyVal}>$4</div>
        </div>

        <div style={S.anteRow}>
          <div style={S.anteBox}>
            <div style={S.anteLabel}>Ante</div>
            <div style={S.anteVal}>1/8</div>
          </div>
          <div style={S.anteBox}>
            <div style={S.anteLabel}>Round</div>
            <div style={S.anteVal}>1</div>
          </div>
        </div>

        <button style={S.btnRunInfo}>Run Info</button>
        <button style={S.btnOptions}>Options</button>
      </div>

      {/* ── MAIN AREA ── */}
      <div style={S.mainArea}>

        {/* ── TOP ROW: Jokers + Tarots ── */}
        <div style={S.topRow}>
          {/* Jokers zone (5 slots) */}
          <div style={S.jokersZone}>
            <span style={S.jokersLabel}>{jokers.length}/{MAX_JOKERS}</span>
            {Array.from({ length: MAX_JOKERS }).map((_, i) => (
              jokers[i] ? (
                // Cuando tengas jokers, renderiza su imagen aquí:
                // <img key={i} src={jokers[i].img} alt={jokers[i].name} style={{width:62,height:70,borderRadius:8,objectFit:'cover'}} />
                <div key={i} style={S.jokerSlot}>{jokers[i].name}</div>
              ) : (
                <div key={i} style={S.jokerSlot}>🃏</div>
              )
            ))}
          </div>

          {/* Tarots zone (2 slots) */}
          <div style={S.tarotsZone}>
            <span style={S.tarotsLabel}>{tarots.length}/{MAX_TAROTS}</span>
            {Array.from({ length: MAX_TAROTS }).map((_, i) => (
              tarots[i] ? (
                // Cuando tengas tarots, renderiza su imagen aquí
                <div key={i} style={S.tarotSlot}>{tarots[i].name}</div>
              ) : (
                <div key={i} style={S.tarotSlot}>🔮</div>
              )
            ))}
          </div>
        </div>

        {/* ── HAND RESULT ── */}
        <div style={S.handResultArea}>
          {result && (
            <>
              <div style={S.handName}>{result.handName}</div>
              <div style={S.handScore}>Score: +{result.score}</div>
            </>
          )}
        </div>

        {/* ── CARDS ── */}
        <div style={S.cardsWrapper}>
          <div style={S.cardsContainer}>
            {hand.map((card, index) => (
              <Card
                key={index}
                card={card}
                onClick={() => toggleCard(index)}
              />
            ))}
          </div>

          {/* Deck back */}
          <div style={S.deckBack}>🂠</div>
          <div style={S.deckCount}>{deck.length}/52</div>
        </div>

        {/* ── ACTIONS ── */}
        <div style={S.actionsArea}>
          <div style={S.handCountLabel}>{hand.length}/{MAX_HAND_SIZE}</div>
          <div style={S.actionsRow}>
            <button style={S.btnPlay(canPlay)} onClick={playHand}>
              Play Hand
            </button>

            <div style={S.sortGroup}>
              <div style={S.sortLabel}>Sort Hand</div>
              <div style={S.sortBtns}>
                <button style={S.btnSort} onClick={() => setHand(sortByRank(hand))}>Rank</button>
                <button style={S.btnSort} onClick={() => setHand(sortBySuit(hand))}>Suit</button>
              </div>
            </div>

            <button style={S.btnDiscard(canDiscard)} onClick={discardCards}>
              Discard
            </button>
          </div>
        </div>
      </div>

      {/* ── WIN / GAME OVER OVERLAY ── */}
      {(win || gameOver) && (
        <div style={S.overlay}>
          <div style={S.overlayBox}>
            <div style={S.overlayTitle}>
              {win ? "🏆 YOU WIN!" : "💀 GAME OVER"}
            </div>
            <div style={S.overlaySub}>
              {win
                ? `Round complete! Score: ${totalScore}`
                : `Final score: ${totalScore} / ${TARGET_SCORE}`}
            </div>
            <button style={S.btnRestart} onClick={startGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import { createDeck } from "./data/deck";
import { shuffleDeck } from "./utils/shuffle";
import { evaluateHand } from "./utils/pokerHands";
import { getCardSpriteStyle } from "./cardSprites";
// ⬇ Cambia esta ruta si pusiste el PNG en otra carpeta
import cardsPng from "./assets/cards.png";

// ── Suit helpers ──────────────────────────────────────────────
const RED_SUITS = ["♥", "♦"];
const isRed = (suit) => RED_SUITS.includes(suit);

// ── Inline styles (no extra CSS file needed) ──────────────────
const S = {
  root: {
    display: "flex",
    width: "100vw",
    height: "100dvh",
    fontFamily: "'Nunito', sans-serif",
    background: "#0e4525",
    overflow: "hidden",
    position: "relative",
  },
  felt: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at 60% 50%, #1e7d46 0%, #145c33 60%, #0e4525 100%)",
    zIndex: 0,
  },

  // ── Sidebar ──
  sidebar: {
    width: 240,
    minWidth: 240,
    background: "#1a2340",
    borderRight: "3px solid #0d1829",
    display: "flex",
    flexDirection: "column",
    zIndex: 2,
  },
  blindHeader: {
    background: "#2a6fd4",
    padding: "7px 12px",
    textAlign: "center",
    borderBottom: "3px solid #1a4fa0",
  },
  blindTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 9,
    color: "#fff",
    letterSpacing: 1,
  },
  blindInfo: {
    padding: "8px 10px",
    borderBottom: "2px solid #0d1829",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  blindBadge: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#2a4fa0",
    border: "2px solid #4a7ad4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 5,
    color: "#fff",
    textAlign: "center",
    flexShrink: 0,
    lineHeight: 1.4,
  },
  scoreLabel: { fontSize: 10, color: "#8a9bc0", fontWeight: 700 },
  scoreTarget: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 14,
    color: "#e63946",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  rewardText: { fontSize: 10, color: "#8a9bc0", marginTop: 2 },
  rewardVal: { color: "#ffd700", fontWeight: 900 },

  roundScoreRow: {
    padding: "7px 12px",
    borderBottom: "2px solid #0d1829",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rsLabel: { fontSize: 11, color: "#8a9bc0", fontWeight: 700 },
  rsValue: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 13,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  multRow: { padding: "5px 12px", borderBottom: "2px solid #0d1829" },
  multDisplay: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#0d1829",
    borderRadius: 8,
    padding: "6px 10px",
  },
  multChips: {
    background: "#3a7bd5",
    color: "#fff",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 14,
    padding: "4px 8px",
    borderRadius: 6,
    minWidth: 36,
    textAlign: "center",
  },
  multX: { color: "#ff6b6b", fontWeight: 900, fontSize: 18 },
  multMult: {
    background: "#e63946",
    color: "#fff",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 14,
    padding: "4px 8px",
    borderRadius: 6,
    minWidth: 36,
    textAlign: "center",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 2,
    padding: "5px 12px",
    borderBottom: "2px solid #0d1829",
  },
  statBox: {
    background: "#0d1829",
    borderRadius: 6,
    padding: "6px 8px",
    textAlign: "center",
  },
  statLabel: {
    fontSize: 9,
    color: "#8a9bc0",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  statValHands: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 13,
    color: "#4ade80",
    marginTop: 2,
  },
  statValDiscards: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 13,
    color: "#fb923c",
    marginTop: 2,
  },

  moneyRow: {
    padding: "4px 12px",
    borderBottom: "2px solid #0d1829",
    textAlign: "center",
  },
  moneyVal: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 16,
    color: "#ffd700",
  },

  anteRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 2,
    padding: "5px 12px",
  },
  anteBox: {
    background: "#0d1829",
    borderRadius: 6,
    padding: "6px 8px",
    textAlign: "center",
  },
  anteLabel: { fontSize: 9, color: "#8a9bc0", fontWeight: 700 },
  anteVal: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 11,
    color: "#e2e8f0",
    marginTop: 2,
  },

  btnRunInfo: {
    margin: "5px 12px 3px",
    background: "#e63946",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 8,
    padding: "8px",
    cursor: "pointer",
    letterSpacing: 1,
  },
  btnOptions: {
    margin: "3px 12px 8px",
    background: "#f59e0b",
    border: "none",
    borderRadius: 8,
    color: "#1a1a00",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 8,
    padding: "8px",
    cursor: "pointer",
    letterSpacing: 1,
  },

  // ── Main area ──
  mainArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    zIndex: 2,
    position: "relative",
    padding: "10px 16px 10px",
    overflow: "hidden",
  },

  // ── Top row: jokers + tarots ──
  topRow: {
    display: "flex",
    gap: 10,
    marginBottom: 6,
    alignItems: "flex-start",
  },
  jokersZone: {
    flex: 1,
    minHeight: 76,
    background: "rgba(0,0,0,0.25)",
    border: "2px dashed rgba(255,255,255,0.15)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    padding: "8px 10px",
    gap: 8,
    position: "relative",
  },
  jokersLabel: {
    position: "absolute",
    top: 4,
    left: 8,
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 7,
    color: "rgba(255,255,255,0.3)",
    pointerEvents: "none",
  },
  jokerSlot: {
    width: 54,
    height: 62,
    background: "rgba(255,255,255,0.05)",
    border: "1.5px dashed rgba(255,255,255,0.15)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.15)",
    fontSize: 20,
  },
  tarotsZone: {
    width: 140,
    minHeight: 76,
    background: "rgba(0,0,0,0.25)",
    border: "2px dashed rgba(255,255,255,0.15)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    gap: 8,
    position: "relative",
    flexShrink: 0,
  },
  tarotsLabel: {
    position: "absolute",
    top: 4,
    left: 8,
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 7,
    color: "rgba(255,255,255,0.3)",
    pointerEvents: "none",
  },
  tarotSlot: {
    width: 46,
    height: 62,
    background: "rgba(255,255,255,0.05)",
    border: "1.5px dashed rgba(255,255,255,0.15)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.15)",
    fontSize: 18,
  },

  // ── Hand result ──
  handResultArea: {
    textAlign: "center",
    minHeight: 36,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  handName: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 13,
    color: "#ffd700",
    textShadow: "0 0 16px rgba(255,215,0,0.5)",
  },
  handScore: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 10,
    color: "#fff",
    marginTop: 4,
    opacity: 0.8,
  },

  // ── Cards ──
  cardsWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingBottom: 40
  },
  cardsContainer: {
    display: "flex",
    gap: 18,
    alignItems: "flex-end",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  cardBase: {
    width: 62,
    height: 90,
    background: "#fff",
    borderRadius: 8,
    border: "1.5px solid #ccc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 5px",
    cursor: "pointer",
    position: "relative",
    userSelect: "none",
    boxShadow: "2px 3px 8px rgba(0,0,0,0.4)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  cardSelected: { transform: "translateY(-16px)",
    
    boxShadow: "0 14px 28px rgba(0,0,0,0.6)",
    border: "2.5px solid #ffd700",
  },
  cardNormal: {
    transform: "translateY(0)",
  },
  cardCorner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: 1,
    alignSelf: "flex-start",
  },
  cardCornerBottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: 1,
    alignSelf: "flex-end",
    transform: "rotate(180deg)",
  },
  cardRank: { fontSize: 13, fontWeight: 900, lineHeight: 1 },
  cardSuitSm: { fontSize: 10, lineHeight: 1 },
  cardCenter: { fontSize: 22 },
  cardRed: { color: "#cc0000" },
  cardBlack: { color: "#111" },

  // ── Deck back ──
  deckBack: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 78,
    height: 112,
    background: "#1a3a8f",
    borderRadius: 8,
    border: "2px solid #2a5ad4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    boxShadow: "2px 3px 8px rgba(0,0,0,0.5)",
  },
  deckCount: {
    position: "absolute",
    right: 0,
    bottom: -18,
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 7,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    width: 58,
  },

  // ── Actions ──
  actionsArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  handCountLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 8,
    color: "rgba(255,255,255,0.35)",
  },
  actionsRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },

  btnPlay: (active) => ({
    background: "#2a6fd4",
    border: "2px solid #4a8fe4",
    borderRadius: 10,
    color: "#fff",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 9,
    padding: "12px 20px",
    cursor: active ? "pointer" : "default",
    letterSpacing: 1,
    opacity: active ? 1 : 0.45,
    transition: "opacity 0.15s",
  }),
  sortGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
  },
  sortLabel: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 7,
    color: "rgba(255,255,255,0.4)",
  },
  sortBtns: { display: "flex", gap: 4 },
  btnSort: {
    background: "#ffd700",
    border: "2px solid #b8860b",
    borderRadius: 6,
    color: "#1a1a00",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 7,
    padding: "6px 10px",
    cursor: "pointer",
  },
  btnDiscard: (active) => ({
    background: active ? "#666" : "#444",
    border: `2px solid ${active ? "#999" : "#666"}`,
    borderRadius: 10,
    color: "#fff",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 9,
    padding: "12px 20px",
    cursor: active ? "pointer" : "default",
    letterSpacing: 1,
    opacity: active ? 1 : 0.45,
    transition: "opacity 0.15s",
  }),

  // ── Overlay ──
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  overlayBox: {
    background: "#1a2340",
    border: "3px solid #ffd700",
    borderRadius: 16,
    padding: "32px 48px",
    textAlign: "center",
  },
  overlayTitle: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 18,
    color: "#ffd700",
    marginBottom: 4,
  },
  overlaySub: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 10,
    color: "#8a9bc0",
  },
  btnRestart: {
    marginTop: 20,
    background: "#2a6fd4",
    border: "2px solid #4a8fe4",
    borderRadius: 8,
    color: "#fff",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 8,
    padding: "10px 20px",
    cursor: "pointer",
  },
};

// ── Card component ────────────────────────────────────────────
function Card({ card, onClick }) {
  const rank = card.value ?? card.rank;
  const suit = card.suit;

  const spriteStyle = getCardSpriteStyle(
    rank,
    suit,
    cardsPng
  );

  return (
    <div
      onClick={onClick}
      style={{
        ...spriteStyle,

        borderRadius: 8,
        overflow: "hidden",

        cursor: "pointer",
        userSelect: "none",

        backgroundColor: "white",

        boxShadow: card.selected
          ? "0 0 0 2.5px #ffd700, 0 14px 28px rgba(0,0,0,0.6)"
          : "2px 3px 8px rgba(0,0,0,0.5)",

        transform: card.selected
          ? "translateY(-16px)"
          : "translateY(0)",

        transition:
          "transform 0.15s, box-shadow 0.15s",

        imageRendering: "pixelated",

        flexShrink: 0,
      }}
    />
  );
}

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

  function replaceSelectedCards(currentHand, currentDeck) {
    const newDeck = [...currentDeck];
    const newHand = currentHand.map((card) => {
      if (card.selected) {
        const next = newDeck.shift();
        return next ? { ...next, selected: false } : null;
      }
      return { ...card, selected: false };
    }).filter(Boolean);
    return { newHand, newDeck };
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
  }

  function sortByRank() {
    const rankOrder = { A:14,K:13,Q:12,J:11,10:10,9:9,8:8,7:7,6:6,5:5,4:4,3:3,2:2 };
    setHand((h) =>
      [...h].sort((a, b) => (rankOrder[b.value ?? b.rank] ?? 0) - (rankOrder[a.value ?? a.rank] ?? 0))
    );
  }

  function sortBySuit() {
    const suitOrder = { "♠":0,"♥":1,"♦":2,"♣":3 };
    const rankOrder = { A:14,K:13,Q:12,J:11,10:10,9:9,8:8,7:7,6:6,5:5,4:4,3:3,2:2 };
    setHand((h) =>
      [...h].sort((a, b) => {
        const sd = (suitOrder[a.suit] ?? 0) - (suitOrder[b.suit] ?? 0);
        if (sd !== 0) return sd;
        return (rankOrder[b.value ?? b.rank] ?? 0) - (rankOrder[a.value ?? a.rank] ?? 0);
      })
    );
  }

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
                <button style={S.btnSort} onClick={sortByRank}>Rank</button>
                <button style={S.btnSort} onClick={sortBySuit}>Suit</button>
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
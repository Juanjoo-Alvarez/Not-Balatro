// Los estilo para la pantalla de selección de Jokers

export const overlayStyle = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.82)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 30,
};

export const boxStyle = {
  background: "#1a2340",
  border: "3px solid #ffd700",
  borderRadius: 16,
  padding: "32px 40px",
  textAlign: "center",
  maxWidth: 640,
  width: "90%",
};

export const titleStyle = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: 16,
  color: "#ffd700",
  marginBottom: 10,
};

export const subtitleStyle = {
  fontFamily: "'Nunito', sans-serif",
  fontSize: 13,
  color: "#8a9bc0",
  marginBottom: 24,
};

export const cardsRowStyle = {
  display: "flex",
  gap: 16,
  justifyContent: "center",
  flexWrap: "wrap",
};

export const jokerCardStyle = {
  background: "#0d1829",
  border: "2px solid #2a4fa0",
  borderRadius: 12,
  padding: "16px 12px",
  width: 140,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

export const jokerNameStyle = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: 8,
  color: "#e2e8f0",
  textAlign: "center",
};

export const jokerDescStyle = {
  fontFamily: "'Nunito', sans-serif",
  fontSize: 11,
  color: "#8a9bc0",
  textAlign: "center",
};

const rarityBadgeColors = {
  common: {
    bg: "#1a3a1a",
    color: "#4ade80",
  },

  uncommon: {
    bg: "#1a2a3a",
    color: "#60a5fa",
  },

  rare: {
    bg: "#2a1a3a",
    color: "#c084fc",
  },
};

export const rarityStyle =
  rarity => ({
    fontFamily:
      "'Press Start 2P', monospace",

    fontSize: 7,

    padding: "3px 8px",

    borderRadius: 4,

    background:
      rarityBadgeColors[
        rarity
      ]?.bg ?? "#222",

    color:
      rarityBadgeColors[
        rarity
      ]?.color ?? "#fff",
  });

export const backBtnStyle = {
  marginTop: 20,
};
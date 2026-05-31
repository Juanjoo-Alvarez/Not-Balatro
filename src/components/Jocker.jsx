// Ahorita solo es para ver los jokers sin assets

// Luego se debe modificar para cuando se tengan los assets

export default function Joker({ joker }) {
  return (
    <div style={jokerStyle}>
      <span style={emojiStyle}>🃏</span>
    </div>
  );
}

const jokerStyle = {
  width: 72,
  height: 96,

  borderRadius: 10,

  background:
    "linear-gradient(180deg, #243b64, #16233b)",

  border: "2px solid #3f5c9a",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.25)",
};

const emojiStyle = {
  fontSize: 28,
};
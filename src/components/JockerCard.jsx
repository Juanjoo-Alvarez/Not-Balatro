// Aqui es donde estaran las cartas de los jokers

import Joker from "./Joker";

import {
  jokerCardStyle,
  jokerNameStyle,
  jokerDescStyle,
  rarityStyle,
} from "../styles/jokerStyles";

export default function JokerCard({
  joker,
  onClick,
  danger = false,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        ...jokerCardStyle,

        borderColor:
          danger
            ? "#e63946"
            : "#2a4fa0",
      }}
    >
      <Joker joker={joker} />

      <div style={jokerNameStyle}>
        {joker.name}
      </div>

      <div style={jokerDescStyle}>
        {joker.description}
      </div>

      <div
        style={rarityStyle(
          joker.rarity
        )}
      >
        {joker.rarity}
      </div>

      {joker.currentMult !==
        undefined && (
        <div
          style={jokerDescStyle}
        >
          Mult actual:
          +{joker.currentMult}
        </div>
      )}
    </div>
  );
}
import { getCardSpriteStyle } from "../cardSprites";
import cardsPng from "../assets/cards.png";

export default function Card({
  card,
  onClick,
}) {
  const rank =
    card.value ?? card.rank;

  const suit = card.suit;

  const spriteStyle =
    getCardSpriteStyle(
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

        backgroundColor: "white",

        boxShadow:
          card.selected
            ? "0 0 0 2px gold"
            : "2px 3px 8px rgba(0,0,0,.5)",

        transform:
          card.selected
            ? "translateY(-16px)"
            : "translateY(0)",

        transition:
          "transform .15s",
      }}
    />
  );
}
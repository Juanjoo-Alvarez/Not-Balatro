// Catálogo de jokers disponibles en el juego
// Cada joker tiene: id, name, description, y rarity (para después)


export const JOKER_CATALOG = [
  {
    id: "joker_base",
    name: "Joker",
    description: "+4 Mult",
    rarity: "common",
    // Sin estado extra — efecto fijo
  },
  {
    id: "gros_michel",
    name: "Gros Michel",
    description: "+15 Mult. 1 en 6 chances de destruirse al jugar",
    rarity: "common",
    // Se destruye = se remueve de activeJokers
  },
  {
    id: "baron",
    name: "Baron",
    description: "Cada K en mano da ×1.5 Mult",
    rarity: "rare",
    // Itera sobre selectedCards buscando K
  },
  {
    id: "popcorn",
    name: "Popcorn",
    description: "+20 Mult, -4 Mult por cada mano jugada",
    rarity: "common",
    // Necesita estado propio: mult actual del joker
    initialState: { currentMult: 20 },
  },
  {
    id: "the_duo",
    name: "The Duo",
    description: "×2 Mult si la mano jugada es un par",
    rarity: "rare",
    // Checa result.handName
  },
];
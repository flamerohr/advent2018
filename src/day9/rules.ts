export interface Rules {
  players: number;
  last: number;
  winner?: number;
}

export const examples: Rules[] = [
  {
    players: 9,
    last: 25,
    winner: 32,
  },
  {
    players: 10,
    last: 1618,
    winner: 8317,
  },
  {
    players: 13,
    last: 7999,
    winner: 146373,
  },
  {
    players: 17,
    last: 1104,
    winner: 2764,
  },
  {
    players: 21,
    last: 6111,
    winner: 54718,
  },
  {
    players: 30,
    last: 5807,
    winner: 37305,
  },
];

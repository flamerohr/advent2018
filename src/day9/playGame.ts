import { Rules } from './rules';

export const playGame = (rule: Rules): number => {
  let turn = 1;
  let index = 1;
  const players = [];
  const circle = [0];

  while (turn <= rule.last) {
    const playerIndex = turn % rule.players;

    if (turn % 23 === 0) {
      index = (index - 9 + circle.length) % circle.length;
      const bonus = circle.splice(index, 1)[0];
      if (!players[playerIndex]) {
        players[playerIndex] = 0;
      }
      players[playerIndex] += turn + bonus;
    } else if (index === circle.length) {
      circle.push(turn);
    } else {
      circle.splice(index, 0, turn);
    }

    turn += 1;
    index = index + 2;
    if (index > circle.length) {
      index = index % 2;
      if (index === 0) {
        index += 1;
      }
    }
  }

  return Math.max(...players.filter(score => score));
};

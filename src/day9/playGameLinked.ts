import { Rules } from './rules';
import { Circle, LinkedItem } from './circle';

export const playGameLinked = (rule: Rules): number => {
  let turn = 1;
  const players = [];
  const circle = new Circle();

  while (turn <= rule.last) {
    const playerIndex = turn % rule.players;

    if (turn % 23 === 0) {
      const bonus: LinkedItem = circle.pop();
      if (!players[playerIndex]) {
        players[playerIndex] = 0;
      }
      players[playerIndex] += turn + bonus.value;
    } else {
      circle.push(turn);
    }

    turn += 1;
  }

  return Math.max(...players.filter(score => score));
};

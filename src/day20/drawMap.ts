import { Part, Direction, directionList } from './getParts';
import { printMap } from './printMap';
import { tick } from '../day17/tick';

export interface Point {
  x: number;
  y: number;
}

export interface Location extends Point {
  potential: Part;
  path: Point[];
}

export enum Tile {
  open = 'M',
  wall = '#',
  far = 'W',
  door = 'O',
}

export interface DrawMapOutput {
  map: Tile[][];
  locations: Location[];
}

export const step = (
  map: Tile[][],
  prevLocation: Location,
  direction: Direction,
): Location | null => {
  const { x, y, path, ...rest } = prevLocation;
  let location: Location = { x: 0, y: 0, path: [], ...rest };
  let point = { x: 0, y: 0 };
  switch (direction) {
    case Direction.N: {
      point = {
        x,
        y: y - 1,
      };
      location = {
        ...point,
        path: [...path, point],
        ...rest,
      };
      break;
    }
    case Direction.S: {
      point = {
        x,
        y: y + 1,
      };
      location = {
        ...point,
        path: [...path, point],
        ...rest,
      };
      break;
    }
    case Direction.W: {
      point = {
        y,
        x: x - 1,
      };
      location = {
        ...point,
        path: [...path, point],
        ...rest,
      };
      break;
    }
    case Direction.E: {
      point = {
        y,
        x: x + 1,
      };
      location = {
        ...point,
        path: [...path, point],
        ...rest,
      };
      break;
    }
    default: {
      throw new Error('bullshit');
    }
  }
  if (location.x === 0 && location.y === 0) {
    throw new Error('bullshit');
  }

  const lastIndex = path.findIndex(item => point.x === item.x && point.y === item.y);
  if (lastIndex !== -1) {
    location.path = [...path.slice(0, lastIndex), point];
  }

  if (!map[location.x * 2]) {
    map[location.x * 2] = [];
  }

  if ([Tile.open, Tile.far].indexOf(map[location.x * 2][location.y * 2]) !== -1) {
    return null;
  }
  map[location.x * 2][location.y * 2] = Tile.open;
  if (location.path.length >= 1000) {
    map[location.x * 2][location.y * 2] = Tile.far;
  }
  const middleX = (location.x * 2 + x * 2) / 2;
  const middleY = (location.y * 2 + y * 2) / 2;
  if (!map[middleX]) {
    map[middleX] = [];
  }
  map[middleX][middleY] = Tile.door;
  return location;
};

export const drawMap = (
  parts: Part,
  draw: boolean = false,
): DrawMapOutput => {
  const map: Tile[][] = [[Tile.open]];
  const queue: Location[] = [{ x: 0, y: 0, potential: parts.slice(0), path: [] }];
  const locations: Location[] = [];

  let counter = 0;

  while (queue.length > 0) {
    const current = queue.shift() as Location;

    const [nextStep, ...newPotential] = current.potential;
    if (!nextStep) {
      locations.push(current);
    } else if (directionList.indexOf(nextStep as Direction) > -1) {
      const newLocation = step(map, current, nextStep as Direction);
      if (!newLocation) {
        locations.push(current);
        continue;
      }
      queue.push({
        ...newLocation,
        potential: newPotential as Part,
      });
    } else if (Array.isArray(nextStep)) {
      let hasEmpty = false;
      for (let i = 0; i < nextStep.length; i += 1) {
        if (nextStep[i].length === 0) {
          hasEmpty = true;
          continue;
        }
        queue.push({
          ...current,
          path: [...current.path],
          potential: (nextStep[i] as Part).concat(newPotential),
        });
      }
      if (hasEmpty) {
        queue.push({
          ...current,
          path: [...current.path],
          potential: newPotential,
        });
      }
    }
    if (counter % 50 === 0 && draw) {
      console.log('');
      console.log('');
      printMap(map, queue, false);
    }
    counter += 1;
  }

  return {
    map,
    locations,
  };
};

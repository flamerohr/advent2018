export enum Tile {
  wall = '#',
  open = '.',
}

export interface Point {
  x: number;
  y: number;
}

export interface Unit extends Point {
  id: number;
  hp: number;
  attack: number;
  type: 'E'|'G';
}

export const sortUnits = (a: Unit, b: Unit) => {
  if (a.y > b.y) {
    return 1;
  }
  if (a.y < b.y) {
    return -1;
  }
  if (a.x > b.x) {
    return 1;
  }
  if (a.x < b.x) {
    return -1;
  }
  return 0;
};

export const extractUnits = (mapString: string): { units: Unit[], map: Tile[][] } => {
  const rows = mapString.split('\n');
  const units: Unit[] = [];
  const map: Tile[][] = [];

  for (let y = 0; y < rows.length; y += 1) {
    const tiles = rows[y].split('');
    for (let x = 0; x < tiles.length; x += 1) {
      const tile = tiles[x];
      if (!map[x]) {
        map[x] = [];
      }

      switch (tile) {
        case Tile.open:
        case Tile.wall: {
          map[x][y] = tile;
          break;
        }
        case 'E':
        case 'G': {
          const unit: Unit = {
            x,
            y,
            hp: 200,
            attack: 3,
            id: units.length,
            type: tile,
          };
          units.push(unit);
          map[x][y] = Tile.open;
          break;
        }
      }
    }
  }

  units.sort(sortUnits);
  return {
    units,
    map,
  };
};

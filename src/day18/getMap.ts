export enum Tile {
  open = '.',
  tree = '|',
  lumberyard = '#',
}

export const tilesList: Tile[] = [Tile.open, Tile.tree, Tile.lumberyard];

export const getMap = (description: string): Tile[][] => {
  const lines: string[] = description.split('\n');
  const map: Tile[][] = [];

  for (let y = 0; y < lines.length; y += 1) {
    const tiles: string[] = lines[y].split('');
    for (let x = 0; x < tiles.length; x += 1) {
      if (!map[x]) {
        map[x] = [];
      }
      map[x][y] = tiles[x] as Tile;
    }
  }

  return map;
};

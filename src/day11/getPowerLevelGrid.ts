const HEIGHT: number = 300;
const WIDTH: number = 300;

export const getPowerLevel = (x: number, y: number, serialNumber: number): number => {
  const rackId: number = x + 10;
  const start: number = ((rackId * y) + serialNumber) * rackId;

  const factor: string = String(start);

  const constant: number = Number(factor[factor.length - 3] || 0);

  return constant - 5;
};

export const getPowerGrid = (serialNumber: number): number[][] => {
  const grid: number[][] = [];

  for (let x = 1; x <= WIDTH; x += 1) {
    if (!grid[x]) {
      grid[x] = [];
    }
    for (let y = 1; y <= HEIGHT; y += 1) {
      grid[x][y] = getPowerLevel(x, y, serialNumber);
    }
  }
  return grid;
};

export const getTotal = (grid: number[][], x: number, y: number, z: number): number => {
  let total = 0;
  for (let dX = 0; dX < z; dX += 1) {
    for (let dY = 0; dY < z; dY += 1) {
      total += grid[x + dX][y + dY];
    }
  }
  return total;
};

export const getTotalPowerGrid = (serialNumber: number): number[][] => {
  const grid: number[][] = getPowerGrid(serialNumber);
  const totalGrid: number[][] = [];

  for (let x = 1; x <= WIDTH - 2; x += 1) {
    if (!totalGrid[x]) {
      totalGrid[x] = [];
    }
    for (let y = 1; y <= HEIGHT - 2; y += 1) {
      totalGrid[x][y] = getTotal(grid, x, y, 3);
    }
  }

  return totalGrid;
};

export const getTotalPowerGridSize = (serialNumber: number): number[][][] => {
  const grid: number[][] = getPowerGrid(serialNumber);
  const totalGrid: number[][][] = [];

  for (let x = 1; x <= WIDTH; x += 1) {
    if (!totalGrid[x]) {
      totalGrid[x] = [];
    }
    for (let y = 1; y <= HEIGHT; y += 1) {
      if (!totalGrid[x][y]) {
        totalGrid[x][y] = [];
      }
      const maxSize = Math.min(WIDTH - x, HEIGHT - y);
      for (let z = 1; z <= maxSize; z += 1) {
        totalGrid[x][y][z] = getTotal(grid, x, y, z);
      }
    }
  }

  return totalGrid;
};

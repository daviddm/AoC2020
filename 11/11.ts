type Grid = string[][];

enum Char {
  EmptyChair = "L",
  OccupiedChair = "#",
  Floor = ".",
}

export const makeGrid = (lines: string[]): Grid => {
  return lines.map((line) => line.split(""));
};

const isEmptySeat = (s: string) => s === Char.EmptyChair;
const isOccupiedSeat = (s: string) => s === Char.OccupiedChair;
const isSeat = (s: string) => isEmptySeat(s) || isOccupiedSeat(s);
const isFloor = (s: string) => s === Char.Floor;

export const isCrowdedSeat = (x: number, y: number, grid: Grid) =>
  isOccupiedSeat(grid[x][y]) && countOccupied(x, y, grid) >= 4;

export const isSitableSeat = (x: number, y: number, grid: Grid) =>
  isEmptySeat(grid[x][y]) && countOccupied(x, y, grid) === 0;

const countOccupied = (x: number, y: number, grid: Grid): number => {
  let occupied = 0;
  for (let i = x - 1; i <= x + 1 && i < grid.length; i++) {
    if (i < 0) {
      continue;
    }

    for (let j = y - 1; j <= y + 1 && j < grid[i].length; j++) {
      if (j < 0) {
        continue;
      }
      if (i === x && j === y) {
        continue;
      }

      if (isOccupiedSeat(grid[i][j])) {
        occupied++;
      }
    }
  }
  return occupied;
};

const checksumGrid = (grid: Grid): string => grid.toString();

export const simulate = (gridOrg: Grid) => {
  let grid = gridOrg;

  let isStabilizes = false;
  let checksum = checksumGrid(grid);

  while (!isStabilizes) {
    // Fill empty seats
    grid = grid.map((line, i) => {
      return line.map((pos, j) => {
        if (isSitableSeat(i, j, grid)) {
          return Char.OccupiedChair;
        }
        return pos;
      });
    });

    //Empty crowded seats
    grid = grid.map((line, i) => {
      return line.map((pos, j) => {
        if (isCrowdedSeat(i, j, grid)) {
          return Char.EmptyChair;
        }
        return pos;
      });
    });

    if (checksum === checksumGrid(grid)) {
      isStabilizes = true;
      break;
    }

    checksum = checksumGrid(grid);
  }

  return checksum.split(Char.OccupiedChair).length - 1;
};

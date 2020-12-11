type Grid = string[][];

const allDirections: [number, number][] = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

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

export const isCrowdedSeat = (
  x: number,
  y: number,
  grid: Grid,
  limit: number,
  aggressive = false
) => {
    const occupied = allDirections
      .map((dir) => getSeatInDir(x, y, grid, dir, !aggressive))
      .reduce((total, seat) => (isOccupiedSeat(seat) ? total + 1 : total), 0);

    return occupied >= limit;
};

export const isSuitableSeat = (
  x: number,
  y: number,
  grid: Grid,
  aggressive = false
) => {
    return allDirections
      .map((dir) => getSeatInDir(x, y, grid, dir, !aggressive))
      .every((seat) => !isOccupiedSeat(seat));
};

export const getSeatInDir = (
  _x: number,
  _y: number,
  grid: Grid,
  dir: [number, number],
  onlyAdjacent = true
): string => {
  const [dx, dy] = dir;
  let x = _x + dx;
  let y = _y + dy;
  while (grid[x] && grid[x][y]) {
    if (isSeat(grid[x][y])) {
      return grid[x][y];
    }
    x += dx;
    y += dy;
    if (onlyAdjacent) {
      return "-";
    }
  }

  return "-";
};

const checksumGrid = (grid: Grid): string => grid.toString();

export const simulate = (
  gridOrg: Grid,
  occupiedLimit: number,
  aggressive = false
) => {
  let grid = gridOrg;

  let isStabilizes = false;
  let checksum = checksumGrid(grid);

  while (!isStabilizes) {
    // Fill empty seats
    grid = grid.map((line, i) => {
      return line.map((pos, j) => {
        if (isSeat(grid[i][j]) && isSuitableSeat(i, j, grid, aggressive)) {
          return Char.OccupiedChair;
        }
        return pos;
      });
    });

    //Empty crowded seats
    grid = grid.map((line, i) => {
      return line.map((pos, j) => {
        if (
          isSeat(grid[i][j]) &&
          isCrowdedSeat(i, j, grid, occupiedLimit, aggressive)
        ) {
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

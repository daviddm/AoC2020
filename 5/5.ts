import logger from "util/logger";

const calcSeatId = (row: number, seat: number): number => {
  return row * 8 + seat;
};

export const getSeatId = (s: string): number => {
  return calcSeatId(decodeRow(s.slice(0, 7)), decodeSeat(s.slice(7)));
};

export const findEmptySeat = (boardingPasses: string[]): number => {
  const seats: boolean[][] = Array.from(Array(128).keys(), () =>
    Array.from(Array(8).keys(), () => false)
  );
  boardingPasses.forEach((boardingPass) => {
    const row = decodeRow(boardingPass.slice(0, 7));
    const col = decodeSeat(boardingPass.slice(7));
    seats[row][col] = true;
  });

  let hasSeenOccupiedSeat = false;
  let seatId = 0;
  seats.every((row, i) => {
    return row.every((seat, j) => {
      if (!seat) {
        if (hasSeenOccupiedSeat) {
          seatId = calcSeatId(i, j);
          return false;
        }
        return true;
      }
      hasSeenOccupiedSeat = true;
      return true;
    });
  });
  return seatId;
};

export const decodeRow = (s: string, val = 127): number => {
  const r = recursiveBound(s, val + 1, 0, val, { Up: "B", Down: "F" });
  logger.debug("r", r);
  return r;
};

export const decodeSeat = (s: string, val = 7): number => {
  const r = recursiveBound(s, val + 1, 0, val, { Up: "R", Down: "L" });
  logger.debug("r", r);
  return r;
};

type Dir = {
  Up: string;
  Down: string;
};

const recursiveBound = (
  s: string,
  step: number,
  lower: number,
  upper: number,
  dirs: Dir
): number => {
  logger.debug(s, step, lower, upper);
  if (s.length === 0) {
    logger.debug("end");
    return lower;
  }
  const half = step / 2;
  if (s[0] === dirs.Down) {
    return recursiveBound(s.slice(1), half, lower, upper - half, dirs);
  }
  if (s[0] === dirs.Up) {
    return recursiveBound(s.slice(1), half, lower + half, upper, dirs);
  }
  logger.error('FAIL')
  return 0;
};

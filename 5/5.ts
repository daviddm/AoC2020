import logger from "util/logger";

const calcSeatId = (row: number, seat: number): number => {
  return row * 8 + seat;
};

export const getSeatId = (s: string): number => {
  return calcSeatId(decodeRow(s.slice(0, 7)), decodeSeat(s.slice(7)));
};

export const findEmptySeat = (boardingPasses: string[]): number => {
  const seat = boardingPasses
    .map((b) => getSeatId(b))
    .sort((a, b) => a - b)
    .find((_, i, arr) => {
      return arr[i] + 1 !== arr[i + 1];
    });
  return (seat as number) + 1;
};

export const decodeRow = (s: string): number => {
  const binary = s.replace(/B/g, "1").replace(/F/g, "0");
  return parseInt(binary, 2);
};

export const decodeSeat = (s: string): number => {
  const binary = s.replace(/R/g, "1").replace(/L/g, "0");
  return parseInt(binary, 2);
};

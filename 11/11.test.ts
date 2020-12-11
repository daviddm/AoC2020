import { readFile, readFileBetter } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import { isCrowdedSeat, isSitableSeat, makeGrid, simulate } from "./11";

describe("10", () => {
  let raw: string;
  let lines: string[];

  beforeEach(async () => {
    raw = await readFileBetter("input.test.txt");
    lines = splitOnNewline(raw);
  });

  describe("isCrowdedSeat", () => {
    let grid: string[][];

    beforeEach(async () => {
      grid = [
        ["L", "L", "L"],
        ["L", "L", "L"],
        ["L", "L", "L"],
      ];
    });

    it("should return false as default", () => {
      expect(isCrowdedSeat(1, 1, grid)).toBeFalsy();
    });
    it("should return true when everything is occupied", () => {
      grid = [
        ["#", "#", "#"],
        ["#", "#", "#"],
        ["#", "#", "#"],
      ];
      expect(isCrowdedSeat(1, 1, grid)).toBeTruthy();
    });
    it("should return false because the seat is not occupied", () => {
      grid = [
        ["#", "#", "L"],
        ["#", "L", "L"],
        ["#", "#", "L"],
      ];
      expect(isCrowdedSeat(1, 1, grid)).toBeFalsy();
    });
    it("should return true for occupied edge", () => {
      grid = [
        ["#", "#", "L"],
        ["#", "#", "L"],
        ["#", "#", "L"],
      ];
      expect(isCrowdedSeat(1, 0, grid)).toBeTruthy();
    });
    it("should return false for edge", () => {
      grid = [
        ["#", "#", "L"],
        ["#", "L", "L"],
        ["#", "#", "L"],
      ];
      expect(isCrowdedSeat(2, 2, grid)).toBeFalsy();
    });
  });

  describe("isSitableSeat", () => {
    let grid: string[][];

    beforeEach(async () => {
      grid = [
        ["L", "L", "L"],
        ["L", "L", "L"],
        ["L", "L", "L"],
      ];
    });

    it("should return true as default", () => {
      expect(isSitableSeat(1, 1, grid)).toBeTruthy();
    });
    it("should return false for occupied seat", () => {
      grid = [
        ["L", "L", "L"],
        ["L", "#", "L"],
        ["L", "L", "L"],
      ];
      expect(isSitableSeat(1, 1, grid)).toBeFalsy();
    });
    it("should return false when1 seat adjacent is occupied", () => {
      grid = [
        ["L", "L", "L"],
        ["#", "L", "L"],
        ["L", "L", "L"],
      ];
      expect(isSitableSeat(1, 1, grid)).toBeFalsy();
    });
  });

  it("1a", () => {
    const grid = makeGrid(lines);
    const result = simulate(grid);
    expect(result).toBe(37);
  });
});

describe("Run", () => {
  let raw: string;
  let lines: string[];

  beforeEach(async () => {
    raw = await readFileBetter("input.txt");
    lines = splitOnNewline(raw);
  });

  it("Star 1", async () => {
    const grid = makeGrid(lines);
    const result = simulate(grid);
    logger.info("Star1: ", result);
    // expect(result).toBe(1917);
  });

  // it("Star 2", async () => {
  //   const result = calcArrangements(lines);
  //   logger.info("Star2: ", result);
  //   expect(result).toBe(113387824750592);
  // });
});

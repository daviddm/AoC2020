import { readFile, readFileBetter } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import {
  getSeatInDir,
  isCrowdedSeat,
  isSuitableSeat,
  makeGrid,
  simulate,
} from "./11";

describe("10", () => {
  let raw: string;
  let lines: string[];
  let limit: number;

  beforeEach(async () => {
    raw = await readFileBetter("input.test.txt");
    lines = splitOnNewline(raw);
    limit = 4;
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
      expect(isCrowdedSeat(1, 1, grid, limit)).toBeFalsy();
    });
    it("should return true when everything is occupied", () => {
      grid = [
        ["#", "#", "#"],
        ["#", "#", "#"],
        ["#", "#", "#"],
      ];
      expect(isCrowdedSeat(1, 1, grid, limit)).toBeTruthy();
    });
    it("should return false because the seat is not occupied", () => {
      grid = [
        ["#", "#", "L"],
        [".", "L", "L"],
        [".", "#", "L"],
      ];
      expect(isCrowdedSeat(1, 1, grid, limit)).toBeFalsy();
    });
    it("should return true for occupied edge", () => {
      grid = [
        ["#", "#", "L"],
        ["#", "#", "L"],
        ["#", "#", "L"],
      ];
      expect(isCrowdedSeat(1, 0, grid, limit)).toBeTruthy();
    });
    it("should return false for edge", () => {
      grid = [
        ["#", "#", "L"],
        ["#", "L", "L"],
        ["#", "#", "L"],
      ];
      expect(isCrowdedSeat(2, 2, grid, limit)).toBeFalsy();
    });

    describe("aggresive", () => {
      beforeEach(async () => {
        grid = [
          [".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
          [".", "L", ".", "L", ".", "#", ".", "L", ".", "#", ".", "#", "."],
          [".", ".", ".", ".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
        ];
      });
      it("should return false, 1", () => {
        expect(isCrowdedSeat(1, 1, grid, 5, true)).toBeFalsy();
      });
      it("should return false, 3", () => {
        expect(isCrowdedSeat(1, 3, grid, 5, true)).toBeFalsy();
      });
      it("should return false, 7", () => {
        expect(isCrowdedSeat(1, 7, grid, 5, true)).toBeFalsy();
      });
      it("should return true, 7", () => {
        grid[0][6] = "#";
        expect(isCrowdedSeat(1, 7, grid, 5, true)).toBeTruthy();
      });
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
      expect(isSuitableSeat(1, 1, grid)).toBeTruthy();
    });
    it("should return false when 1 seat adjacent is occupied", () => {
      grid = [
        ["L", "L", "L"],
        ["#", "L", "L"],
        ["L", "L", "L"],
      ];
      expect(isSuitableSeat(1, 1, grid)).toBeFalsy();
    });

    describe("aggresive", () => {
      beforeEach(async () => {
        grid = [
          [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", "L", ".", "L", ".", "#", ".", "#", ".", "#", ".", "#", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ];
      });
      it("should return true", () => {
        expect(isSuitableSeat(1, 1, grid, true)).toBeTruthy();
      });
      it("should return false", () => {
        expect(isSuitableSeat(1, 3, grid, true)).toBeFalsy();
      });
    });
  });

  describe("getFirstInDir", () => {
    let grid: string[][];

    beforeEach(async () => {
      grid = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "L", ".", "L", ".", "#", ".", "#", ".", "#", ".", "#", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];
    });
    it("should return L", () => {
      expect(getSeatInDir(1, 1, grid, [0, 1], false)).toBe("L");
    });
    it("should return #", () => {
      expect(getSeatInDir(1, 3, grid, [0, 1], false)).toBe("#");
    });
    it("should return L", () => {
      expect(getSeatInDir(1, 3, grid, [0, -1], false)).toBe("L");
    });
    it("should return '-'", () => {
      expect(getSeatInDir(1, 1, grid, [0, -1], false)).toBe("-");
    });
  });

  it("1a", () => {
    const grid = makeGrid(lines);
    const result = simulate(grid, 4);
    expect(result).toBe(37);
  });
  it("1b", () => {
    const grid = makeGrid(lines);
    const result = simulate(grid, 5, true);
    expect(result).toBe(26);
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
    const result = simulate(grid, 4);
    logger.info("Star1: ", result);
    expect(result).toBe(2281);
  });

  it("Star 2", async () => {
    const grid = makeGrid(lines);
    const result = simulate(grid, 5, true);
    logger.info("Star2: ", result);
    expect(result).toBe(2085);
  });
});

import { readFile } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import { getSeatId, decodeRow, decodeSeat, findEmptySeat } from "./5";

describe("5", () => {
  let inputs: string[];

  beforeEach(async () => {
    inputs = [""];
  });

  describe("decodeRow", () => {
    // logger.level = "debug";
    test.each([
      ["FFFFFFF", 0],
      ["FFFFFFB", 1],
      ["BBBBBBB", 127],
      ["BBBBBBF", 126],
      ["FBFBBFF", 44],
      ["BFFFBBF", 70],
      ["FFFBBBF", 14],
      ["BBFFBBF", 102],
    ])("should calc %s to %d", (s, expected) => {
      expect(decodeRow(s)).toBe(expected);
    });
  });

  describe("decodeSeat", () => {
    // logger.level = "debug";
    test.each([
      ["RLR", 5],
      ["RRR", 7],
      ["RLL", 4],
    ])("should calc %s to %d", (s, expected) => {
      expect(decodeSeat(s)).toBe(expected);
    });
  });

  describe("decodeBoardingPass", () => {
    // logger.level = "debug";
    test.each([
      ["FBFBBFFRLR", 357],
      ["BFFFBBFRRR", 567],
      ["FFFBBBFRRR", 119],
      ["BBFFBBFRLL", 820],
    ])("should calc %s to %d", (s, expected) => {
      expect(getSeatId(s)).toBe(expected);
    });
  });

  describe("Run", () => {
    let input: string;
    let lines: string[];

    beforeEach(async () => {
      input = await readFile("input.txt");
      lines = removeEmptyLines(splitOnNewline(input));
    });

    it("Star 1", async () => {
      const seatIds = lines.map(getSeatId);
      const maxId = seatIds.reduce((prev, curr) => Math.max(prev, curr), 0);
      logger.info("Star1: Highest seat id", maxId);
      expect(maxId).toBe(828);
    });

    it("Star 2", async () => {
      const mySeat = findEmptySeat(lines);
      logger.info("Star2: Empty seat id", mySeat);
      expect(mySeat).toBe(565);
    });
  });
});

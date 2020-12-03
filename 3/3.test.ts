import { readFile } from "util/file";
import logger from "util/logger";
import { splitOnNewline, removeEmptyLines } from "util/string";
import { traverseMap } from "./3";

describe("3", () => {
  let inputs: string[];
  beforeEach(async () => {
    inputs = [
      "..##.......",
      "#...#...#..",
      ".#....#..#.",
      "..#.#...#.#",
      ".#...##..#.",
      "..#.##.....",
      ".#.#.#....#",
      ".#........#",
      "#.##...#...",
      "#...##....#",
      ".#..#...#.#",
    ];
  });

  describe("traverseMap", () => {
    it("should return 7", () => {
      expect(traverseMap(3, 1, inputs)).toBe(7);
    });

    it("should return 2", () => {
      expect(traverseMap(1, 1, inputs)).toBe(2);
    });

    it("should return 3", () => {
      expect(traverseMap(5, 1, inputs)).toBe(3);
    });

    it("should return 4", () => {
      expect(traverseMap(7, 1, inputs)).toBe(4);
    });

    it("should return 2", () => {
      expect(traverseMap(1, 2, inputs)).toBe(2);
    });

    it("mupltiply", () => {
      const results = [
        traverseMap(1, 1, inputs),
        traverseMap(3, 1, inputs),
        traverseMap(5, 1, inputs),
        traverseMap(7, 1, inputs),
        traverseMap(1, 2, inputs),
      ];
      const product = results.reduce((total, result) => {
        return total * result;
      }, 1);
      expect(product).toBe(336)
    });
  });

  describe("Run", () => {
    let lines: string[];

    beforeEach(async () => {
      const res = await readFile("input.txt");
      lines = removeEmptyLines(splitOnNewline(res));
    });

    it("Star 1", async () => {
      const result = traverseMap(3, 1, lines);
      logger.info("Star1: Trees encountered", result);
      expect(result).toBe(237);
    });

    it("Star 2", async () => {
      const results = [
        traverseMap(1, 1, lines),
        traverseMap(3, 1, lines),
        traverseMap(5, 1, lines),
        traverseMap(7, 1, lines),
        traverseMap(1, 2, lines),
      ];
      logger.info("results", results);
      const product = results.reduce((total, result) => {
        return total * result;
      }, 1);
      logger.info("Star2: result multiplied");
      expect(product).toBe(2106818610);
    });
  });
});

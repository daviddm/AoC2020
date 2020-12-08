import { readFile, readFileBetter } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import { generateMutations, runInstructions } from "./8";

describe("5", () => {
  let raw: string;
  let lines: string[];

  beforeEach(async () => {
    raw = await readFileBetter("input.test.txt");
    lines = splitOnNewline(raw);
  });

  it("should return 5", () => {
    expect(runInstructions(lines)).toBe(5);
  });
  describe("mutating", () => {
    it("should return 8", () => {
      let result = -1;
      const iterator = generateMutations(lines);
      let current = iterator.next();
      while (!current.done) {
        try {
          result = runInstructions(current.value, true) || -2;
          break;
        } catch (err) {
          current = iterator.next();
        }
      }
      expect(result).toBe(8);
    });
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
    const result = runInstructions(lines);
    logger.info("Star1: ", result);
    expect(runInstructions(lines)).toBe(1766);
  });

  it("Star 2", async () => {
    let result = -1;
    const iterator = generateMutations(lines);
    let current = iterator.next();
    while (!current.done) {
      try {
        result = runInstructions(current.value, true) || -2;
        break;
      } catch (err) {
        current = iterator.next();
      }
    }
    logger.info("Star2: ", result);
    expect(result).toBe(1639);
  });
});

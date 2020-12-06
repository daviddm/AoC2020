import { readFile } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import { distinctAnswers, unisonAnswers } from "./6";

describe("5", () => {
  let raw: string;
  let inputs: string[];

  beforeEach(async () => {
    raw = `abc

a
b
c

ab
ac

a
a
a
a

b`;
    inputs = [""];
  });

  describe("distinctAnswers", () => {
    it("should return 11", () => {
      expect(distinctAnswers(raw)).toBe(11);
    });
  });

  describe("unisonAnswers", () => {
    it("should return 6", () => {
      expect(unisonAnswers(raw)).toBe(6);
    });
  });

  describe("Run", () => {
    let input: string;

    beforeEach(async () => {
      input = (await readFile("input.txt")).replace(/\n$/, "");
    });

    it("Star 1", async () => {
      const anwsers = distinctAnswers(input);
      logger.info("Star1: answers", anwsers);
      expect(anwsers).toBe(6714);
    });

    it("Star 2", async () => {
      const anwsers = unisonAnswers(input);
      logger.info("Star2: anwsers", anwsers);
      expect(anwsers).toBe(3435);
    });
  });
});

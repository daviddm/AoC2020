import { readFile } from "util/file";
import logger from "util/logger";
import { splitOnNewline } from "util/string";
import { sledRentalValidator, tobogganValidator, validatePasswords } from "./2";

describe("2", () => {
  let inputs: string[];
  beforeEach(async () => {
    inputs = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
  });

  describe("isPasswordsAllowed", () => {
    test.each([
      ["should return 1 '1-3 a: abcde'", "1-3 a: abcde", 1],
      ["should return 0 '1-3 b: cdefg'", "1-3 b: cdefg", 0],
      ["should return 0 '2-9 c: ccccccccc'", "2-9 c: ccccccccc", 1],
      [
        "should return 0 for '18-19 m: mmmmmmmmmmmmmmmmmmm'",
        "18-19 m: mmmmmmmmmmmmmmmmmmm",
        1,
      ],
      [
        "should return 1 '7-10 m: xmxmmwtmmmnvcrmkrmmm",
        "7-10 m: xmxmmwtmmmnvcrmkrmmm",
        1,
      ],
    ])("%s", (desc, input, expected) => {
      expect(validatePasswords([input], sledRentalValidator)).toBe(expected);
    });

    it("shoud return 2", () => {
      expect(validatePasswords(inputs, sledRentalValidator)).toBe(2);
    });
  });

  describe("isPasswordsAllowedToboggan", () => {
    test.each([
      ["should return 1 '1-3 a: abcde'", "1-3 a: abcde", 1],
      ["should return 0 '1-3 b: cdefg'", "1-3 b: cdefg", 0],
      ["should return 0 '2-9 c: ccccccccc'", "2-9 c: ccccccccc", 0],
      [
        "should return 0 for '18-19 m: mmmmmmmmmmmmmmmmmmm'",
        "18-19 m: mmmmmmmmmmmmmmmmmmm",
        0,
      ],
      [
        "should return 1 '7-10 m: xmxmmwtmmmnvcrmkrmmm",
        "7-10 m: xmxmmwtmmmnvcrmkrmmm",
        1,
      ],
      ["should return 0 '2-14 q: qqqqqqqqqqqdqj'", "2-14 q: qqqqqqqqqqqdqj", 1],
      ["should allow '1-3 a: abcde'", "1-3 a: abcde", 1],
    ])("%s", (desc, input, expected) => {
      expect(validatePasswords([input], tobogganValidator)).toBe(expected);
    });

    it("shoud return 2", () => {
      expect(validatePasswords(inputs, tobogganValidator)).toBe(1);
    });
  });

  describe("Run", () => {
    let lines: string[];

    beforeEach(async () => {
      const res = await readFile("input.txt");
      lines = splitOnNewline(res);
    });

    it("Star 1", async () => {
      const result = validatePasswords(lines, sledRentalValidator);

      logger.info("Star1: allowed password", result);
      expect(result).toBe(643);
    });

    it("Star 2", async () => {
      const result = validatePasswords(lines, tobogganValidator);

      logger.info("Star2: allowed password", result);
      expect(result).toBe(388);
    });
  });
});

import { readFile, readFileBetter } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import { findContiguous, findFirstNonValidPreamble, sumOfContiguous } from "./9";

describe("5", () => {
  let raw: string;
  let lines: number[];

  beforeEach(async () => {
    raw = await readFileBetter("input.test.txt");
    lines = splitOnNewline(raw).map((l) => +l);
  });

  it("1", () => {
    expect(findFirstNonValidPreamble(5, lines)).toBeTruthy();
  });

  it("2", () => {
    const arr = findContiguous(127, lines);
    const result = sumOfContiguous(arr);
    expect(arr).toEqual([15, 25, 47, 40]);
    expect(result).toBe(62);
  });
  it("2b", async () => {
    raw = await readFileBetter("input.test2.txt");
    lines = splitOnNewline(raw).map((l) => +l);
    const arr = findContiguous(127, lines);
    const result = sumOfContiguous(arr);
    expect(arr).toEqual([40, 47, 40]);
  });
});

describe("Run", () => {
  let raw: string;
  let lines: number[];

  beforeEach(async () => {
    raw = await readFileBetter("input.txt");
    lines = splitOnNewline(raw).map((l) => +l);
  });

  it("Star 1", async () => {
    const result = findFirstNonValidPreamble(25, lines);
    logger.info("Star1: ", result);
    expect(result).toBe(466456641);
  });

  it("Star 2", async () => {
    const result = sumOfContiguous(findContiguous(466456641, lines));
    logger.info("Star2: ", result);
    expect(result).toBe(55732936);
  });
});

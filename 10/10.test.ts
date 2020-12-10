import { readFile, readFileBetter } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import { calcAdapters, calcArrangements, calcJoltageDifferences, sortAdapters } from "./10";

describe("10", () => {
  let raw: string;
  let lines1: number[];
  let lines2: number[];

  beforeEach(async () => {
    raw = await readFileBetter("input.test.txt");
    lines1 = sortAdapters(splitOnNewline(raw).map((l) => +l));
    raw = await readFileBetter("input.test2.txt");
    lines2 = sortAdapters(splitOnNewline(raw).map((l) => +l));
  });

  it("1a", () => {
    const diffs = calcAdapters(lines1);
    const result = calcJoltageDifferences(diffs);
    expect(result).toBe(35);
  });
  it("1b", async () => {
    const diffs = calcAdapters(lines2);
    const result = calcJoltageDifferences(diffs);
    expect(result).toBe(220);
  });
  it("2a", async () => {
    const result = calcArrangements(lines1);
    expect(result).toBe(8);
  });
  it("2b", async () => {
    const result = calcArrangements(lines2);
    expect(result).toBe(19208);
  });
});

describe("Run", () => {
  let raw: string;
  let lines: number[];

  beforeEach(async () => {
    raw = await readFileBetter("input.txt");
    lines = sortAdapters(splitOnNewline(raw).map((l) => +l));
  });

  it("Star 1", async () => {
    const diffs = calcAdapters(lines);
    const result = calcJoltageDifferences(diffs);
    logger.info("Star1: ", result);
    expect(result).toBe(1917);
  });

  it("Star 2", async () => {
    const result = calcArrangements(lines);
    logger.info("Star2: ", result);
    expect(result).toBe(113387824750592);
  });
});

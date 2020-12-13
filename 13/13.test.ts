import { readFile, readFileBetter } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import { findBus, matchBuses } from "./13";

describe("13", () => {
  let raw: string;
  let lines: string[];

  beforeEach(async () => {
    raw = await readFileBetter("input.test.txt");
    lines = splitOnNewline(raw);
  });

  describe("doInstruction", () => {});

  describe("Test", () => {
    let timestamp: number;
    let buses: string[];
    beforeEach(async () => {
      timestamp = +lines[0];
      buses = lines[1].split(",");
    });
    it("1", () => {
      const result = findBus(timestamp, buses);
      expect(result).toBe(295);
    });
    describe("2", () => {
      it("2a", () => {
        const result = matchBuses(buses);
        expect(result).toBe(1068781);
      });
      it("2b", () => {
        buses = "17,x,13,19".split(",");
        const result = matchBuses(buses);
        expect(result).toBe(3417);
      });
      it("2c", () => {
        buses = "67,7,59,61".split(",");
        const result = matchBuses(buses);
        expect(result).toBe(754018);
      });
      it("2d", () => {
        buses = "67,x,7,59,61".split(",");
        const result = matchBuses(buses);
        expect(result).toBe(779210);
      });
      it("2e", () => {
        buses = "67,7,x,59,61".split(",");
        const result = matchBuses(buses);
        expect(result).toBe(1261476);
      });
      it("2f", () => {
        buses = "1789,37,47,1889".split(",");
        const result = matchBuses(buses);
        expect(result).toBe(1202161486);
      });
    });
  });
});

describe("Run", () => {
  let raw: string;
  let lines: string[];
  let timestamp: number;
  let buses: string[];

  beforeEach(async () => {
    raw = await readFileBetter("input.txt");
    lines = splitOnNewline(raw);
    timestamp = +lines[0];
    buses = lines[1].split(",");
  });

  it("Star 1", async () => {
    const result = findBus(timestamp, buses);
    logger.info("Star1: ", result);
    expect(result).toBe(115);
  });

  it("Star 2", async () => {
    const result = matchBuses(buses);
    logger.info("Star2: ", result);
    expect(result).toBe(756261495958122);
  });
});

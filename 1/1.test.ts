import { readFile } from "util/file";
import logger from "util/logger";
import { splitOnNewline } from "util/string";
import { findPartsOfSum } from "./1";

describe("1", () => {
  let inputs: number[];
  beforeEach(async () => {
    inputs = [1721, 979, 366, 299, 675, 1456];
  });

  describe("findPartsOfSum", () => {
    it("should find 1721 and 299", () => {
      expect(
        findPartsOfSum({
          sumToFind: 2020,
          parts: inputs,
          numberOfPartsToUse: 2,
        })
      ).toEqual(expect.arrayContaining([1721, 299]));
    });
    it("979, 366, and 675", () => {
      expect(findPartsOfSum({
        sumToFind: 2020,
        parts: inputs,
        numberOfPartsToUse: 3,
      })).toEqual(
        expect.arrayContaining([979, 366, 675])
      );
    });
  });

  describe("Run", () => {
    let lines: number[];

    beforeEach(async () => {
      const res = await readFile("input.txt");
      lines = splitOnNewline(res).map((line) => +line);
    });

    it("Star 1", async () => {
      const parts = findPartsOfSum({
        sumToFind: 2020,
        parts: lines,
        numberOfPartsToUse: 2,
      });

      const result = parts?.reduce((product, current) => {
        return product * current;
      }, 1);

      logger.info("Result: product of parts", result);
    });

    it("Star 2", async () => {
      const parts = findPartsOfSum({
        sumToFind: 2020,
        parts: lines,
        numberOfPartsToUse: 3,
      });

      const result = parts?.reduce((product, current) => {
        return product * current;
      }, 1);
      logger.info("Result: product of parts", result);
    });
  });
});

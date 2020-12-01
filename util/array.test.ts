import {
  getItemsFromArray,
  combinations,
  combinationsGenerator,
} from "./array";

describe("Array", () => {
  let inputs: number[];
  beforeEach(async () => {
    inputs = [1721, 979, 366, 299, 675, 1456];
  });
  describe("getItemsFromArray", () => {
    it("should return 2 first items", () => {
      expect(
        getItemsFromArray({ arr: inputs, items: 2, startIndex: 0 })
      ).toEqual(expect.arrayContaining([1721, 979]));
    });
    it("should return 2 last items", () => {
      expect(
        getItemsFromArray({ arr: inputs, items: 2, startIndex: 4 })
      ).toEqual(expect.arrayContaining([675, 1456]));
    });
    it("should return 1 last items when item count is outside of array", () => {
      expect(
        getItemsFromArray({ arr: inputs, items: 2, startIndex: 5 })
      ).toEqual(expect.arrayContaining([1456]));
    });
  });

  describe("permutation", () => {
    it("should return [[1]]", () => {
      expect(combinations([1], 1)).toEqual(expect.arrayContaining([[1]]));
    });
    it("should return [[1],[2]]", () => {
      expect(combinations([1, 2], 1)).toEqual(
        expect.arrayContaining([[1], [2]])
      );
    });
    it("should return [[1,2],[1,3],[2,3]]", () => {
      expect(combinations([1, 2, 3], 2)).toEqual(
        expect.arrayContaining([
          [1, 2],
          [1, 3],
          [2, 3],
        ])
      );
    });
  });

  describe("permutationsGenerator", () => {
    it("should yield [1]", () => {
      expect(combinationsGenerator([1], 1).next().value).toEqual(
        expect.arrayContaining([1])
        );
      });
      it("should yield [1], [2]", () => {
        const gen = combinationsGenerator([1, 2], 1);
        expect(gen.next().value).toEqual(expect.arrayContaining([1]));
        expect(gen.next().value).toEqual(expect.arrayContaining([2]));
    });
    it("should yield [1, 2], undefined", () => {
      const gen = combinationsGenerator([1, 2], 2);
      expect(gen.next().value).toEqual(expect.arrayContaining([1, 2]));
      expect(gen.next().value).toBeUndefined();
    });
    it("should yield [1, 2], [1, 3], [2, 3]", () => {
      const gen = combinationsGenerator([1, 2, 3], 2);
      expect(gen.next().value).toEqual(expect.arrayContaining([1, 2]));
      expect(gen.next().value).toEqual(expect.arrayContaining([1, 3]));
      expect(gen.next().value).toEqual(expect.arrayContaining([2, 3]));
    });
  });
});

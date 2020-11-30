import { splitOnNewline } from "./string";

describe("String", () => {

  describe("splitOnNewline", () => {

    let s: string;

    beforeEach(async () => {
      s = "abc\n123";
    });

    it("should return list of 2 elements", () => {
      expect(splitOnNewline(s).length).toBe(2);
    });

    it("should return skip last element", () => {
      s += "\n321";
      expect(splitOnNewline(s, { skipLast: true }).length).toBe(2);
    });

    it("should return skip first element", () => {
      expect(splitOnNewline(s, { skipFirst: true }).length).toBe(1);
    });

  });

});

import { readFile } from "util/file";
import logger from "util/logger";
import {
  createPassportFromString,
  hasValidFields,
  isValidPassportKeys,
  parsePassportFile,
} from "./4";

describe("4", () => {
  let inputs: string[];
  let raw: string;

  beforeEach(async () => {
    inputs = [""];
    raw = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;
  });

  describe("traverseMap", () => {
    let valid: {};
    beforeEach(async () => {
      valid = {
        ecl: "gry",
        pid: "860033327",
        eyr: 2020,
        hcl: "#fffffd",
        byr: 1937,
        iyr: 2017,
        cid: "147",
        hgt: "183cm",
      };
    });

    it("should return 4 passports", () => {
      let passports = parsePassportFile(raw)
      expect(passports.length).toBe(4);
    });

    it("should return a passport", () => {
      const p =
        "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm";
      expect(createPassportFromString(p)).toEqual(
        expect.objectContaining({
          ecl: "gry",
          pid: "860033327",
          eyr: 2020,
          hcl: "#fffffd",
          byr: 1937,
          iyr: 2017,
          cid: "147",
          hgt: "183cm",
        })
      );
    });

    it("should return true for valid passport", () => {
      const p = {
        ecl: "gry",
        pid: "860033327",
        eyr: 2020,
        hcl: "#fffffd",
        byr: 1937,
        iyr: 2017,
        cid: "147",
        hgt: "183cm",
      };
      expect(isValidPassportKeys(p)).toBeTruthy();
    });

    it("should return false for valid passport", () => {
      const p = {
        ecl: "gry",
        pid: "860033327",
        eyr: "2020",
        hcl: "#fffffd",
        byr: "1937",
        iyr: "2017",
        cid: "147",
      };
      expect(isValidPassportKeys(p)).toBeFalsy();
    });

    it("should return as valid fields", () => {
      const s = createPassportFromString(
        "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f"
      );
      expect(hasValidFields(s)).toBeTruthy();
    });
    it("should return as valid fields", () => {
      const s = createPassportFromString(
        "eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm"
      );
      expect(hasValidFields(s)).toBeTruthy();
    });
    it("should return as valid fields", () => {
      const s = createPassportFromString(
        "hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022"
      );
      expect(hasValidFields(s)).toBeTruthy();
    });
    it("should return as valid fields", () => {
      const s = createPassportFromString(
        "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
      );
      expect(hasValidFields(s)).toBeTruthy();
    });

    it("should return as invalid fields", () => {
      const s = createPassportFromString(
        "eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926"
      );
      expect(hasValidFields(s)).toBeFalsy();
    });
    it("should return as invalid fields", () => {
      const s = createPassportFromString(
        "iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946"
      );
      expect(hasValidFields(s)).toBeFalsy();
    });
    it("should return as invalid fields", () => {
      const s = createPassportFromString(
        "hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277"
      );
      expect(hasValidFields(s)).toBeFalsy();
    });
    it("should return as invalid fields", () => {
      const s = createPassportFromString(
        "hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007"
      );
      expect(hasValidFields(s)).toBeFalsy();
    });

    test.each([
      [true, { byr: 1920 }],
      [false, { byr: 1919 }],
      [true, { byr: 2002 }],
      [false, { byr: 2003 }],
      [true, { iyr: 2010 }],
      [false, { iyr: 2009 }],
      [true, { iyr: 2020 }],
      [false, { iyr: 2021 }],
      [true, { eyr: 2020 }],
      [false, { eyr: 2019 }],
      [true, { eyr: 2030 }],
      [false, { eyr: 2031 }],
      [true, { hgt: "150cm" }],
      [false, { hgt: "149cm" }],
      [true, { hgt: "193cm" }],
      [false, { hgt: "194cm" }],
      [true, { hgt: "59in" }],
      [false, { hgt: "58in" }],
      [true, { hgt: "76in" }],
      [false, { hgt: "77in" }],
      [false, { ecl: "abc" }],
      [true, { pid: '000000001' }],
      [false, { pid: '0000000001' }],
    ])(`should return %s for %s`, (expected, extra) => {
      const passport = { ...valid, ...extra };
      expect(hasValidFields(passport)).toBe(expected);
    });
  });

  describe("Run", () => {
    let input: string;

    beforeEach(async () => {
      input = await readFile("input.txt");
    });

    it("Star 1", async () => {
      const validPassports = parsePassportFile(input)
        .map((l) => createPassportFromString(l))
        .filter((p) => isValidPassportKeys(p));
      logger.info("Star1: Valid passports", validPassports.length);
      expect(validPassports.length).toBe(228);
    });

    it("Star 2", async () => {
      const validPassports = parsePassportFile(input)
        .map((l) => createPassportFromString(l))
        .filter((p) => isValidPassportKeys(p))
        .filter((p) => hasValidFields(p));
      logger.info("Star2: Valid passports", validPassports.length);
      expect(validPassports.length).toBe(175);
    });
  });
});

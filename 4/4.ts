import Joi from "joi";

export const parsePassportFile = (file: string): string[] => {
  return file.split("\n\n").map((p) => p.replace(/\n/g, " "));
}

const mustBePresentKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export const isValidPassportKeys = (passport: {}): boolean => {
  const keys = Object.keys(passport);
  return mustBePresentKeys.every((k) => keys.includes(k));
};

export const createPassportFromString = (s: string): {} => {
  return s.split(" ").reduce((o, p) => {
    const [key, value] = p.split(":");
    if(key === '') {
      return o
    }
    if (["byr", "iyr", "eyr"].includes(key)) {
      o[key] = +value;
    } else {
      o[key] = value;
    }
    return o;
  }, {} as { [k: string]: string | number });
};

const validation = Joi.object().keys({
  byr: Joi.number().min(1920).max(2002).required(),
  iyr: Joi.number().min(2010).max(2020).required(),
  eyr: Joi.number().min(2020).max(2030).required(),
  hgt: [
    Joi.string()
      .regex(/^[0-9]*cm$/)
      .required()
      .custom((value: string, helper: any) => {
        const n = +value.replace("cm", "");

        if (n >= 150 && n <= 193) {
          return true;
        }
        return helper.message("Wrong height");
      }),
    Joi.string()
      .regex(/^[0-9]*in$/)
      .required()
      .custom((value: string, helper: any) => {
        const n = +value.replace("in", "");

        if (n >= 59 && n <= 76) {
          return true;
        }
        return helper.message("Wrong height");
      }),
  ],
  hcl: Joi.string()
    .regex(/^\#[0-9a-f]{6}$/)
    .required(),
  ecl: Joi.string()
    .valid("amb", "blu", "brn", "gry", "grn", "hzl", "oth")
    .required(),
  pid: Joi.string()
    .regex(/^[0-9]{9}$/)
    .required(),
  cid: Joi.string(),
});

export const hasValidFields = (passport: {}): boolean => {
  const { error } = validation.validate(passport);
  return error === undefined;
};

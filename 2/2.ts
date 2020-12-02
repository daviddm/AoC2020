type PasswordValidatorParams = {
  fullPolicy: string;
  countLow: number;
  countHigh: number;
  char: string;
  passwordString: string;
};
type PasswordValidator = (params: PasswordValidatorParams) => boolean;

const regex = RegExp(/^(\d*)-(\d*)\s(\w):\s(\w*)$/);

export const validatePasswords = (
  passwords: string[],
  validator: PasswordValidator
): number => {
  return passwords.reduce((count, password) => {
    const matches = password.match(regex);
    if (!matches) {
      return count;
    }
    const [fullPolicy, countLow, countHigh, char, passwordString] = matches;

    return validator({
      fullPolicy,
      countLow: +countLow,
      countHigh: +countHigh,
      char,
      passwordString,
    })
      ? count + 1
      : count;
  }, 0);
};

export const sledRentalValidator: PasswordValidator = (params) => {
  const { char, passwordString, countLow, countHigh } = params;
  const passwordPolicy = RegExp(`${char}`, "g");
  const passwordCharCount = passwordString.match(passwordPolicy)?.length;
  return (
    !!passwordCharCount &&
    passwordCharCount >= countLow &&
    passwordCharCount <= countHigh
  );
};

export const tobogganValidator: PasswordValidator = (params) => {
  const { passwordString, countHigh, countLow, char } = params;
  return (
    (passwordString[countLow - 1] === char) !=
    (passwordString[countHigh - 1] === char)
  );
};

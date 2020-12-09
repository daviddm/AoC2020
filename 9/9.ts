import R from "ramda";

type Complement = {
  [key: string]: boolean;
};

const isPreambleValid = (check: number, preamble: number[]): boolean => {
  const comp = preamble.reduce((r, a) => {
    const c = check - a;
    r[c] = true;
    return r;
  }, {} as Complement);

  return preamble.some((a) => comp[a]);
};

export const findFirstNonValidPreamble = (
  preambleLength: number,
  list: number[]
): number => {
  for (let i = preambleLength; i < list.length; i++) {
    const arr = list.slice(i - preambleLength, i);
    const valid = isPreambleValid(list[i], arr);
    if (!valid) {
      return list[i];
    }
  }

  return -1;
};

export const findContiguous = (goal: number, list: number[]): number[] => {
  for (let i = 0; i < list.length; i++) {
    let j = i;
    let sum = 0;
    while (true) {
      sum += list[j];
      if (j >= list.length) {
        break;
      }
      if (sum >= goal) {
        break;
      }
      j++;
    }
    if (sum == goal) {
      return list.slice(i, j + 1);
    }
  }

  return [-1];
};

export const sumOfContiguous = (list: number[]): number =>
  Math.min(...list) + Math.max(...list);

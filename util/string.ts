type splitOnNewlineOptions = {
  skipFirst?: boolean;
  skipLast?: boolean;
};
export const splitOnNewline = (
  s: string,
  options?: splitOnNewlineOptions
): string[] => {
  let res = s.split("\n");

  if (options?.skipLast) {
    res.shift()
  }

  if (options?.skipFirst) {
    res.pop()
  }

  return res;
};

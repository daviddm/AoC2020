type splitOnNewlineOptions = {
  skipFirst?: boolean;
  skipLast?: boolean;
};
export const splitOnNewline = (
  s: string,
  options?: splitOnNewlineOptions
): string[] => {
  let res = s.split(/\r?\n/);

  if (options?.skipLast) {
    res.shift();
  }

  if (options?.skipFirst) {
    res.pop();
  }

  return res;
};

export const removeEmptyLines = (lines: any[]) =>
  lines.filter((line) => line !== "");

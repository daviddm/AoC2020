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

// export const splitOnBlankLine = (s: string): string[] => {
//   const lines = s.split(/(\r?\n){2}/).filter(l => l != '\n');

//   // Many files is save with empty last line. This trims that.
//   lines[lines.length - 1] = lines[lines.length - 1].replace(/\r?\n$/, "");

//   return lines;
// };

export const removeEmptyLines = (lines: any[]) =>
  lines.filter((line) => line !== "");

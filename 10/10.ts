type Diffs = {
  [key: number]: number;
  1: number;
  2: number;
  3: number;
};

export const sortAdapters = (adapters: number[]) =>
  adapters.sort((a, b) => a - b);

export const calcAdapters = (adapters: number[]) => {
  const diffs = adapters.reduce(
    (diffs, _, i, jolts) => {
      let low: number;
      if (i === 0) {
        low = 0;
      } else {
        low = jolts[i - 1];
      }
      const diff = jolts[i] - low;
      diffs[diff]++;
      return diffs;
    },
    { 1: 0, 2: 0, 3: 1 } as Diffs
  );

  return diffs;
};

export const calcJoltageDifferences = (diffs: Diffs): number => {
  return diffs[1] * diffs[3];
};

export const calcArrangements = (adaptersRaw: number[]): number => {
  const maxStep = 3;
  const phoneJolt = adaptersRaw[adaptersRaw.length - 1] + maxStep;

  const adapters = [0, ...adaptersRaw, phoneJolt].reverse();
  const steps = Object.fromEntries(adapters.map((j) => [j, 0]));

  steps[phoneJolt] = 1;

  adapters.forEach((adapter, i) => {
    steps[adapter] += adapters
      .filter((step) => step > adapter && step - adapter <= maxStep)
      .reduce((total, step) => total + steps[step], 0);
  });

  return steps[0];
};

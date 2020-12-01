import R from "ramda";

type GetItemsFromArrayParams<T> = {
  arr: T[];
  items: number;
  startIndex: number;
};
export const getItemsFromArray = <T>(
  params: GetItemsFromArrayParams<T>
): T[] => {
  const { arr, items, startIndex } = params;
  return arr.slice(startIndex, startIndex + items);
};

export const combinations = <T>(tokens: T[], n: number): (T | undefined)[][] =>
  n == 0
    ? [[]]
    : R.isEmpty(tokens)
    ? []
    : R.concat(
        R.map(R.prepend(R.head(tokens)), combinations(R.tail(tokens), n - 1)),
        combinations(R.tail(tokens), n)
      );

export function* combinationsGenerator<T>(
  tokens: T[],
  n: number,
  index = 0
): Generator<T[], void, unknown> {
  if (n <= 0 || index + n > tokens.length) {
    return;
  }
  for (let a = index; a < tokens.length; a++) {
    const gen = combinationsGenerator(tokens, n - 1, a + 1);
    while (true) {
      const next = gen.next();
      if (next.done) {
        if(n === 1) {
          yield [tokens[a]];
        }
        break;
      }
      yield [tokens[a], ...next.value];
    }
  }
}

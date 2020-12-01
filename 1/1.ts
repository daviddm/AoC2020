import R from "ramda";
import { combinationsGenerator } from "util/array";

type FindPartsOfSumParams = {
  sumToFind: number;
  parts: number[];
  numberOfPartsToUse: number;
};
export const findPartsOfSum = (params: FindPartsOfSumParams) => {
  const { numberOfPartsToUse, parts, sumToFind } = params;

  const it = combinationsGenerator(parts, numberOfPartsToUse);

  let result = it.next();
  while (!result.done) {
    if (R.sum(result.value) === sumToFind) {
      return result.value;
    }
    result = it.next();
  }
};

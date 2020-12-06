import R from "ramda";

export const distinctAnswers = (s: string) => {
  const list = s.split(/\n\n/g).map((l) => l.replace(/\n/g, ""));
  return list.reduce((total, group) => {
    const unique = new Set();
    group.split("").forEach((answer) => unique.add(answer));
    return total + unique.size;
  }, 0);
};

export const unisonAnswers = (s: string) => {
  const list = s.split(/\n\n/g).map((l) => l.split(/\n/g));

  return list.reduce((sum, group) => {
    let intersection = group[0].split("");
    group.every((person) => {
      intersection = R.intersection(intersection, person.split(""));
      if (intersection.length === 0) {
        return false;
      }
      return true;
    });
    return sum + intersection.length;
  }, 0);
};

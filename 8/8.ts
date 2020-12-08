enum Instructions {
  Accumulator = "acc",
  Jump = "jmp",
  NoOperation = "nop",
}

type Instruction = {
  type: string;
  value: number;
};

const lineParseRegexp = /(\w+)\s+([\+\-\d]+)/;

const parseLine = (line: string): Instruction | undefined => {
  const matches = line.match(lineParseRegexp);
  if (matches) {
    return { type: matches[1], value: +matches[2] };
  }
};

type Visited = { [key: string]: boolean };

export const runInstructions = (list: string[], throwOnLoop = false) => {
  const visited: Visited = {};
  let line = 0;
  let total = 0;

  const listOfInstructions = list.map((l) => parseLine(l));
  const length = list.length;

  while (line < length) {
    if (visited[line]) {
      if (throwOnLoop) {
        throw new Error("Fuck");
      }
      break;
    }

    visited[line] = true;
    const instruction = listOfInstructions[line];

    if (!instruction) {
      throw new Error("Unexpected empty instruction");
    }

    if (instruction.type === Instructions.Accumulator) {
      total += instruction.value;
    } else if (instruction.type === Instructions.Jump) {
      line += instruction.value - 1;
    }

    line++;
  }
  return total;
};

const JumpRegexp = /^jmp/;
const NoOpRegexp = /^nop/;

export function* generateMutations(list: string[]) {
  let i = 0;
  while (true) {
    const temp = [...list];

    if (temp[i].match(JumpRegexp)) {
      temp.splice(i, 1, temp[i].replace(JumpRegexp, "nop"));
    } else if (temp[i].match(NoOpRegexp)) {
      temp.splice(i, 1, temp[i].replace(NoOpRegexp, "jmp"));
    }

    yield temp;
    i++;
  }
}

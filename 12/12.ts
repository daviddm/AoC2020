import R from "ramda";

export enum Direction {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}
const DirectionComposite: { [key in Direction]: Position } = {
  [Direction.North]: { x: 0, y: 1 },
  [Direction.East]: { x: 1, y: 0 },
  [Direction.South]: { x: 0, y: -1 },
  [Direction.West]: { x: -1, y: 0 },
};

export enum Turn {
  Right = "R",
  Left = "L",
}
export enum Speed {
  Forward = "F",
}
type Action = Direction | Turn | Speed;

export type Position = { x: number; y: number };
export type Boat = {
  facing: Direction;
  position: Position;
};

export type Instruction = {
  action: Action;
  value: number;
};

const instructionRegexp = /^(\w)(\d*)$/;
export const parseInstructions = (lines: string[]): Instruction[] => {
  return lines.map((line, i) => {
    const match = line.match(instructionRegexp);
    if (!match) {
      throw new Error(`Could not parse line ${i}: "${line}"`);
    }
    const [_, action, value] = match;
    return { action, value: +value } as Instruction;
  });
};

export const run = (
  instructions: Instruction[],
  boat: Boat,
  waypoint?: Position
) => {
  instructions.forEach((instruction) => {
    doInstruction(boat, instruction, waypoint);
  });

  const { x, y } = boat.position;
  return Math.abs(x) + Math.abs(y);
};

export const doInstruction = (
  boat: Boat,
  instruction: Instruction,
  waypoint?: Position
) => {
  switch (instruction.action) {
    case Speed.Forward: {
      goDirection(
        boat.position,
        waypoint || DirectionComposite[boat.facing],
        instruction.value
      );
      break;
    }
    case Direction.North:
    case Direction.East:
    case Direction.South:
    case Direction.West: {
      goDirection(
        waypoint || boat.position,
        DirectionComposite[instruction.action],
        instruction.value
      );
      break;
    }
    case Turn.Right:
    case Turn.Left: {
      if (waypoint) {
        turnWaypoint(waypoint, instruction.action, instruction.value);
      } else {
        const w = R.clone(DirectionComposite[boat.facing]);
        turnWaypoint(w, instruction.action, instruction.value);

        const [facing] = Object.entries(DirectionComposite).find(([_, dir]) =>
          R.equals(dir, w)
        ) || [boat.facing];
        boat.facing = facing as Direction;
      }
      break;
    }
  }
};

const turnWaypoint = (waypoint: Position, turn: Turn, degrees: number) => {
  const turnHeading = turn === Turn.Left ? { x: -1, y: 1 } : { x: 1, y: -1 };
  const turns = degrees / 90;
  for (let i = 0; i < turns; i++) {
    const tempWaypoint = { x: 0, y: 0 };
    tempWaypoint.x = waypoint.y * turnHeading.x;
    tempWaypoint.y = waypoint.x * turnHeading.y;
    waypoint.x = tempWaypoint.x || 0;
    waypoint.y = tempWaypoint.y || 0;
  }
};

const goDirection = (
  position: Position,
  direction: Position,
  value: number
) => {
  position.x += direction.x * value;
  position.y += direction.y * value;
};

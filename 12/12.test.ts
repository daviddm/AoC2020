import { WatchDirectoryKind } from "typescript";
import { readFile, readFileBetter } from "util/file";
import logger from "util/logger";
import { removeEmptyLines, splitOnNewline } from "util/string";
import {
  parseInstructions,
  run,
  Boat,
  Instruction,
  Direction,
  doInstruction,
  Speed,
  Turn,
  Position,
} from "./12";

describe("12", () => {
  let raw: string;
  let lines: string[];

  beforeEach(async () => {
    raw = await readFileBetter("input.test.txt");
    lines = splitOnNewline(raw);
  });

  describe("doInstruction", () => {
    let boat: Boat;
    let instruction: Instruction;
    beforeEach(async () => {
      boat = {
        facing: Direction.East,
        position: { x: 0, y: 0 },
      };
    });
    describe("10 forward", () => {
      instruction = { action: Speed.Forward, value: 10 };

      it("should go 10 east", () => {
        doInstruction(boat, instruction);
        expect(boat.position).toEqual({ x: 10, y: 0 });
      });
      it("should go 10 north", () => {
        boat.facing = Direction.North;
        doInstruction(boat, instruction);
        expect(boat.position).toEqual({ x: 0, y: 10 });
      });
      it("should go 10 south", () => {
        boat.facing = Direction.South;
        doInstruction(boat, instruction);
        expect(boat.position).toEqual({ x: 0, y: -10 });
      });
      it("should go 10 west", () => {
        boat.facing = Direction.West;
        doInstruction(boat, instruction);
        expect(boat.position).toEqual({ x: -10, y: 0 });
      });

      describe("waypoint", () => {
        let waypoint: Position;
        beforeEach(async () => {
          waypoint = { x: 0, y: 0 };
        });
        it("should go 100 east, 10 north", () => {
          waypoint = { x: 10, y: 1 };
          doInstruction(boat, instruction, waypoint);
          expect(boat.position).toEqual({ x: 100, y: 10 });
        });
      });
    });

    describe("directions", () => {
      it("should go 10 east", () => {
        instruction = { action: Direction.East, value: 5 };
        doInstruction(boat, instruction);
        expect(boat.position).toEqual({ x: 5, y: 0 });
      });
      it("should go 10 north", () => {
        instruction = { action: Direction.North, value: 5 };
        doInstruction(boat, instruction);
        expect(boat.position).toEqual({ x: 0, y: 5 });
      });
      it("should go 10 south", () => {
        instruction = { action: Direction.South, value: 5 };
        doInstruction(boat, instruction);
        expect(boat.position).toEqual({ x: 0, y: -5 });
      });
      it("should go 10 west", () => {
        instruction = { action: Direction.West, value: 5 };
        doInstruction(boat, instruction);
        expect(boat.position).toEqual({ x: -5, y: 0 });
      });

      describe("waypoint", () => {
        let waypoint: Position;
        beforeEach(async () => {
          waypoint = { x: 0, y: 0 };
        });
        it("should go 10 east", () => {
          instruction = { action: Direction.East, value: 5 };
          doInstruction(boat, instruction, waypoint);
          expect(waypoint).toEqual({ x: 5, y: 0 });
        });
      });
    });

    describe("rotation", () => {
      it("should rotate 90 to north", () => {
        instruction = { action: Turn.Left, value: 90 };
        doInstruction(boat, instruction);
        expect(boat.facing).toEqual(Direction.North);
      });
      it("should rotate to nothing", () => {
        instruction = { action: Turn.Left, value: 0 };
        doInstruction(boat, instruction);
        expect(boat.facing).toEqual(Direction.East);
      });
      it("should rotate 180 to West", () => {
        instruction = { action: Turn.Left, value: 180 };
        doInstruction(boat, instruction);
        expect(boat.facing).toEqual(Direction.West);
      });
      it("should rotate 90 to South", () => {
        instruction = { action: Turn.Right, value: 90 };
        doInstruction(boat, instruction);
        expect(boat.facing).toEqual(Direction.South);
      });

      describe("waypoint", () => {
        let waypoint: Position;
        beforeEach(async () => {
          waypoint = { x: 5, y: 0 };
        });
        it("should rotate to north", () => {
          instruction = { action: Turn.Left, value: 90 };
          doInstruction(boat, instruction, waypoint);
          expect(waypoint).toEqual({ x: 0, y: 5 });
        });
        it("should rotate to south", () => {
          instruction = { action: Turn.Right, value: 90 };
          doInstruction(boat, instruction, waypoint);
          expect(waypoint).toEqual({ x: 0, y: -5 });
        });
        it("should rotate to west", () => {
          instruction = { action: Turn.Left, value: 180 };
          doInstruction(boat, instruction, waypoint);
          expect(waypoint).toEqual({ x: -5, y: 0 });
        });
      });
    });
  });

  describe("Test", () => {
    let instructions: Instruction[];
    let boat: Boat;
    beforeEach(async () => {
      instructions = parseInstructions(lines);
      boat = {
        facing: Direction.East,
        position: { x: 0, y: 0 },
      };
    });
    it("1", () => {
      const result = run(instructions, boat);
      expect(result).toBe(25);
    });
    it("2", () => {
      const result = run(instructions, boat, { x: 10, y: 1 });
      expect(result).toBe(286);
    });
  });
});

describe("Run", () => {
  let raw: string;
  let lines: string[];
  let instructions: Instruction[];
  let boat: Boat;

  beforeEach(async () => {
    raw = await readFileBetter("input.txt");
    lines = splitOnNewline(raw);
    instructions = parseInstructions(lines);
    boat = {
      facing: Direction.East,
      position: { x: 0, y: 0 },
    };
  });

  it("Star 1", async () => {
    const result = run(instructions, boat);
    logger.info("Star1: ", result);
    expect(result).toBe(319);
  });

  it("Star 2", async () => {
    const result = run(instructions, boat, { x: 10, y: 1 });
    logger.info("Star2: ", result);
    expect(result).toBe(50157);
  });
});

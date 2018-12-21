import { Opcode } from './opcodes';

export interface Instruction {
  opcode: Opcode;
  inA: number;
  inB: number;
  outC: number;
}

export interface InstructionsOutput {
  pointerRegister: number;
  instructions: Instruction[];
}

const pointerParser = /#ip ([\d]+)/;
const instructionParser = /([a-z]{4,4}) ([\d]+) ([\d]+) ([\d]+)/;

export const getInstructions = (description: string): InstructionsOutput => {
  let pointerRegister = 0;
  const instructions: Instruction[] = [];
  const lines = description.split('\n');

  lines.forEach((line) => {
    let found = line.match(instructionParser);

    if (found) {
      instructions.push({
        opcode: found[1] as Opcode,
        inA: Number(found[2]),
        inB: Number(found[3]),
        outC: Number(found[4]),
      });
      return;
    }
    found = line.match(pointerParser);

    if (found) {
      pointerRegister = Number(found[1]);
    }
  });

  return {
    pointerRegister,
    instructions,
  };
};

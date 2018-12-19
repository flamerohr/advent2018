import { getInstructions, Instruction } from './getInstructions';
import { input } from './input';
import { apply_opcode } from './opcodes';

export const day19_1 = (): number => {
  const result = getInstructions(input);
  const { pointerRegister, instructions } = result;
  let registers = [0, 0, 0, 0, 0, 0];
  let instruction: Instruction = instructions[registers[pointerRegister]];

  do {
    const { opcode, inA, inB, outC } = instruction;
    const newRegisters = apply_opcode(opcode, inA, inB, outC, registers);

    registers = newRegisters;
    registers[pointerRegister] += 1;
    instruction = instructions[registers[pointerRegister]];
  } while (instruction);

  return registers[0];
};

import { getInstructions, Instruction } from './getInstructions';
import { input } from './input';
import { apply_opcode, Opcode } from './opcodes';

export const day19_2 = (): number => {
  const result = getInstructions(input);
  const { pointerRegister, instructions } = result;
  let registers = [1, 0, 0, 0, 0, 0];
  let instruction: Instruction = instructions[registers[pointerRegister]];
  let newRegisters = registers.slice(0);

  let target = 0;
  do {
    const { opcode, inA, inB, outC } = instruction;
    newRegisters = apply_opcode(opcode, inA, inB, outC, registers);

    if (registers[pointerRegister] === 35) {
      target = newRegisters[5];
      /*
        reverse engineered this:
        if (reg2 * reg4 === reg5) {
          reg0 += reg2;
        }
        from:
ip=3 [0, 0, 1, 3, 2, 10551314] mulr 2 4 1
ip=4 [0, 2, 1, 4, 2, 10551314] eqrr 1 5 1
ip=5 [0, 0, 1, 5, 2, 10551314] addr 1 3 3
ip=6 [0, 0, 1, 6, 2, 10551314] addi 3 1 3
ip=8 [0, 0, 1, 8, 2, 10551314] addi 4 1 4
ip=9 [0, 0, 1, 9, 3, 10551314] gtrr 4 5 1
ip=10 [0, 0, 1, 10, 3, 10551314] addr 3 1 3
ip=11 [0, 0, 1, 11, 3, 10551314] seti 2 7 3
ip=12 [0, 0, 1, 12, 10551315, 10551314] addi 2 1 2 // eventually gets here

        ip=9 to ip=12 sets up an increment loop for reg2 and reg4 each
        so... it looks like it's trying to find all denominators of what's in reg5
       */
      break;
    }
    registers = newRegisters;
    registers[pointerRegister] += 1;
    instruction = instructions[registers[pointerRegister]];
  } while (instruction);

  // replicate the behaviour of the instructions loop commented above
  let total = 0;
  for (let i = 0; i <= target; i += 1) {
    if (target % i === 0) {
      total += i;
    }
  }
  return total;
};

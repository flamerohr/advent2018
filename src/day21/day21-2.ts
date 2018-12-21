import { getInstructions, Instruction } from './getInstructions';
import { input } from './input';
import { apply_opcode } from './opcodes';

export const day21_2 = (): number => {
  const result = getInstructions(input);
  const { pointerRegister, instructions } = result;
  let registers = [0, 0, 0, 0, 0, 0];
  let instruction: Instruction = instructions[registers[pointerRegister]];

  const values = [];
  do {
    const { opcode, inA, inB, outC } = instruction;
    let newRegisters = [];

    // this part pushes the loop to the end each time
    if (registers[pointerRegister] === 19) {
      const factor = Math.floor(registers[3] / 256);
      newRegisters = [...registers];

      newRegisters[5] = (factor + 1) * 256;
      newRegisters[1] = factor;
    } else {
      newRegisters = apply_opcode(opcode, inA, inB, outC, registers);
    }

    if (registers[pointerRegister] === 28) {
      if (values.indexOf(registers[4]) !== -1) {
        break;
      }
      values.push(registers[4]);
    }

    registers = newRegisters;
    registers[pointerRegister] += 1;
    instruction = instructions[registers[pointerRegister]];
  } while (instruction);

  return values[values.length - 1];
};

/* loop dump
ip=18 [0, 1, 18, 13443200, 16217789, 0] addi 1 1 5
ip=19 [0, 1, 19, 13443200, 16217789, 2] muli 5 256 5
ip=20 [0, 1, 20, 13443200, 16217789, 512] gtrr 5 3 5
ip=21 [0, 1, 21, 13443200, 16217789, 0] addr 5 2 2
ip=22 [0, 1, 22, 13443200, 16217789, 0] addi 2 1 2
ip=24 [0, 1, 24, 13443200, 16217789, 0] addi 1 1 1
ip=25 [0, 2, 25, 13443200, 16217789, 0] seti 17 0 2

ip=18 [0, 2, 18, 13443200, 16217789, 0] addi 1 1 5
ip=19 [0, 2, 19, 13443200, 16217789, 3] muli 5 256 5
ip=20 [0, 2, 20, 13443200, 16217789, 768] gtrr 5 3 5
ip=21 [0, 2, 21, 13443200, 16217789, 0] addr 5 2 2
ip=22 [0, 2, 22, 13443200, 16217789, 0] addi 2 1 2
ip=24 [0, 2, 24, 13443200, 16217789, 0] addi 1 1 1
ip=25 [0, 3, 25, 13443200, 16217789, 0] seti 17 0 2
*/

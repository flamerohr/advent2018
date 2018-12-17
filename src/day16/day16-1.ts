import { getSamples } from './getSamples';
import { input } from './input';
import { OpcodesMap, apply_opcode, Opcodes } from './opcodes';

export const day16_1 = (): number => {
  const samples = getSamples(input);
  const opcodesList: Opcodes[] = Object.keys(OpcodesMap).map(Number);
  const moreThanTwo = [];

  samples.forEach((sample) => {
    const { input, instruction, output } = sample;
    const [_, inA, inB, out] = instruction;
    let count = 0;

    opcodesList.forEach((opcode) => {
      const result = apply_opcode(opcode, inA, inB, out, input);

      if (output.join(',') === result.join(',')) {
        count += 1;
      }
    });
    if (count >= 3) {
      moreThanTwo.push(sample);
    }
  });

  return moreThanTwo.length;
};

// wrong 517 ... somehow the answer for someone else

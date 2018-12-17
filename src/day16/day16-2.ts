import { getSamples, Sample, getInstructions } from './getSamples';
import { input } from './input';
import { OpcodesMap, apply_opcode, Opcodes } from './opcodes';
import { testProgram } from './test-program';

interface Survey {
  [index: number]: Opcodes[];
}

interface InputMap {
  [index: number]: Opcodes;
}

const getInputMap = (samples: Sample[]): InputMap => {
  const opcodesList: Opcodes[] = Object.keys(OpcodesMap).map(Number);
  const codesSurvey: Survey = {};

  samples.forEach((sample) => {
    const { input, instruction, output } = sample;
    const [unknown, inA, inB, out] = instruction;

    if (!codesSurvey[unknown]) {
      codesSurvey[unknown] = [];
    }
    opcodesList.forEach((opcode) => {
      const result = apply_opcode(opcode, inA, inB, out, input);

      if (output.join(',') === result.join(',') && codesSurvey[unknown].indexOf(opcode) === -1) {
        codesSurvey[unknown].push(opcode);
      }
    });
  });

  let survey: Survey = Object.keys(codesSurvey).reduce(
    (result: Survey, unknown: string) => {
      const key = Number(unknown);
      const copy = codesSurvey[key].slice(0);
      copy.sort((a, b) => a - b);

      result[key] = copy;
      return result;
    },
    {},
  );
  const inputMap: InputMap = {};
  while (true) {
    let changed = false;
    opcodesList.forEach((opcode) => {
      const used: Opcodes[] = [];

      Object.keys(survey).forEach((unknown) => {
        const key = Number(unknown);
        const potential = survey[key];
        if (potential.indexOf(opcode) > -1) {
          used.push(key);
        }
      });

      if (used.length === 1) {
        changed = true;
        inputMap[used[0]] = opcode;
        survey = Object.keys(survey).reduce(
          (result: Survey, unknown: string) => {
            const key = Number(unknown);

            if (key === used[0]) {
              return result;
            }
            result[key] = survey[key].slice(0);
            return result;
          },
          {},
        );
      }
      used.sort();
    });
    if (!changed) {
      break;
    }
  }

  if (Object.keys(survey).length > 0) {
    console.error(survey);
    throw new Error('Not all keys are figured out');
  }
  return inputMap;
};

export const day16_2 = (): number => {
  const samples: Sample[] = getSamples(input);
  const inputMap: InputMap = getInputMap(samples);

  const instructions = getInstructions(testProgram);
  const output = instructions.reduce(
    (input, instruction) => {
      const [inputCode, inA, inB, outC] = instruction;
      const opcode = inputMap[inputCode];

      const result = apply_opcode(opcode, inA, inB, outC, input);
      return result;
    },
    [0, 0, 0, 0],
  );
  return output[0];
};

// wrong 517 ... somehow the answer for someone else

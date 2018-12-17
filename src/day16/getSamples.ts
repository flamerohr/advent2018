// tslint:disable-next-line:max-line-length
const inputParser = /^Before:\s+\[(\d+), (\d+), (\d+), (\d+)\]$/;
const instructionParser = /^(\d+) (\d+) (\d+) (\d+)$/;
const outputParser = /^After:\s+\[(\d+), (\d+), (\d+), (\d+)\]$/;

export interface Sample {
  input: number[];
  instruction: number[];
  output: number[];
}

export const getInstructions = (description: string): number[][] => {
  const instructions: number[][] = [];
  const lines = description.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const instructionContents = lines[i].match(instructionParser);
    if (!instructionContents) {
      throw new Error('what?');
    }
    const instruction: number[] = [
      instructionContents[1],
      instructionContents[2],
      instructionContents[3],
      instructionContents[4],
    ].map(Number);

    instructions.push(instruction);
  }

  return instructions;
};

export const getSamples = (description: string): Sample[] => {
  const samples: Sample[] = [];
  const lines = description.split('\n');

  let input: number[] = [];
  let instruction: number[] = [];
  let output: number[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i]) {
      continue;
    }
    const inputContents = lines[i].match(inputParser);
    if (inputContents) {
      input = [
        inputContents[1],
        inputContents[2],
        inputContents[3],
        inputContents[4],
      ].map(Number);
      continue;
    }
    const instructionContents = lines[i].match(instructionParser);
    if (instructionContents) {
      instruction = [
        instructionContents[1],
        instructionContents[2],
        instructionContents[3],
        instructionContents[4],
      ].map(Number);
      continue;
    }
    const outputContents = lines[i].match(outputParser);
    if (outputContents) {
      output = [
        outputContents[1],
        outputContents[2],
        outputContents[3],
        outputContents[4],
      ].map(Number);

      samples.push({
        input,
        instruction,
        output,
      });
    }
  }

  return samples;
};

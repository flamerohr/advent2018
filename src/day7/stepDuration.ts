export interface StepDuration {
  [index: string]: number;
}

const stepDuration: StepDuration = {};

const base = 'A'.charCodeAt(0);
for (let i = 0; i < 26; i += 1) {
  const char = String.fromCharCode(base + i);

  stepDuration[char] = 61 + i;
}

export {
  stepDuration,
};

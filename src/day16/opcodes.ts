export enum Opcodes {
  addr = 0,
  addi = 1,
  mulr = 2,
  muli = 3,
  banr = 4,
  bani = 5,
  borr = 6,
  bori = 7,
  setr = 8,
  seti = 9,
  gtir = 10,
  gtri = 11,
  gtrr = 12,
  eqir = 13,
  eqri = 14,
  eqrr = 15,
}

export const OpcodesMap = {
  [Opcodes.addr]: 'addr',
  [Opcodes.addi]: 'addi',
  [Opcodes.mulr]: 'mulr',
  [Opcodes.muli]: 'muli',
  [Opcodes.banr]: 'banr',
  [Opcodes.bani]: 'bani',
  [Opcodes.borr]: 'borr',
  [Opcodes.bori]: 'bori',
  [Opcodes.setr]: 'setr',
  [Opcodes.seti]: 'seti',
  [Opcodes.gtir]: 'gtir',
  [Opcodes.gtri]: 'gtri',
  [Opcodes.gtrr]: 'gtrr',
  [Opcodes.eqir]: 'eqir',
  [Opcodes.eqri]: 'eqri',
  [Opcodes.eqrr]: 'eqrr',
};

export const apply_opcode = (
  opcode: Opcodes,
  inA: number,
  inB: number,
  outC: number,
  registers: number[],
): number[] => {
  const newRegisters = registers.slice(0);
  switch (opcode) {
    case Opcodes.addr: {
      newRegisters[outC] = registers[inA] + registers[inB];
      break;
    }
    case Opcodes.addi: {
      newRegisters[outC] = registers[inA] + inB;
      break;
    }
    case Opcodes.mulr: {
      newRegisters[outC] = registers[inA] * registers[inB];
      break;
    }
    case Opcodes.muli: {
      newRegisters[outC] = registers[inA] * inB;
      break;
    }
    case Opcodes.banr: {
      newRegisters[outC] = registers[inA] & registers[inB];
      break;
    }
    case Opcodes.bani: {
      newRegisters[outC] = registers[inA] & inB;
      break;
    }
    case Opcodes.borr: {
      newRegisters[outC] = registers[inA] | registers[inB];
      break;
    }
    case Opcodes.bori: {
      newRegisters[outC] = registers[inA] | inB;
      break;
    }
    case Opcodes.setr: {
      newRegisters[outC] = registers[inA];
      break;
    }
    case Opcodes.seti: {
      newRegisters[outC] = inA;
      break;
    }
    case Opcodes.gtir: {
      newRegisters[outC] = (inA > registers[inB]) ? 1 : 0;
      break;
    }
    case Opcodes.gtri: {
      newRegisters[outC] = (registers[inA] > inB) ? 1 : 0;
      break;
    }
    case Opcodes.gtrr: {
      newRegisters[outC] = (registers[inA] > registers[inB]) ? 1 : 0;
      break;
    }
    case Opcodes.eqir: {
      newRegisters[outC] = (inA === registers[inB]) ? 1 : 0;
      break;
    }
    case Opcodes.eqri: {
      newRegisters[outC] = (registers[inA] === inB) ? 1 : 0;
      break;
    }
    case Opcodes.eqrr: {
      newRegisters[outC] = (registers[inA] === registers[inB]) ? 1 : 0;
      break;
    }
    default: {
      throw new Error('no opcode found..?');
    }
  }
  return newRegisters;
};

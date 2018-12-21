export enum Opcode {
  addr = 'addr',
  addi = 'addi',
  mulr = 'mulr',
  muli = 'muli',
  banr = 'banr',
  bani = 'bani',
  borr = 'borr',
  bori = 'bori',
  setr = 'setr',
  seti = 'seti',
  gtir = 'gtir',
  gtri = 'gtri',
  gtrr = 'gtrr',
  eqir = 'eqir',
  eqri = 'eqri',
  eqrr = 'eqrr',
}

export const OpcodeMap = {
  [Opcode.addr]: 'addr',
  [Opcode.addi]: 'addi',
  [Opcode.mulr]: 'mulr',
  [Opcode.muli]: 'muli',
  [Opcode.banr]: 'banr',
  [Opcode.bani]: 'bani',
  [Opcode.borr]: 'borr',
  [Opcode.bori]: 'bori',
  [Opcode.setr]: 'setr',
  [Opcode.seti]: 'seti',
  [Opcode.gtir]: 'gtir',
  [Opcode.gtri]: 'gtri',
  [Opcode.gtrr]: 'gtrr',
  [Opcode.eqir]: 'eqir',
  [Opcode.eqri]: 'eqri',
  [Opcode.eqrr]: 'eqrr',
};

export const apply_opcode = (
  opcode: Opcode,
  inA: number,
  inB: number,
  outC: number,
  registers: number[],
): number[] => {
  const newRegisters = registers.slice(0);
  switch (opcode) {
    case Opcode.addr: {
      newRegisters[outC] = registers[inA] + registers[inB];
      break;
    }
    case Opcode.addi: {
      newRegisters[outC] = registers[inA] + inB;
      break;
    }
    case Opcode.mulr: {
      newRegisters[outC] = registers[inA] * registers[inB];
      break;
    }
    case Opcode.muli: {
      newRegisters[outC] = registers[inA] * inB;
      break;
    }
    case Opcode.banr: {
      newRegisters[outC] = registers[inA] & registers[inB];
      break;
    }
    case Opcode.bani: {
      newRegisters[outC] = registers[inA] & inB;
      break;
    }
    case Opcode.borr: {
      newRegisters[outC] = registers[inA] | registers[inB];
      break;
    }
    case Opcode.bori: {
      newRegisters[outC] = registers[inA] | inB;
      break;
    }
    case Opcode.setr: {
      newRegisters[outC] = registers[inA];
      break;
    }
    case Opcode.seti: {
      newRegisters[outC] = inA;
      break;
    }
    case Opcode.gtir: {
      newRegisters[outC] = (inA > registers[inB]) ? 1 : 0;
      break;
    }
    case Opcode.gtri: {
      newRegisters[outC] = (registers[inA] > inB) ? 1 : 0;
      break;
    }
    case Opcode.gtrr: {
      newRegisters[outC] = (registers[inA] > registers[inB]) ? 1 : 0;
      break;
    }
    case Opcode.eqir: {
      newRegisters[outC] = (inA === registers[inB]) ? 1 : 0;
      break;
    }
    case Opcode.eqri: {
      newRegisters[outC] = (registers[inA] === inB) ? 1 : 0;
      break;
    }
    case Opcode.eqrr: {
      newRegisters[outC] = (registers[inA] === registers[inB]) ? 1 : 0;
      break;
    }
    default: {
      throw new Error('no opcode found..?');
    }
  }
  return newRegisters;
};

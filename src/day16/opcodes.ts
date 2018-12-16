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

export const OpcodesList = [
  Opcodes.addr,
  Opcodes.addi,
  Opcodes.mulr,
  Opcodes.muli,
  Opcodes.banr,
  Opcodes.bani,
  Opcodes.borr,
  Opcodes.bori,
  Opcodes.setr,
  Opcodes.seti,
  Opcodes.gtir,
  Opcodes.gtri,
  Opcodes.gtrr,
  Opcodes.eqir,
  Opcodes.eqri,
  Opcodes.eqrr,
];

export const apply_opcode = (
  opcode: Opcodes,
  inA: number,
  inB: number,
  out: number,
  registers: number[],
): number[] => {
  const newRegisters = registers.slice(0);
  switch (opcode) {
    case Opcodes.addr: {
      newRegisters[out] = registers[inA] + registers[inB];
      break;
    }
    case Opcodes.addi: {
      newRegisters[out] = registers[inA] + inB;
      break;
    }
    case Opcodes.mulr: {
      newRegisters[out] = registers[inA] * registers[inB];
      break;
    }
    case Opcodes.muli: {
      newRegisters[out] = registers[inA] * inB;
      break;
    }
    case Opcodes.banr: {
      break;
    }
    case Opcodes.bani: {
      break;
    }
    case Opcodes.borr: {
      break;
    }
    case Opcodes.bori: {
      break;
    }
    case Opcodes.setr: {
      break;
    }
    case Opcodes.seti: {
      break;
    }
    case Opcodes.gtir: {
      break;
    }
    case Opcodes.gtri: {
      break;
    }
    case Opcodes.gtrr: {
      break;
    }
    case Opcodes.eqir: {
      break;
    }
    case Opcodes.eqri: {
      break;
    }
    case Opcodes.eqrr: {
      break;
    }
  }
  return newRegisters;
};

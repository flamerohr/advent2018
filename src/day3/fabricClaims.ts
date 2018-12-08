import { fabricDescriptions } from './fabricDescriptions';

export interface FabricClaimModel {
  left: number;
  top: number;
  width: number;
  height: number;
  id: number;
}

// const parserNamed = /^\#(?<id>\d+) @ (?<left>\d+),(?<top>\d+): (?<width>\d+)x(?<height>\d+)$/;

const parser = /^\#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;

const claimExist = (claim: FabricClaimModel | null): claim is FabricClaimModel => {
  return Boolean(claim);
};

const parseDescription = (description: string): FabricClaimModel | null => {
  const parts = description.match(parser);

  if (!parts) {
    return null;
  }

  const claim: FabricClaimModel = {
    id: Number(parts[1]),
    left: Number(parts[2]),
    top: Number(parts[3]),
    width: Number(parts[4]),
    height: Number(parts[5]),
  };

  return claim;
};

export const fabricClaims: FabricClaimModel[] = fabricDescriptions
  .map(parseDescription)
  .filter(claimExist);

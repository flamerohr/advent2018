import { fabricClaims, FabricClaimModel } from './fabricClaims';

export interface ClaimedRow extends Array<FabricClaimModel> {}

export interface ClaimedColumn extends Array<ClaimedRow> {}

export interface ClaimedMapModel extends Array<ClaimedColumn> {}

const mapClaims = (): ClaimedMapModel => {
  const map: ClaimedMapModel = [];

  fabricClaims.forEach((claim: FabricClaimModel) => {
    for (let pointX = 0; pointX < claim.width; pointX += 1) {
      for (let pointY = 0; pointY < claim.height; pointY += 1) {
        const x = claim.left + pointX;
        const y = claim.top + pointY;

        if (!map[x]) {
          map[x] = [];
        }
        if (!map[x][y]) {
          map[x][y] = [];
        }

        map[x][y].push(claim);
      }
    }
  });

  return map;
};

export const claimMap = mapClaims();

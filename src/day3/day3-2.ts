import { claimMap, ClaimedColumn, ClaimedRow } from './claimMap';
import { fabricClaims, FabricClaimModel } from './fabricClaims';

const getId = (claim: FabricClaimModel): number => claim.id;

const filterPoint = (claimIds: number[], point: FabricClaimModel): number[] => {
  return claimIds.filter(id => point.id !== id);
};

const filterRows = (claimIds: number[], row: ClaimedRow): number[] => {
  if (row.length <= 1) {
    return claimIds;
  }
  return row.reduce(filterPoint, claimIds);
};

const filterColumns = (claimIds: number[], column: ClaimedColumn): number[] => {
  return column.reduce(filterRows, claimIds);
};

export const day3_2 = (): number => {
  const claimIds: number[] = fabricClaims.map(getId);

  const claimId: number|undefined = claimMap
    .reduce(filterColumns, claimIds)
    .shift();

  if (typeof claimId !== 'number') {
    throw Error('No id found');
  }
  return claimId;
};

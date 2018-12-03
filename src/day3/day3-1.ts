import { claimMap, ClaimedColumn, ClaimedRow } from './claimMap';

const countRows = (rowTotal: number, row: ClaimedRow): number => {
  if (row.length > 1) {
    return rowTotal + 1;
  }
  return rowTotal;
};

const countColumns = (columnTotal: number, column: ClaimedColumn): number => {
  const columnCount = column.reduce(countRows, 0);

  return columnTotal + columnCount;
};

export const day3_1 = (): number => {
  return claimMap.reduce(countColumns, 0);
};

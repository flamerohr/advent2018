import { claimMap, ClaimedColumn, ClaimedRow } from './claimMap';

const countRows = (rowTotal: number, row: ClaimedRow): number => {
  const rowCount = row.length > 1 ? 1 : 0;

  return rowTotal + rowCount;
};

const countColumns = (columnTotal: number, column: ClaimedColumn): number => {
  const columnCount = column.reduce(countRows, 0);

  return columnTotal + columnCount;
};

export const day3_1 = (): number => {
  return claimMap.reduce(countColumns, 0);
};

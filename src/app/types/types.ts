export type CellBridges = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

export type AreaProps = {
  areaId: string;
  topLeftCellIdx: number;
  sum: number;
};

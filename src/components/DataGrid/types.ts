export type Column = {
  id: string;
  title: string;
  width: number;
};
export type Row = {
  id: string;
  data: Record<string, unknown>;
};
export type DataGridProps = {
  columns: Column[];
  rows: Row[];
};

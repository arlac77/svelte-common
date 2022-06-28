
export const DATA_GRID = "DATA_GRID";

export class DataGrid {
  columns = [];

  addColumn(c) {
    this.columns.push(c);
  }
}

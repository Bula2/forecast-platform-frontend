export interface DataTableType {
  key: number;
  dataDimensions: string;
  dataType: string;
  dataMeasures: { type: string; value: number };
}

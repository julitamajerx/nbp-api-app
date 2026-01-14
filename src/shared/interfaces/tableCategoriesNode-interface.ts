export interface TableCategoriesNode {
  name: string;
  tableType?: 'A' | 'B' | 'C';
  children?: TableCategoriesNode[];
}

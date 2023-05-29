import { tab, tbody, td, th, thead, tr } from './tags';

export function table(columns: string[], rows: Array<any[]>) {
  return tab([
    thead([tr(columns.map((c) => th([c])))]),
    tbody(
      rows.map((row, i) =>
        tr(
          row.map((cell) => td([cell])),
          i % 2 ? 'bg-gray' : ''
        )
      )
    ),
  ]);
}

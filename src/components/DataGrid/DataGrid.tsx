import { useState } from "react";
import type { DataGridProps } from "./types";

export function DataGrid({ columns, rows = [] }: DataGridProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <table
      border={1}
      cellPadding={8}
      cellSpacing={0}
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Arial",
      }}
    >
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.id}>{col.title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.length === 0 && (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: "center" }}>
              No data available
            </td>
          </tr>
        )}

        {rows.map((row, index) => (
          <tr
            key={row.id ?? index}
            onClick={() => setSelectedRow(index)}
            style={{
              backgroundColor:
                selectedRow === index ? "#cce5ff" : "transparent",
              cursor: "pointer",
            }}
          >
            {columns.map((col) => (
              <td key={col.id}>{row.data?.[col.id] ?? "-"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

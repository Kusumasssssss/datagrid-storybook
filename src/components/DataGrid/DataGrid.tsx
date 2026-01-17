import type { DataGridProps } from "./types";

export function DataGrid({ columns, rows = [] }: DataGridProps) {
  return (
    <div
      role="table"
      style={{
        width: "100%",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
      }}
    >
      {/* Header row */}
      <div
        role="row"
        style={{
          display: "flex",
          background: "#f3f3f3",
          fontWeight: "bold",
          borderBottom: "2px solid #ccc",
        }}
      >
        {columns.map((col) => (
          <div
            key={col.id}
            role="columnheader"
            style={{
              width: col.width,
              padding: "8px",
              borderRight: "1px solid #ddd",
            }}
          >
            {col.title}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {rows.length === 0 && (
        <div
          style={{
            padding: "12px",
            textAlign: "center",
            color: "#666",
            borderBottom: "1px solid #eee",
          }}
        >
          No data available
        </div>
      )}

      {/* Data rows */}
      {rows.map((row, index) => (
        <div
          key={row.id ?? index}
          role="row"
          style={{
            display: "flex",
            borderBottom: "1px solid #eee",
          }}
        >
          {columns.map((col) => (
            <div
              key={col.id}
              role="cell"
              style={{
                width: col.width,
                padding: "8px",
                borderRight: "1px solid #eee",
              }}
            >
              {row.data?.[col.id] ?? "-"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
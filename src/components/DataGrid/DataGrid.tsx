import { useState, useRef, useEffect, useMemo } from "react";
import type { DataGridProps } from "./types";

const ROW_HEIGHT = 40;
const VISIBLE_ROWS = 10;

type SortLevel = {
  key: string;
  direction: "asc" | "desc";
};

export function DataGrid({ columns, rows = [] }: DataGridProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [focusedRow, setFocusedRow] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Updated to an array for multi-column sort
  const [sortLevels, setSortLevels] = useState<SortLevel[]>([]);

  // MULTI-SORT LOGIC
  const sortedRows = useMemo(() => {
    if (sortLevels.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const { key, direction } of sortLevels) {
        const aValue = a.data?.[key] ?? "";
        const bValue = b.data?.[key] ?? "";

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [rows, sortLevels]);

  const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const endIndex = startIndex + VISIBLE_ROWS;
  const visibleRows = sortedRows.slice(startIndex, endIndex);

  const topSpacerHeight = startIndex * ROW_HEIGHT;
  const bottomSpacerHeight =
    (sortedRows.length - endIndex) * ROW_HEIGHT > 0
      ? (sortedRows.length - endIndex) * ROW_HEIGHT
      : 0;

  function handleSort(colId: string, shift: boolean) {
    setSortLevels((prev) => {
      const existingLevel = prev.find((lvl) => lvl.key === colId);

      if (!shift) {
        // Replace sort levels
        if (!existingLevel) {
          return [{ key: colId, direction: "asc" }];
        }
        if (existingLevel.direction === "asc") {
          return [{ key: colId, direction: "desc" }];
        }
        return [];
      }

      // Multi-column sorting with Shift
      if (!existingLevel) {
        return [...prev, { key: colId, direction: "asc" }];
      }

      if (existingLevel.direction === "asc") {
        return prev.map((lvl) =>
          lvl.key === colId ? { ...lvl, direction: "desc" } : lvl
        );
      }

      // Remove this level if already desc
      return prev.filter((lvl) => lvl.key !== colId);
    });
  }

  // Keyboard event for up/down arrow and enter
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (sortedRows.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedRow((prev) =>
          prev < sortedRows.length - 1 ? prev + 1 : prev
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedRow((prev) => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === "Enter") {
        setSelectedRow(focusedRow);
      }
    }

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [sortedRows, focusedRow]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={{
        height: `${ROW_HEIGHT * VISIBLE_ROWS}px`,
        overflowY: "auto",
        width: "100%",
        outline: "none",
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <table
        role="grid"
        border={1}
        cellPadding={8}
        cellSpacing={0}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Arial",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => {
              const level = sortLevels.find((l) => l.key === col.id);

              return (
                <th
                  key={col.id}
                  onClick={(e) => handleSort(col.id, e.shiftKey)}
                  style={{
                    textAlign: "left",
                    backgroundColor: "#f2f2f2",
                    cursor: "pointer",
                    width: col.width ?? "auto",
                    userSelect: "none",
                  }}
                >
                  {col.title}
                  {level ? (level.direction === "asc" ? " ▲" : " ▼") : ""}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {topSpacerHeight > 0 && (
            <tr>
              <td colSpan={columns.length} style={{ height: topSpacerHeight }} />
            </tr>
          )}

          {sortedRows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center" }}
              >
                No data available
              </td>
            </tr>
          )}

          {visibleRows.map((row, index) => {
            const actualIndex = startIndex + index;
            const isFocused = actualIndex === focusedRow;
            const isSelected = actualIndex === selectedRow;

            return (
              <tr
                key={row.id ?? actualIndex}
                onClick={() => setSelectedRow(actualIndex)}
                style={{
                  height: ROW_HEIGHT,
                  backgroundColor: isSelected
                    ? "#cce5ff"
                    : isFocused
                    ? "#dceeff"
                    : "transparent",
                  cursor: "pointer",
                }}
              >
                {columns.map((col) => (
                  <td key={col.id}>{row.data?.[col.id] ?? "-"}</td>
                ))}
              </tr>
            );
          })}

          {bottomSpacerHeight > 0 && (
            <tr>
              <td
                colSpan={columns.length}
                style={{ height: bottomSpacerHeight }}
              />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

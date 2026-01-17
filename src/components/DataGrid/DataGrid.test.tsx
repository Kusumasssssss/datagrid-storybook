import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { DataGrid } from "./DataGrid";

const columns = [
  { id: "name", title: "Employee Name" },
  { id: "role", title: "Role" },
];

describe("DataGrid component", () => {
  test("shows empty state when no rows are provided", () => {
    render(<DataGrid columns={columns} rows={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("renders table data correctly", () => {
    const rows = [
      { id: 1, data: { name: "Ravi", role: "Developer" } },
      { id: 2, data: { name: "Anita", role: "Tester" } },
    ];

    render(<DataGrid columns={columns} rows={rows} />);

    expect(screen.getByText("Ravi")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Anita")).toBeInTheDocument();
    expect(screen.getByText("Tester")).toBeInTheDocument();
  });
});

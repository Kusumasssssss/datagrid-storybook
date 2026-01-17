import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "./DataGrid";
import type { Column, Row } from "./types";

const columns: Column[] = [
  { id: "name", title: "Employee Name", width: 200 },
  { id: "role", title: "Role", width: 150 },
];

const rows: Row[] = [
  { id: "1", data: { name: "Ravi", role: "Developer" } },
  { id: "2", data: { name: "Anita", role: "Tester" } },
];

const meta: Meta<typeof DataGrid> = {
  title: "Components/DataGrid",
  component: DataGrid,
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

export const Basic: Story = {
  args: {
    columns,
    rows,
  },
};
export const EmptyData = {
  args: {
    columns,
    rows: [],
  },
};
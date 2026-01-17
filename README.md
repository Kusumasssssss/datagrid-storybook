# DataGrid Component

A reusable DataGrid component built using React and TypeScript.
The component is developed and tested using Storybook.

## Features
- Dynamic columns and rows
- Empty state handling
- Reusable and configurable
- Storybook-driven development

## Props

### columns
Array of column definitions.

Example:
```ts
[
  { id: "name", title: "Employee Name", width: 200 },
  { id: "role", title: "Role", width: 150 }
]
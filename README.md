# DataGrid Component

A reusable DataGrid component built using React and TypeScript.
The component is developed and tested using Storybook.

## Features
- Dynamic columns and rows
- Empty state handling
- Reusable and configurable
- Storybook-driven development
## Storybook (Chromatic)

This project uses Storybook and Chromatic for UI development and visual regression testing.

🔗 Live Storybook (Chromatic):
https://www.chromatic.com/library?appId=696b97e11e2d6b5be9763dcc

## Props

### columns
Array of column definitions.

Example:
```ts
[
  { id: "name", title: "Employee Name", width: 200 },
  { id: "role", title: "Role", width: 150 }
]
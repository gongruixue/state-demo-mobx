const uiTree = {
  id: "1",
  name: "A-Button-1",
  source: "npm/componentGroupA",
  component: "Button",
  children: [
    {
      id: "2",
      name: "A-Input-2",
      source: "npm/componentGroupA",
      component: "Input"
    },
    {
      id: "3",
      name: "B-Input-3",
      source: "npm/componentGroupB",
      component: "Input"
    }
  ]
};
const usingComponentGroups = [
  {
    source: "npm/componentGroupA",
    version: "1.0"
  },
  {
    source: "npm/componentGroupB",
    version: "1.0"
  },
  {
    source: "npm/componentGroupC",
    version: "1.0"
  }
];
export const cardData = {
  uiTree,
  usingComponentGroups
};

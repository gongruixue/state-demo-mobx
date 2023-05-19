const textProp = {
  name: "text",
  title: "文案",
  propType: "string"
};
const imageProp = {
  name: "image",
  title: "图片",
  propType: "string"
};
const buttonDesc = {
  name: "Button",
  title: "按钮",
  props: [textProp, imageProp]
};
const inputDesc = {
  name: "Input",
  title: "输入框",
  props: [
    {
      name: "theValue",
      title: "取值",
      propType: "string"
    },
    {
      name: "onChange",
      title: "输入变化回调",
      propType: "event"
    }
  ]
};
const componentsDesc = [buttonDesc, inputDesc];

export const usingComponentGroups = [
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
export const componentGroupsData = [
  {
    source: "npm/componentGroupA",
    version: "1.0",
    name: "组件库A",
    components: componentsDesc
  },
  {
    source: "npm/componentGroupB",
    version: "1.0",
    name: "组件库B",
    components: componentsDesc
  },
  {
    source: "npm/componentGroupC",
    version: "1.0",
    name: "组件库C",
    components: componentsDesc
  }
];

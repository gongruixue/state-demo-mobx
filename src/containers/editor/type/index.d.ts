export type PropType = "string" | "event";
export type PropsDesc = Array<{
  name: string;
  title: string;
  propType: PropType;
}>;
export type ComponentDesc = {
  name: string;
  title: string;
  props: PropsDesc;
};

export type UsingComponentGroups = Array<{
  source: string;
  version: string;
}>;
export type ComponentGroupBasicInfo = {
  name: string;
  source: string;
  version: string;
};

export type ComponentGroupData = ComponentGroupBasicInfo & {
  components: Array<ComponentDesc>;
};
export type ComponentGroupsData = Array<ComponentGroupData>;
export type IUINode = {
  id: string;
  name: string;
  source: string;
  component: string;
  children?: Array<IUINode>;
  props: {
    [propName: string]: any;
  };
};
export type EmptyUIJson = {};
export type UIJson = EmptyUIJson | IUINode;

export type EditorState = {
  usingComponentGroups: UsingComponentGroups;
  componentGroupsData: ComponentGroupsData;
  uiJson: UIJson;
  active: string | null;
};

/**
 * 用 source 和 component 唯一标识一个组件，两者合称为 ComponentIdObj
 */
export type ComponentIdObj = {
  source: string;
  component: string;
};

export enum Position {
  inside = "inside",
  sibling = "sibling"
}

export type CardData = {
  uiTree: IUINode;
  usingComponentGroups: UsingComponentGroups;
};

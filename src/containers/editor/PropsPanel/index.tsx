import { PropField, getPropSetter } from "./PropsSetter";
import "./index.scss";
import { useEditor } from "@editor/model/editor";
import { observer } from "mobx-react";

export const PropsPanel = observer(() => {
  const editor = useEditor();
  const activeNode = editor.active;

  const content = (() => {
    if (!activeNode) {
      return <div>未选中任何元素</div>;
    }
    const changeProps = (name: string, val: string) => {
      // 这个和childrenProp有冲突。。。。
      activeNode.changeProp(name, val);
    };
    const { props: propsDesc } = activeNode.componentIns;
    return propsDesc.map((propDesc) => {
      const Setter = getPropSetter(propDesc.propType);
      const { name: propName } = propDesc;
      const val = activeNode.props.get(propName);
      return (
        <PropField key={propName} label={propDesc.displayName}>
          <Setter value={val} onChange={(val) => changeProps(propName, val)} />
        </PropField>
      );
    });
  })();
  return (
    <div className="props-panel">
      <h3>属性面板</h3>
      {content}
    </div>
  );
});

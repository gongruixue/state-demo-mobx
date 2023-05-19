import { Collapse, List } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import { useEditor } from "@editor/model/editor";
import "./index.scss";
import { observer } from "mobx-react";

export const ComponentList = observer(() => {
  const editor = useEditor();
  const compManager = editor.compManager;

  const groupList = compManager.componentGroups.map((group) => {
    const { components, source, name: groupName } = group;
    return (
      <Collapse.Panel key={source} header={groupName} itemKey={source}>
        <List
          dataSource={components}
          renderItem={(component: typeof components[0]) => (
            <List.Item key={component.uniqIdString}>
              {component.displayName}
            </List.Item>
          )}
        />
      </Collapse.Panel>
    );
  });
  return (
    <div className="component-list">
      <h3>组件列表</h3>
      <Collapse>{groupList}</Collapse>
    </div>
  );
});

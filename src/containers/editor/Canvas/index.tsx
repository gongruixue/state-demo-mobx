import { Tree } from "@douyinfe/semi-ui";
import { useEditor } from "@editor/model/editor";
import { isEmpty, reduce } from "lodash";
import { observer } from "mobx-react";
import React, { useMemo } from "react";
import { IUINode } from "@editor/type";
import "./index.scss";

type TreedataType = NonNullable<React.ComponentProps<typeof Tree>["treeData"]>;
function uiJson2treeData(json: IUINode): TreedataType {
  if (isEmpty(json)) {
    return [];
  }
  const { id, name, children } = json;
  const data: TreedataType[number] = {
    label: name,
    value: id,
    key: id
  };
  if (children) {
    data.children = reduce(
      children,
      (res, child) => {
        res = res.concat(uiJson2treeData(child));
        return res;
      },
      [] as TreedataType
    );
  }
  return [data];
}

export const Canvas = observer(() => {
  const editor = useEditor();
  const uiTree = editor.uiTree;

  if (!uiTree) {
    return (
      <div className="canvas">
        <h3>画布</h3>
      </div>
    );
  }
  const treeData = uiJson2treeData(uiTree!);

  // const uiJson = useEditorSelector((state) => state.uiJson);
  // const activeNode = useEditorSelector((state) => state.active);
  // const treeData = useMemo(() => uiJson2treeData(uiJson), [uiJson]);
  // const dispatch = useAppDispatch();
  const changeActive = (active: string) => {
    editor.changeActive(active);
  };
  return (
    <div className="canvas">
      <h3>画布</h3>
      <Tree treeData={treeData} onChange={changeActive} />
    </div>
  );
});

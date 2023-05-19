import { Layout } from "@douyinfe/semi-ui";
import { Canvas } from "./Canvas";
import { ComponentList } from "./ComponentList";
import { PropsPanel } from "./PropsPanel";
import {
  editorStore,
  EditorStoreProvider,
  useEditor
} from "@editor/model/editor";
import { useEffect } from "react";
import { observer } from "mobx-react";

const { Content, Sider } = Layout;

const RawEditor = observer(() => {
  const editor = useEditor();
  useEffect(() => {
    editor.fetchCardData();
  }, []);
  return (
    <div>
      <Layout>
        <Sider>
          <ComponentList />
        </Sider>
        <Content>
          <Canvas />
        </Content>
        <Sider>
          <PropsPanel />
        </Sider>
      </Layout>
    </div>
  );
});

export function Editor() {
  return (
    <EditorStoreProvider value={editorStore}>
      <RawEditor />
    </EditorStoreProvider>
  );
}

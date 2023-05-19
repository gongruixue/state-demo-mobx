import { createContext, useContext } from "react";
import { mockApi } from "@util";
import {
  types,
  Instance,
  onSnapshot,
  cast,
  addMiddleware,
  SnapshotIn
} from "mobx-state-tree";
import { ComponentGroup, ComponentManager } from "./components";
import { UITree, UINode } from "./uiTree";
import { cardData } from "@editor/mock/cardData";
import { componentGroupsData } from "@editor/mock/componentInfo";
import { UIJson, CardData, IUINode } from "@editor/type";
import { simpleActionLogger } from "mst-middlewares";

export interface IEditorStore {
  active: null | string;
  compManager: Instance<typeof ComponentManager>;
  uiTree: IUINode;
}
const EditorStore = types
  .model({
    uiTree: types.maybe(UITree),
    active: types.maybeNull(types.reference(UINode)),
    compManager: ComponentManager
  })
  .actions((self) => ({
    fetchCardData() {
      mockApi(cardData).then((res) => {
        this.fetchCardDataSucceed(res);
      });
    },
    fetchCardDataSucceed(cardData: CardData) {
      self.uiTree = cast(cardData.uiTree);
      self.compManager.setUsingCompGroups(cardData.usingComponentGroups);
    },
    changeActive(id: string) {
      self.active = cast(id);
    }
  }));

export const editorStore = EditorStore.create({
  active: null,
  compManager: {
    usingComponentGroups: [],
    componentGroups: []
  }
});

onSnapshot(editorStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
});
addMiddleware(editorStore, simpleActionLogger);

export type EditorInstance = Instance<typeof EditorStore>;
const EditorStoreContext = createContext<null | EditorInstance>(null);

export const EditorStoreProvider = EditorStoreContext.Provider;
export function useEditor() {
  const store = useContext(EditorStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
export { UINode };

window.editorStore = editorStore;

import { types, IAnyModelType, Instance, getRoot } from "mobx-state-tree";
import { IEditorStore } from "./editor";

let UINode = types
  .model({
    id: types.identifier,
    name: types.string,
    source: types.string,
    component: types.string,
    /** 如果指明UINode类型，会导致UINode循环引用，变成any，所以只能先定义为any
     * 使用时需要cast type：children as Array<Instance<typeof UINode>>
     */
    children: types.maybe(types.array(types.late((): IAnyModelType => UINode))),
    /** map类型，一定要用.set() .get() */
    props: types.optional(types.map(types.frozen()), {})
  })
  .views((self) => ({
    /** 试图定义computed来获取带类型的children，但不行
     * 因为推导UINode类型时需要先推导childrenProp的返回类型，就也造成了循环
     */
    // get childrenProp () {
    //   return self.children as Array<Instance<typeof UINode>>
    // },
    get componentIns() {
      const root = getRoot(self) as IEditorStore;
      return root.compManager.getComponent({
        source: self.source,
        component: self.component
      });
    }
  }))
  .actions((self) => ({
    changeProp(name: string, val: any) {
      self.props.set(name, val);
    }
  }));

const UITree = UINode.props({})
  .views((self) => ({}))
  .actions((self) => ({}));

export { UINode, UITree };

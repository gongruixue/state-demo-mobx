import { groupBy, keyBy } from "lodash";
import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  cast,
  getParent
} from "mobx-state-tree";
import { mockApi } from "@util";
import { componentGroupsData } from "@editor/mock/componentInfo";
import { ComponentGroupsData, UsingComponentGroups } from "@editor/type";

/**
 * 用 source 和 component 唯一标识一个组件，两者合称为 ComponentIdObj
 */
export type ComponentIdObj = {
  source: string;
  component: string;
};

const Prop = types
  .model({
    name: types.string,
    title: types.maybe(types.string),
    propType: types.enumeration(["string", "event"])
  })
  .views((self) => ({
    get displayName() {
      return self.title || self.name;
    },
    get uniqKey() {
      return self.name;
    }
  }));

const Component = types
  .model({
    name: types.string,
    title: types.string,
    props: types.optional(types.array(Prop), [])
  })
  .views((self) => ({
    get displayName() {
      return self.title || self.name;
    },
    get uniqIdString(): string {
      const group = getParent(self) as Instance<typeof ComponentGroup>;
      return group.source + self.name;
    }
  }));

export const ComponentGroup = types
  .model({
    name: types.string,
    source: types.string,
    version: types.string,
    components: types.array(Component)
  })
  .views((self) => ({
    get componentMap() {
      return keyBy(self.components, "name");
    }
  }))
  .views((self) => ({
    getComponent(name: string) {
      return self.componentMap[name];
    }
  }));

export const ComponentManager = types
  .model({
    usingComponentGroups: types.frozen<UsingComponentGroups>([]),
    componentGroups: types.array(ComponentGroup)
  })
  .views((self) => ({
    get compGroupMap() {
      return keyBy(self.componentGroups, "source");
    }
  }))
  .views((self) => ({
    getComponent({ source, component }: ComponentIdObj) {
      return self.compGroupMap[source]?.getComponent(component);
    }
  }))
  .actions((self) => ({
    setUsingCompGroups(data: UsingComponentGroups) {
      self.usingComponentGroups = data;
      this.fetchCompGroups();
    },
    fetchCompGroups() {
      mockApi(componentGroupsData as ComponentGroupsData).then((res) => {
        this.fetchCompGroupsSucceed(res);
      });
    },
    fetchCompGroupsSucceed(res: ComponentGroupsData) {
      self.componentGroups = cast(res);
    }
  }));

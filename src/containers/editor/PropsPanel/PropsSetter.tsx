import { PropType } from "@editor/type";
import { ReactElement } from "react";
import { Input } from "@douyinfe/semi-ui";
import { observer } from "mobx-react";

export const PropField = observer(
  ({ label, children }: { label: string; children: ReactElement }) => {
    return (
      <div className="prop-field">
        <div className="prop-field-label">{label}</div>
        <div className="prop-field-setter">{children}</div>
      </div>
    );
  }
);

export function getPropSetter(propType: PropType) {
  return Input;
}

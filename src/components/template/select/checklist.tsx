import { IFormComponent } from "../interface";
import { FC, useState, useMemo } from "react";
import { Checkbox, Col, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import "./checklist.less";
import { splitPlus } from "../utils";
// import IntlDep from "../intl";

const CheckboxGroup = Checkbox.Group;

const CheckBoxListString: FC<
  IFormComponent & { enableAdd?: boolean; data: string[] }
> = ({ value, onChange, data, loader }) => {
  const checkedList = useMemo(() => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value !== "string" || value === "") {
      return [];
    }
    if (loader) {
      return loader(value);
    }
    return splitPlus(value, ",");
  }, [value, loader]);

  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  // 选项计算
  const allOptions: string[] = data;

  const changeEvent = (list: CheckboxValueType[]) => {
    const arr: any = list;
    if (onChange) {
      if (loader) {
        onChange(loader(arr, true));
      } else if (Array.isArray(value)) {
        onChange(list);
      } else {
        onChange(list.join(","));
      }
    }
    setIndeterminate(!!list.length && list.length < allOptions.length);
    setCheckAll(list.length === allOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    changeEvent(e.target.checked ? allOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Row className="comp-check-list">
      <Col span={5}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          {/* <IntlDep id="SELECT_ALL" /> */}
          select all
        </Checkbox>
      </Col>
      <Col span={19} style={{ transform: "translate(-20px, 0)" }}>
        <CheckboxGroup
          options={allOptions}
          value={checkedList}
          onChange={changeEvent}
        />
      </Col>
    </Row>
  );
};

export default CheckBoxListString;

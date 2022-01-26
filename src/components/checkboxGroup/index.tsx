import "./index.less";
import { FC, useEffect, useState } from "react";
import { Checkbox, Col, Row } from "antd";

const CheckGroup = Checkbox.Group;

interface IProps {
  showCheckAll?: boolean;
  //多选项集合
  optionList: string[];
  checkedOptions: (list: any) => void;
  defaultList?: string[];
}

const CheckboxGroup: FC<IProps> = ({
  optionList,
  showCheckAll,
  checkedOptions,
  defaultList,
}) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (defaultList && defaultList.length) {
      setCheckedList(defaultList);
      setCheckAll(defaultList.length === optionList.length);
      setIndeterminate(
        !!defaultList.length && defaultList.length < optionList.length
      );
      checkedOptions(defaultList);
    }
  }, [defaultList]);
  const onChange = (list: any) => {
    setCheckedList(list);
    checkedOptions(list);
    setIndeterminate(!!list.length && list.length < optionList.length);
    setCheckAll(list.length === optionList.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? optionList : []);
    checkedOptions(e.target.checked ? optionList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (
    <div className="edge-checkbox-container">
      {showCheckAll && (
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
          style={{ marginBottom: "10px" }}
        >
          Check all
        </Checkbox>
      )}
      <Checkbox.Group
        defaultValue={defaultList}
        value={checkedList}
        onChange={onChange}
        className="edge-checkbox-group"
      >
        <Row>
          {optionList &&
            optionList.map((item: any, index: number) => (
              <Col span={12} key={index}>
                <Checkbox value={item} style={{ marginBottom: "10px" }}>
                  {JSON.parse(item).name}
                </Checkbox>
              </Col>
            ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
};

export default CheckboxGroup;

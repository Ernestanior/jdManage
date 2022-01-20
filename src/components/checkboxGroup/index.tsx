import "./index.less";
import { FC, useState } from "react";
import { Checkbox, Col, Row } from "antd";

const CheckGroup = Checkbox.Group;

interface IProps {
  showCheckAll?: boolean;
  //多选项集合
  optionList: string[];
  checkedOptions: (list: any) => void;
}

const CheckboxGroup: FC<IProps> = ({
  optionList,
  showCheckAll,
  checkedOptions,
}) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: any) => {
    setCheckedList(list);
    checkedOptions(list);
    setIndeterminate(!!list.length && list.length < optionList.length);
    setCheckAll(list.length === optionList.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? optionList : []);
    checkedOptions(checkedList);
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
        value={checkedList}
        onChange={onChange}
        className="edge-checkbox-group"
      >
        <Row>
          {optionList.map((item) => (
            <Col span={8} key={item}>
              <Checkbox value={item} style={{ marginBottom: "10px" }}>
                {item}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
};

export default CheckboxGroup;

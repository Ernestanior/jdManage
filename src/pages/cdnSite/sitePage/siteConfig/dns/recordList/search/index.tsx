import React, { FC, ReactElement } from "react";
import "./index.less";
import { Input, Button, Row, Col } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SearchBox from "./searchBox";
// import PubSub from "pubsub-js";

const Index: FC = (): ReactElement => {
  // 筛选组件展示切换
  const [show, setShow] = React.useState<Boolean>(false);
  // 输入框内容
  const [input, setInput] = React.useState<String>("");
  // 允许Enter回车键触发搜索
  const handleEnter = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };
  // 发布record筛选条件的订阅
  const onSearch = () => {};
  // const onSearch = () => PubSub.publish("RecordSearch", { record: input });
  // 输入框尾部图标按钮
  const suffix = (
    <button onClick={() => onSearch()} className="search-input-suffix">
      <SearchOutlined />
    </button>
  );

  return (
    <div>
      <Row>
        <Col span={19}>
          <Input
            placeholder="记录查询"
            allowClear
            className="search-input"
            suffix={suffix}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={handleEnter}
          />
        </Col>
        <Col offset={1} span={3}>
          <Button className="search-button" onClick={() => setShow(!show)}>
            显示筛选
            {show ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Button>
        </Col>
      </Row>
      {show ? <SearchBox /> : ""}
    </div>
  );
};

export default Index;

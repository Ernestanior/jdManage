import { FC, ReactElement, useMemo, useState } from "react";
import Customer from "./Customer";
import Sales from "./Sales";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Index: FC = (): ReactElement => {
  const [props, setProps] = useState("1");
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.cusMana) || "1", [path]);
  const handleOnChange = (e: string) => {
    console.log(e, "e");
    setProps(e);
  };
  return (
    <Tabs
      style={{ marginBottom: 32 }}
      //activeKey={index}
      type="card"
      onChange={(activeKey) => {
        navigator(".", { state: { cusMana: activeKey } });
        handleOnChange(activeKey);
      }}
    >
      <TabPane tab="注册客户" key="1">
        <Customer props={props} />
      </TabPane>
      <TabPane tab="用户管理" key="2">
        <Sales props={props} />
      </TabPane>
    </Tabs>
  );
};

export default Index;

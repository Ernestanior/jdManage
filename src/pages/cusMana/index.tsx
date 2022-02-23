import { FC, ReactElement, useMemo } from "react";
import Content from "./content";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Index: FC = (): ReactElement => {
  // console.log(useLocation());

  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.cusMana) || "reg", [path]);
  // const handleOnChange = (e: string) => {
  //   setProps(e);
  // };
  return (
    <Tabs
      style={{ marginBottom: 32 }}
      activeKey={index}
      type="card"
      onChange={(activeKey) => {
        navigator(".", { state: { cusMana: activeKey } });
        // handleOnChange(activeKey);
      }}
    >
      <TabPane tab="注册客户" key="reg">
        <Content />
      </TabPane>
      <TabPane tab="销售客户" key="sales">
        <Content />
      </TabPane>
    </Tabs>
  );
};

export default Index;

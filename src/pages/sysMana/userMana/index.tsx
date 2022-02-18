import { FC, ReactElement, useMemo, useState } from "react";
import Admin from "./admin";
import Agent from "./agent";
import Sales from "./sales";
import Operation from "./operation";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const [role, setRole] = useState<string>("admin");
  
  const handleOnchange = (e: string) => {
    if (e === "1") {
      setRole("admin");
    } else if (e === "2") {
      setRole("operation");
    } else if (e === "3") {
      setRole("sales");
    } else if (e === "4") {
      setRole("agent");
    }
  };

  return (
    <Tabs
    type="card"
      defaultActiveKey="1"
      style={{ marginBottom: 32 }}
      onChange={(e: string) => handleOnchange(e)}
    >
      <TabPane tab="管理员" key="1">
        <Admin type={role} key="1" />
      </TabPane>
      <TabPane tab="运维" key="2">
        <Operation type={role} key="2" />
      </TabPane>
      <TabPane tab="销售" key="3">
        <Sales type={role} key="3" />
      </TabPane>
      <TabPane tab="代理" key="4">
        <Agent type={role} key="4" />
      </TabPane>
    </Tabs>
  );
};

export default Index;

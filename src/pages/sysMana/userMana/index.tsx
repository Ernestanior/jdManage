import { FC, ReactElement, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import UserManageTable from "./userManageConfig";
import Agency from "./agency";
import Operation from "./operation";
import Sale from "./sale";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  // const navigator = useNavigate();
  // const path: any = useLocation().state;
  // const index = useMemo(() => (path && path.siteConfig) || "1", [path]);
  const [role, setRole] = useState<string>("admin");
  const handleOnchange = (e: string) => {
    console.log(e);
    
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
      defaultActiveKey="1"
      style={{ marginBottom: 32 }}
      onChange={(e: string) => handleOnchange(e)}
    >
      <TabPane tab="管理员" key="1">
        <UserManageTable type={role} group={1} key="1" />
      </TabPane>
      <TabPane tab="运维" key="2">
        <UserManageTable type={role} group={1} key="2" />
        <Agency />
      </TabPane>
      <TabPane tab="销售" key="3">
        <UserManageTable type={role} group={2} key="3" />
        <Operation />
      </TabPane>
      <TabPane tab="代理" key="4">
        <UserManageTable type={role} group={2} key="4" />
        <Sale />
      </TabPane>
    </Tabs>
  );
};

export default Index;

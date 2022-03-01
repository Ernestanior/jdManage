import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import User from "./userMana";
import { Tabs } from "antd";

const Index: FC = (): ReactElement => {
  const { TabPane } = Tabs;
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.sysMana) || "user", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { sysMana: activeKey } })
      }
    >
      <TabPane tab="用户管理" key="user">
        <User />
      </TabPane>
    </Tabs>
  );
};

export default Index;

import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import List from "./list";
import { Tabs } from "antd";

const Index: FC = (): ReactElement => {
  const { TabPane } = Tabs;
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.admin) || "list", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) => navigator(".", { state: { admin: activeKey } })}
    >
      <TabPane tab="管理员列表" key="list">
        <List />
      </TabPane>
    </Tabs>
  );
};

export default Index;

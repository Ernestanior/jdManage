import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import List from "./list";
import { Tabs } from "antd";

const Index: FC = (): ReactElement => {
  const { TabPane } = Tabs;
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.city) || "list", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) => navigator(".", { state: { city: activeKey } })}
    >
      <TabPane tab="城市列表" key="list">
        <List />
      </TabPane>
    </Tabs>
  );
};

export default Index;

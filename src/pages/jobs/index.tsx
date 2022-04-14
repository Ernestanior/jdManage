import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import List from "./list";
import { Tabs } from "antd";

const Index: FC = (): ReactElement => {
  const { TabPane } = Tabs;
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.jobs) || "list", [path]);
  return (
    <>
      <Tabs
        activeKey={index}
        type="card"
        onChange={(activeKey) => navigator(".", { state: { jobs: activeKey } })}
      >
        <TabPane tab="职位列表" key="list">
          <List />
        </TabPane>
      </Tabs>
      <Tabs
        activeKey={index}
        type="card"
        onChange={(activeKey) => navigator(".", { state: { jobs: activeKey } })}
      >
        <TabPane tab="职位列表" key="list">
          123
        </TabPane>
      </Tabs>
    </>
  );
};

export default Index;

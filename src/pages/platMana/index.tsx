import { FC, ReactElement, useMemo } from "react";
import Content from "./content";
import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.platMana) || "", [path]);

  return (
    <Tabs
      style={{ marginBottom: 32 }}
      activeKey={index}
      onChange={(activeKey: string) =>
        navigator(".", { state: { platMana: activeKey } })
      }
      destroyInactiveTabPane
    >
      <TabPane tab="全部" key="">
        <Content />
      </TabPane>
      <TabPane tab="国内加速(备案)" key="acceleration-china-icp-licence">
        <Content />
      </TabPane>
      <TabPane tab="国内加速(免备案)" key="acceleration-china">
        <Content />
      </TabPane>
      <TabPane tab="全球加速" key="acceleration-global">
        <Content />
      </TabPane>
      <TabPane tab="全球高防" key="ddos-global">
        <Content />
      </TabPane>
      <TabPane tab="自定义平台" key="customized">
        <Content />
      </TabPane>
    </Tabs>
  );
};

export default Index;

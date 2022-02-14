import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import All from "./all";
import ChinaAccel from "./chinaAccel";
import ChinaAccellcp from "./chinaAccellcp";
import GlobalAccel from "./globalAccel";
import GlobalDdos from "./globalDdos";
import CustomCDN from "./customCDN";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.platMana) || "1", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { platMana: activeKey } })
      }
    >
      <TabPane tab="全部" key="1">
        <All />
      </TabPane>
      <TabPane tab="国内加速(备案)" key="2">
        <ChinaAccellcp />
      </TabPane>
      <TabPane tab="国内加速(免备案)" key="3">
        <ChinaAccel />
      </TabPane>
      <TabPane tab="全球加速" key="4">
        <GlobalAccel />
      </TabPane>
      <TabPane tab="全球高防" key="5">
        <GlobalDdos />
      </TabPane>
      <TabPane tab="自定义平台" key="6">
        <CustomCDN />
      </TabPane>
    </Tabs>
  );
};

export default Index;

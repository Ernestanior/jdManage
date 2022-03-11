import { FC, ReactElement, useMemo } from "react";
import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.less";

import Info from "./info";
import Log from "./log";
import ResetPwd from "./resetPwd";
import Security from "./security";
import WorkOrder from "./workOrder";

const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();

  const path: any = useLocation().state;
  const user = (path && path.user) || 1;
  const index = useMemo(() => user.toString() || "1", [user]);

  return (
    <Tabs
      destroyInactiveTabPane
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator("/user", { state: { user: activeKey } })
      }
    >
      <TabPane tab="个人中心" key="1">
        <Info />
      </TabPane>
      <TabPane tab="安全" key="2">
        <Security />
      </TabPane>
      <TabPane tab="操作日志" key="3">
        <Log />
      </TabPane>
      <TabPane tab="修改密码" key="4">
        <ResetPwd />
      </TabPane>
      <TabPane tab="工单系统" key="5">
        <WorkOrder />
      </TabPane>
      <TabPane tab="计费系统" key="6">
        计费系统
      </TabPane>
    </Tabs>
  );
};

export default Index;

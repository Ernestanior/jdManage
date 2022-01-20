import { FC, ReactElement, useMemo } from "react";
import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.less";

import Info from "./info";
import Log from "./log";
import ResetPwd from "./resetPwd";
import Security from "./security";

const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const path: any = useLocation().state;
  const { user } = path;
  const navigate = useNavigate();
  const index = useMemo(() => user.toString() || "1", [user]);
  const onChange = (key: string) => {
    navigate("/user", { state: { user: key } });
  };
  return (
    <Tabs activeKey={index} type="card" onChange={onChange}>
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
        工单系统
      </TabPane>
      <TabPane tab="计费系统" key="6">
        计费系统
      </TabPane>
    </Tabs>
  );
};

export default Index;

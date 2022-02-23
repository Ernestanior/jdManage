import { FC, ReactElement } from "react";
import Source from "./source";
import Ssl from "./ssl";
import Basic from "./basic";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Index: FC = (): ReactElement => {
  return (
    <Tabs defaultActiveKey="2.1" style={{ marginBottom: 32 }}>
      <TabPane tab="源点设置" key="2.1">
        <Source />
      </TabPane>
      <TabPane tab="基础设置" key="2.2">
        <Basic />
      </TabPane>
      <TabPane tab="SSL设置" key="2.3">
        <Ssl />
      </TabPane>
    </Tabs>
  );
};

export default Index;

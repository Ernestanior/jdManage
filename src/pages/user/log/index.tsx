import React, { FC, ReactElement, useState } from "react";
import "./index.less";
import { Tabs } from "antd";
import Admin from "./admin";
import NewTemplate from "./newTemplate";

const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const [role, setrole] = useState<string>("1");
  const handleOnchange = (e: string) => {
    console.log(e);
    if (e === "2") {
      setrole("2");
    } else setrole("1");
  };
  return (
    <Tabs
      defaultActiveKey="1"
      style={{ marginBottom: 32 }}
      onChange={(e: string) => handleOnchange(e)}
    >
      <TabPane tab="管理员操作日志" key="1">
        <Admin role={role}/>
      </TabPane>

      <TabPane tab="客户操作日志" key="2">
        <Admin role={role} />
      </TabPane>
      <TabPane tab="Template" key="3">
     <NewTemplate/>
      </TabPane>
    </Tabs>
  );
};

export default Index;

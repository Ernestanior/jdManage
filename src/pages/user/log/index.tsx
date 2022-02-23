import React, { FC, ReactElement, useState } from "react";
import "./index.less";
import { Tabs } from "antd";
import AdminWorklog from "./adminWorklog";
import CustomerWorklog from "./customerWorklog";

const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const [role, setrole] = useState<number>(1);
  const handleOnchange = (e: string) => {
    console.log(e);
    if (e === "1") {
      setrole(1);
    } else if(e === "2"){
      setrole(2);}
  };
  return (
    <Tabs
      defaultActiveKey="1"
      style={{ marginBottom: 32 }}
      onChange={(e: string) => handleOnchange(e)}
    >
      <TabPane tab="管理员操作日志" key="1">
        <AdminWorklog type={role} />
      </TabPane>
      <TabPane tab="客户操作日志" key="2">
        <CustomerWorklog type={role} />
      </TabPane>
      {/* <TabPane tab="客户操作日志" key="3">
        <Admin role={role} />
      </TabPane>
      <TabPane tab="Template" key="4">
        <Admin role={role} />
      </TabPane> */}
    </Tabs>
  );
};

export default Index;

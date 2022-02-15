import { FC, ReactElement, useState } from "react";
import CusManageTable from "./cusManageConfig";


import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const [channel, setChannel] = useState<string>("reg");
  const handleOnchange = (e: string) => {
    console.log(e);

    if (e === "1") {
      setChannel("reg");
    } else if (e === "2") {
      setChannel("sales");
    }
  };
  return (
    <Tabs
      defaultActiveKey="1"
      style={{ marginBottom: 32 }}
      onChange={(e: string) => handleOnchange(e)}
    >
      <TabPane tab="注册客户" key="1">
        <CusManageTable type="customer" group={0} channel={channel} />
      </TabPane>
      <TabPane tab="用户管理" key="2">
        <CusManageTable type="customer" group={0} channel={channel} />
      </TabPane>
    </Tabs>
  );
};

export default Index;

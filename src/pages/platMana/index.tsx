import { FC, ReactElement, useMemo, useState } from "react";
import All from "./allPlatform";
import AccelerationChinaICP from "./acceleration-china-icp-licence";
import AccelerationChina from "./acceleration-china";
import AccelerationGlabal from "./acceleration-global";
import DdoosGlobal from "./ddos-global";
import Customized from "./customized";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const [role, setRole] = useState<string>("");
  const handleOnchange = (e: string) => {
    console.log(e);

    if (e === "1") {
      setRole("");
    } else if (e === "2") {
      setRole("acceleration-china-icp-licence");
    } else if (e === "3") {
      setRole("acceleration-china");
    } else if (e === "4") {
      setRole("acceleration-global");
    } else if (e === "5") {
      setRole("ddos-global");
    } else if (e === "6") {
      setRole("customized");
    }
  };

  return (
    <Tabs
      defaultActiveKey="1"
      style={{ marginBottom: 32 }}
      onChange={(e: string) => handleOnchange(e)}
    >
      <TabPane tab="全部" key="1">
        <All  />
      </TabPane>
      <TabPane tab="国内加速(备案)" key="2">
        <AccelerationChinaICP  />
      </TabPane>
      <TabPane tab="国内加速(免备案)" key="3">
        <AccelerationChina  />
      </TabPane>
      <TabPane tab="全球加速" key="4">
        <AccelerationGlabal />
      </TabPane>
      <TabPane tab="全球高防" key="5">
        <DdoosGlobal  />
      </TabPane>
      <TabPane tab="自定义平台" key="6">
        <Customized />
      </TabPane>
    </Tabs>
  );
};

export default Index;

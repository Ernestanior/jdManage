import "./index.less";
import { FC, useEffect, useMemo, useState } from "react";
import { Drawer, Select, Tabs } from "antd";
import { useDnsDomainList } from "@/store/network/dns";
import dnsService from "@/store/network/dns/service";
import DnsSelector from "./components/dnsSelector";
import { Btn } from "@/components/button";
import { useSuffix } from "@/store/network/site";
import siteService from "@/store/network/site/service";
import useUid from "@/hooks/useUid";
import { useNavigate, useLocation } from "react-router-dom";

import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
const { TabPane } = Tabs;
interface IProps {
  title: string;
  visible: boolean;
  // cusList: any[];
  onClose: () => void;
}
const { Option } = Select;
const CreateDrawer: FC<IProps> = ({ title, visible, onClose }) => {
  const [index, setIndex] = useState<string>("1");
  const uid = useUid();
  const navigator = useNavigate();
  const path: any = useLocation().state;
  // const index = useMemo(() => (path && path.dnsCreate) || "1", [path]);

  useEffect(() => {
    dnsService.findCustomerLineList();
    siteService.getSuffix(uid);
  }, []);
  const handleClose = () => {
    setIndex("1");
    onClose();
    dnsService.createBatchRecordsResult$ = [];
  };
  return (
    <Drawer
      title={title}
      width={680}
      onClose={handleClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="dns-create-drawer"
    >
      <Tabs
        centered
        style={{ width: "100%", color: "aaa" }}
        activeKey={index}
        // onChange={(activeKey) =>
        //   navigator(".", { state: { dnsCreate: activeKey } })
        // }
      >
        <TabPane tab="步骤1：导入记录" key="1">
          <FirstStep
            onClose={handleClose}
            next={(domains) => {
              navigator(".", { state: { domains } });
              setIndex("2");
            }}
          />
        </TabPane>
        <TabPane tab="步骤2：DNS指向" key="2">
          <SecondStep
            onClose={handleClose}
            next={() => {
              // navigator(".", { state: { dnsCreate: "3" } });
              setIndex("3");
            }}
            prev={() => {
              // navigator(".", { state: { dnsCreate: "1" } });
              setIndex("1");
            }}
          />
        </TabPane>
        <TabPane tab="步骤3：验证DNS指向" key="3">
          <ThirdStep
            onClose={handleClose}
            prev={() => {
              // navigator(".", { state: { dnsCreate: "2" } });
              setIndex("2");
            }}
          />
        </TabPane>
      </Tabs>
    </Drawer>
  );
};
export default CreateDrawer;

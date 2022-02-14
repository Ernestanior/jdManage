// import "./index.less";
import { FC, useEffect, useMemo, useState } from "react";
import {
  Form,
  Drawer,
  Input,
  Select,
  Switch,
  notification,
  Row,
  Button,
} from "antd";
import { useDnsDomainList } from "@/store/network/dns";
import dnsService from "@/store/network/dns/service";
import DnsSelector from "../components/dnsSelector";
import { Btn } from "@/components/button";
import { useSuffix } from "@/store/network/site";
import siteService from "@/store/network/site/service";
import useUid from "@/hooks/useUid";
interface IProps {
  title: string;
  visible: boolean;
  // cusList: any[];
  onClose: () => void;
}
const { Option } = Select;
const CreateDrawer: FC<IProps> = ({ title, visible, onClose }) => {
  const uid = useUid();
  const dnsList = useDnsDomainList();
  const suffix = useSuffix();
  useEffect(() => {
    dnsService.findDnsDomain({
      searchPage: { page: 1, pageSize: 9999 },
      uid: "",
    });
    siteService.getSuffix(uid);
  }, []);
  console.log(dnsList);
  const ll = [{ domain: "edgetest.xyz", record: "test" }];
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const onFinish = (value: any) => {};
  const dnsChange = (uid: string) => {
    console.log(uid);
  };
  return (
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 550,
          marginLeft: 5,
        }}
      >
        已添加再DNS管理，从DNS管理中选择
        <Btn type="primary" boxShadow>
          添加
        </Btn>
      </span>
      {dnsList && <DnsSelector dnsList={dnsList.content}></DnsSelector>}
    </Drawer>
  );
};
export default CreateDrawer;

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
import DnsSelector from "./components/dnsSelector";
import { Btn } from "@/components/button";
import { useSuffix } from "@/store/network/site";
import siteService from "@/store/network/site/service";
import useUid from "@/hooks/useUid";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
interface IProps {
  title: string;
  visible: boolean;
  // cusList: any[];
  onClose: () => void;
}
const { Option } = Select;
const CreateDrawer: FC<IProps> = ({ title, visible, onClose }) => {
  const [first, setFirst] = useState<boolean>(true);
  const [second, setSecond] = useState<boolean>(false);
  const [third, setThird] = useState<boolean>(false);
  const toStep2 = () => {};
  const toStep3 = () => {
    setSecond(false);
    setThird(true);
  };
  const backStep2 = () => {
    setSecond(true);
    setThird(false);
  };
  const backStep1 = () => {
    setFirst(true);
    setSecond(false);
  };
  return (
    <>
      {visible && (
        <>
          <FirstStep
            onClose={() => onClose()}
            next={() => console.log("gg")}
            title={title}
            visible={first}
          />
          <SecondStep
            onClose={() => onClose()}
            title={title}
            visible={second}
          />
          <ThirdStep onClose={() => onClose()} title={title} visible={third} />
        </>
      )}
    </>
  );
};
export default CreateDrawer;

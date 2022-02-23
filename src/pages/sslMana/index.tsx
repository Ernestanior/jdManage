import { FC, ReactElement, useState } from "react";
import CusSsl from "./cusSsl";
import Ssl from "./ssl";
import SslDownload from "./sslDownload";
import { Tabs } from "antd";

const Index: FC = (): ReactElement => {
  const { TabPane } = Tabs;
  const [role, setRole] = useState<number>(1);
  const handleOnchange = (e: string) => {
    if (e === "1") {
      setRole(1);
    } else if (e === "2") {
      setRole(2);
    } else if (e === "3") {
      setRole(3);
    }
  };
  // const navigator = useNavigate();
  // const path: any = useLocation().state;
  // const index = useMemo(() => (path && path.sslMana) || "1", [path]);
  return (
    <Tabs defaultActiveKey="1" type="card" onChange={(e) => handleOnchange(e)}>
      <TabPane tab="客户端证书" key="1">
        <CusSsl type={role} />
      </TabPane>
      <TabPane tab="源证书" key="2">
        <Ssl type={role} />
      </TabPane>
      <TabPane tab="证书下载" key="3">
        <SslDownload type={role} />
      </TabPane>
    </Tabs>
  );
};

export default Index;

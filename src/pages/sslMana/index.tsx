import { FC, ReactElement, useMemo, useState } from "react";
import CusSsl from "./cusSsl";
import Ssl from "./oriSsl";
import SslDownload from "./sslDownload";
import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const Index: FC = (): ReactElement => {
  const { TabPane } = Tabs;

  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.sslMana) || "cusSsl", [path]);
  return (
    <Tabs
      destroyInactiveTabPane
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { sslMana: activeKey } })
      }
    >
      <TabPane tab="客户端证书" key="cusSsl">
        <CusSsl />
      </TabPane>
      <TabPane tab="源证书" key="oriSsl">
        <Ssl />
      </TabPane>
      <TabPane tab="证书下载" key="sslDownload">
        <SslDownload />
      </TabPane>
    </Tabs>
  );
};

export default Index;

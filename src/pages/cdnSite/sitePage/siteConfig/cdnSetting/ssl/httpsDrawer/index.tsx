// import "./index.less";
import { FC, useEffect, useState } from "react";
import { Drawer, Switch, notification, Table } from "antd";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { dnsApi, siteApi } from "@/store/api";
import useUid from "@/hooks/useUid";
import { IDomainList } from "@/store/network/dns/interface";

interface IProps {
  title: string;
  visible: boolean;
  onClose: () => void;
}

const HttpsDrawer: FC<IProps> = ({ title, visible, onClose }) => {
  const uid = useUid();
  const [currData, setCurrData] = useState<IDomainList>();
  const loading = useLoading();
  const [refresh, setRefresh] = useState<boolean>(false);
  const handleChange = async (status: boolean, selected: any) => {
    const res = await request(
      status
        ? siteApi.EnableHttps([selected.uid])
        : siteApi.DisableHttps([selected.uid])
    );
    setRefresh(!refresh);
    res.length
      ? res.map((item: any) => notification.error({ message: item.message }))
      : notification.success({ message: "Update Success" });
  };
  useEffect(() => {
    const payload = {
      siteUid: uid,
      sslEnable: 1,
      searchPage: {
        page: 1,
        pageSize: 25,
      },
    };
    const obs = from(request(dnsApi.FindDomain(payload))).subscribe((data) => {
      data && setCurrData(data);
    });
    return () => obs.unsubscribe();
  }, [refresh]);
  const dataSource: any = currData && currData.content;
  const columns = [
    {
      title: "开启SSL域名/记录列表",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "",
      dataIndex: "forceHttps",
      key: "forceHttps",
      render: (status: number, selected: any) => (
        <Switch
          checked={!!status}
          onChange={(e) => handleChange(e, selected)}
        ></Switch>
      ),
    },
  ];

  return (
    <Drawer
      title={title}
      width={520}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      {/* <Button>批量启用</Button>
      <Button>批量禁用</Button> */}
      <Loading display={loading}></Loading>
      <Table dataSource={dataSource} rowKey="uid" columns={columns} />
    </Drawer>
  );
};
export default HttpsDrawer;

// import "./index.less";
import { FC, useEffect, useState } from "react";
import { Drawer, Switch, notification, Table } from "antd";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { siteApi } from "@/store/api";
import useUid from "@/hooks/useUid";
import dnsService from "@/store/network/dns/service";
import { useDomainList } from "@/store/network/dns";

interface IProps {
  title: string;
  visible: boolean;
  onClose: () => void;
}

const HttpsDrawer: FC<IProps> = ({ title, visible, onClose }) => {
  const uid = useUid();
  const currData = useDomainList();
  const loading = useLoading();
  const [refresh, setRefresh] = useState<boolean>(false);
  const handleChange = (status: boolean, selected: any) => {
    from(
      request(
        status
          ? siteApi.EnableHttps([selected.uid])
          : siteApi.DisableHttps([selected.uid])
      )
    ).subscribe((data) => {
      setRefresh(!refresh);
      data.length
        ? data.map((item: any) => notification.error({ message: item.message }))
        : notification.success({ message: "Update Success" });
    });
  };
  useEffect(() => {
    dnsService.findDomain({
      siteUid: uid,
      sslEnable: 1,
      searchPage: {
        page: 1,
        pageSize: 25,
      },
    });
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

// import "./index.less";
import { FC, useEffect, useState } from "react";
import { Drawer, Input, Table } from "antd";

import { useLoading } from "@/components/loading";

import { ISiteOrigin } from ".";
import { IStatSiteOrigin } from "@/store/network/stat/interface";
import { from } from "rxjs";
import request from "@/store/request";
import { statApi } from "@/store/api";
const { Search } = Input;
interface IProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  params: IStatSiteOrigin;
  uid: string;
}

const CreateDrawer: FC<IProps> = ({ title, visible, onClose, params, uid }) => {
  const loading = useLoading();
  const [currData, setCurrData] = useState<ISiteOrigin[]>();
  const onSearch = (keyword: string) => {
    const payload: IStatSiteOrigin = { ...params, keyword, type: "ip-search" };
    if (payload) {
      from(request(statApi.StatSiteOrigin(uid, payload))).subscribe((data) => {
        if (data) {
          setCurrData(data.map((v: any, i: number) => ({ key: i, ...v })));
        }
      });
    }
  };

  const columns = [
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "访问来源",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "访问量",
      key: "count",
      dataIndex: "count",
    },
  ];
  return (
    <Drawer
      title={title}
      width={570}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      <h4>IP查询</h4>
      <Search
        placeholder="(支持模糊查询：例如：192.166)"
        onSearch={onSearch}
        enterButton
        style={{ marginBottom: 20 }}
        loading={loading}
      />
      {currData && <Table columns={columns} dataSource={currData} />}
    </Drawer>
  );
};
export default CreateDrawer;

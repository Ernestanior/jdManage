import { Template } from "@/components/template";
import useUid from "@/hooks/useUid";
import { siteApi } from "@/store/api";
import request from "@/store/request";
import { Tooltip } from "antd";
import moment from "moment";
import { FC, ReactElement, useState } from "react";

const Index: FC = (): ReactElement => {
  const uid = useUid();
  const [currData, setCurrData] = useState({});
  const TempConfig = {
    onSearch: async (params: any) => {
      const { searchPage } = params;
      const res = await request(siteApi.AiLog({ searchPage, uid }));
      res && setCurrData(res);
    },
    closeFilter: true,
    rowId: "uid",
    data: currData,
    config: [
      {
        title: "切换时间",
        dataIndex: "decisionDate",
        key: "decisionDate",
        width: 210,
        render: (e: number) => moment(e).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        title: "调度方式",
        dataIndex: "type",
        width: 110,
        key: "type",
      },
      {
        title: "平台选择",
        dataIndex: "supplierName",
        key: "supplierName",
      },
      {
        title: "区域",
        dataIndex: "lineId",
        key: "lineId",
      },
      {
        title: "细节",
        dataIndex: "stats",
        key: "stats",
        width: 350,
        ellipsis: {
          showTitle: false,
        },
        render: (e: any) => {
          if (e) {
            const key = Object.keys(e);
            const title = `根据响应时间最低判断 [${key.map(
              (item) => `${item}: ${parseInt(e[item])}]`
            )}`;
            return (
              <Tooltip placement="topLeft" title={title}>
                {title}
              </Tooltip>
            );
          } else {
            return "null";
          }
        },
      },
    ],
  };
  return <Template primarySearch="displayName" {...TempConfig} />;
};

export default Index;

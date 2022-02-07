import { Template } from "@/components/template";
import useUid from "@/hooks/useUid";
import { siteApi } from "@/store/api";
import siteService from "@/store/network/site/service";
import request from "@/store/request";
import { Tooltip } from "antd";
import moment from "moment";
import React, { FC, ReactElement, useState } from "react";
import { from } from "rxjs";

const Index: FC = (): ReactElement => {
  const uid = useUid();
  const [currData, setCurrData] = useState({});
  const TempConfig = {
    onSearch: (params: any) => {
      // console.log(params);

      const { searchPage } = params;
      from(request(siteApi.AiLog({ searchPage, uid }))).subscribe((data) => {
        // setRefresh(!refresh);
        console.log(data);

        data && setCurrData(data);
      });
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

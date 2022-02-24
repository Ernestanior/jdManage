import IconFont from "@/components/icon";
import { Pagination, Table } from "antd";
import "./index.less";
import React, { FC, ReactElement, useEffect, useState } from "react";
import userService from "@/store/network/user/service";
import { useNewUserAccessLog } from "@/store/network/user";
import { Template } from "@/components/template";

const Index: FC = (): ReactElement => {
  const accessLog = useNewUserAccessLog();

  const TempConfig = {
    onSearch: (params: any) => {
      userService.UserAccessLog({
        searchPage: params.searchPage,
      });
    },
    rowId: "id",
    data: accessLog,
    config: [
      {
        title: "登陆平台",
        dataIndex: "userAgent",
        key: "userAgent",
      },
      {
        title: "IP地址",
        dataIndex: "remoteIp",
        key: "remoteIp",
      },
      {
        title: "登陆时间",
        dataIndex: "accessTime",
        key: "accessTime",
      },
      {
        title: "操作",
        dataIndex: "delete",
        key: "delete",
        render: () => (
          <div>
            <IconFont
              type="icon-shanchu"
              style={{ fontSize: 17, color: "#FF8900" }}
            ></IconFont>
          </div>
        ),
      },
    ],
  };

  return (
    <div>
      <Template closeFilter  {...TempConfig}/>
    </div>
  );
};

export default Index;

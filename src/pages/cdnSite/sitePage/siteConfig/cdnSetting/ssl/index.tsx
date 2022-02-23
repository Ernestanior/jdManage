import useEvent from "@/common/hooks/useEvent";
import { Template } from "@/components/template";
import Tip from "@/components/tip";
import useUid from "@/hooks/useUid";
import { useSslList } from "@/store/network/site";
import siteService from "@/store/network/site/service";
import { Button } from "antd";
import { FC, ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import HttpsDrawer from "./httpsDrawer";
import "./index.less";
const Index: FC = (): ReactElement => {
  const uid = useUid();
  const currData = useSslList();
  const [httpsFlag, setHttpsFlag] = useState(false);
  const [event$, sendMessage] = useEvent();
  const closeEvent = () => {
    setHttpsFlag(false);
    sendMessage("reload");
  };

  const TempConfig = {
    optList: [
      {
        text: "编辑",
        event: (data: any) => {
          // setEditRow(data);
          // setEditFlag(true);
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          // setDeleteFlag(true);
          // setSelectedKey([data.uid]);
        },
      },
    ],
    onSearch: (params: any) => {
      const { filters, searchPage } = params;
      console.log({
        ...filters,
        searchPage: searchPage,
      });

      siteService.findSsl(uid, {
        ...filters,
        searchPage: searchPage,
      });
    },
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          // setDeleteFlag(true);
          // setSelectedKey(value);
        },
      },
    ],
    normalBtns: [
      {
        text: "证书管理",
        onClick: () => {},
      },
    ],
    rowId: "uid",
    data: currData,
    config: [
      {
        title: "域名",
        dataIndex: "sslDomains",
        key: "sslDomains",
      },
      {
        title: "证书过期时间",
        dataIndex: "sslExpire",
        key: "sslExpire",
      },
      {
        title: "创建时间",
        dataIndex: "createDate",
        key: "createDate",
      },
    ],
  };
  return (
    <div className="ssl-setting">
      <HttpsDrawer
        title="强制HTTPS配置"
        visible={httpsFlag}
        onClose={() => closeEvent()}
      />
      <div className="ssl-setting-https">
        启用强制HTTPS <Button onClick={() => setHttpsFlag(true)}>配置</Button>
      </div>
      <Tip>
        使用上传证书功能，请前往<NavLink to="/home">证书管理</NavLink>目录下执行
      </Tip>
      <Template primarySearch="sslDomains" event$={event$} {...TempConfig} />
    </div>
  );
};

export default Index;

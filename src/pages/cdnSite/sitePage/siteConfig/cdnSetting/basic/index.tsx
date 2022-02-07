import { useLoading } from "@/components/loading";
import useUid from "@/hooks/useUid";
import { siteApi } from "@/store/api";
import request from "@/store/request";
import { notification, Switch } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { from } from "rxjs";
import Loading from "@/components/loading/context";
import "./index.less";
const Index: FC = (): ReactElement => {
  const [websocket, setWebsocket] = useState<boolean>(false);
  const [cors, setCors] = useState<boolean>(false);
  const uid = useUid();
  const loading = useLoading();

  useEffect(() => {
    const websocket$ = from(request(siteApi.WebsocketSetting(uid))).subscribe(
      (data) => setWebsocket(data.isEnabled)
    );
    const cors$ = from(request(siteApi.CorsSetting(uid))).subscribe((data) =>
      setCors(data.isEnabled)
    );
    return () => {
      websocket$.unsubscribe();
      cors$.unsubscribe();
    };
  }, []);
  const handleWesocket = (status: boolean) => {
    from(
      request(siteApi.WebsocketSave({ siteUid: uid, isEnabled: status }))
    ).subscribe((data) => {
      if (data instanceof Object) {
        notification.success({ message: "Save success" });
        setWebsocket(status);
      }
    });
  };
  const handleCors = (status: boolean) => {
    from(
      request(siteApi.CorsSave({ siteUid: uid, isEnabled: status }))
    ).subscribe((data) => {
      if (data instanceof Object) {
        notification.success({ message: "Save success" });
        setCors(status);
      }
    });
  };
  return (
    <div className="cdn-setting-basic-box">
      <Loading display={loading}></Loading>
      <div className="basic-item">
        Websocket
        <Switch
          checked={websocket}
          onChange={(e) => handleWesocket(e)}
        ></Switch>
      </div>
      <div className="basic-item">
        跨域功能
        <Switch checked={cors} onChange={(e) => handleCors(e)}></Switch>
      </div>
    </div>
  );
};

export default Index;

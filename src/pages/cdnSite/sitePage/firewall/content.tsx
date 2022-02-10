import { useLoading } from "@/components/loading";
import { EdgeModal } from "@/components/modal";
import Tip from "@/components/tip";
import useUid from "@/hooks/useUid";
import { firewallApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, notification, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { from } from "rxjs";
import Loading from "@/components/loading/context";
import "./index.less";
import { FirewallList } from "@/store/network/firewall/interface";

interface IProps {
  type: string;
  currData: FirewallList | null;
  onRefresh: () => void;
  tip?: ReactElement;
}
const Content: FC<IProps> = ({
  type,
  currData,
  onRefresh,
  tip,
}): ReactElement => {
  const uid = useUid();
  const loading = useLoading();
  const [drawerFlag, setDrawerFlag] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const [text, setText] = useState("");
  const title = useMemo(() => {
    switch (type) {
      case "whiteIP":
        return "IP白名单";
      case "blackIP":
        return "IP黑名单";
      case "whiteUA":
        return "UA白名单";
      case "blackUA":
        return "UA黑名单";
      default:
        return "IP白名单";
    }
  }, []);
  const saveApi = useMemo(() => {
    switch (type) {
      case "whiteIP":
        return (payload: any) => firewallApi.SaveWhiteIP(payload);
      case "blackIP":
        return (payload: any) => firewallApi.SaveBlackIP(payload);
      case "whiteUA":
        return (payload: any) => firewallApi.SaveWhiteUA(payload);
      case "blackUA":
        return (payload: any) => firewallApi.SaveBlackUA(payload);
      default:
        return (payload: any) => firewallApi.SaveWhiteIP(payload);
    }
  }, []);

  const switchFlag = useMemo(
    () => (currData ? currData.isEnabled : false),
    [currData]
  );
  const handleSwitch = () => {
    switchFlag ? setModalFlag(true) : setDrawerFlag(true);
  };
  const onSubmit = (status: boolean) => {
    let payload;
    if (type === "whiteIP" || type === "blackIP") {
      payload = {
        siteUid: uid,
        isEnabled: status,
        addresses: status ? text.split("\n") : [],
      };
    }
    if (type === "whiteUA" || type === "blackUA") {
      payload = {
        siteUid: uid,
        isEnabled: status,
        userAgents: status ? text.split("\n") : [],
      };
    }
    from(request(saveApi(payload))).subscribe((data) => {
      if (data) {
        if (JSON.stringify(data) === "{}") {
          notification.success({
            message: "Update Success",
          });
          setModalFlag(false);
          setDrawerFlag(false);
          onRefresh();
        } else {
          data.map((item: any) =>
            notification.error({
              message: item.name,
              description: item.message,
            })
          );
        }
      }
    });
  };
  return (
    <div className="access-control">
      <div className="access-control-switch">
        {title}
        <Switch
          disabled={loading}
          checked={switchFlag}
          onChange={(e) => handleSwitch()}
        />
      </div>
      {currData && currData.isEnabled && (
        <div className="access-control-list">
          <Button
            type="primary"
            onClick={() => {
              setDrawerFlag(true);
              if (currData.addresses) {
                setText(currData.addresses.join("\n"));
              } else if (currData.userAgents) {
                setText(currData.userAgents.join("\n"));
              }
            }}
          >
            编辑
          </Button>
          <div className="list-title">IP列表</div>
          <div className="list-content">
            {currData.addresses &&
              currData.addresses.map((item: string) => (
                <div key={item}>{item}</div>
              ))}
            {currData.userAgents &&
              currData.userAgents.map((item: string) => (
                <div key={item}>{item}</div>
              ))}
          </div>
        </div>
      )}
      <EdgeModal
        visible={modalFlag}
        onOk={() => onSubmit(false)}
        onCancel={() => setModalFlag(false)}
      >
        确定要禁用吗？
        {loading && <Loading display={loading}></Loading>}
      </EdgeModal>
      <Drawer
        title={"IP白名单配置"}
        width={520}
        placement="left"
        onClose={() => setDrawerFlag(false)}
        closable={false}
        visible={drawerFlag}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 20px",
            }}
          >
            <Button
              onClick={() => onSubmit(true)}
              type="primary"
              style={{ marginRight: "20px" }}
              loading={loading}
            >
              确定
            </Button>
            <Button onClick={() => setDrawerFlag(false)}>取消</Button>
          </div>
        }
        footerStyle={{ height: "60px", border: 0 }}
      >
        {tip}
        <div style={{ margin: "20px 0 5px 0", fontWeight: 550 }}>IP</div>
        <TextArea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Drawer>
    </div>
  );
};

export default Content;

import { FC, useState } from "react";
import { Button, Drawer, Input, notification } from "antd";
import { siteApi } from "@/store/api";
import request from "@/store/request";
import { Template } from "@/components/template";
import { ISslList } from "@/store/network/site/interface";
import useEvent from "@/common/hooks/useEvent";
interface IProps {
  visible: boolean;
  onClose: () => void;
  currUid: string;
}

const EditDrawer: FC<IProps> = ({ visible, onClose, currUid }) => {
  const [cnameList, setCnameList] = useState<ISslList>();
  const [event$, sendMessage] = useEvent();
  const [modifyingKey, setModifyingKey] = useState("");
  const [input, setInput] = useState("");

  const onConfirm = async () => {
    const submitData = {
      cnames: [{ cname: input, name: modifyingKey }],
      uid: currUid,
    };
    const res = await request(siteApi.SaveCName(submitData));
    if (res.successes.length) {
      notification.success({
        message: "Update Success",
      });
      sendMessage("reload");
      setModifyingKey("");
    } else {
      res.failures.forEach((item: any) =>
        notification.error({
          message: item.cname,
          description: "Wrong CName Format",
        })
      );
    }
  };
  const TempConfig = {
    onSearch: async (params: any) => {
      const { searchPage, filters } = params;
      const payload = {
        keyword: filters.name,
        searchPage,
        uid: currUid,
      };
      const res = await request(siteApi.CNameList(payload));
      setCnameList(res);
    },
    normalBtns: [
      {
        text: "Import",
        onClick: () => {},
      },
      {
        text: "Export",
        onClick: () => {},
      },
    ],
    rowId: "name",
    data: cnameList,
    config: [
      {
        title: "域名/记录",
        dataIndex: "displayName",
        key: "displayName",
      },
      {
        title: "CNAME",
        dataIndex: "cname",
        key: "cname",
        render: (_: any, e: any) => {
          return e.name === modifyingKey ? (
            <Input
              defaultValue={e.cname}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            e.cname
          );
        },
      },
      {
        title: "客户",
        key: "customer.name",
        render: (_: any, e: any) => {
          // console.log(e);
          return e.name === modifyingKey ? (
            <>
              <Button
                type="primary"
                onClick={onConfirm}
                style={{ marginRight: "20px" }}
              >
                Confirm
              </Button>
              <Button type="primary" onClick={() => setModifyingKey("")}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => setModifyingKey(e.name)}>
              Modify
            </Button>
          );
        },
      },
    ],
  };
  return (
    <Drawer
      title={"选择平台"}
      width={720}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      <Template primarySearch="name" {...TempConfig} event$={event$} />
    </Drawer>
  );
};
export default EditDrawer;

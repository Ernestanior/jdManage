import { FC, useEffect, useState } from "react";
import { Button, Drawer, Input, notification } from "antd";
import { siteApi } from "@/store/api";
import { from } from "rxjs";
import request from "@/store/request";
import { useCNameList } from "@/store/network/site";
import siteService from "@/store/network/site/service";
import { Template } from "@/components/template";
interface IProps {
  visible: boolean;
  onClose: () => void;
  // onRefresh: () => void;
  currUid: string;
}

const EditDrawer: FC<IProps> = ({ visible, onClose, currUid }) => {
  const cnameList = useCNameList();
  const [modifyingKey, setModifyingKey] = useState("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [input, setInput] = useState("");

  const onConfirm = () => {
    const submitData = {
      cnames: [{ cname: input, name: modifyingKey }],
      uid: currUid,
    };
    from(request(siteApi.SaveCName(submitData))).subscribe((data) => {
      if (data.successes.length) {
        notification.success({
          message: "Update Success",
        });
        setRefresh(!refresh);
        setModifyingKey("");
      } else {
        data.failures.forEach((item: any) =>
          notification.error({
            message: item.cname,
            description: "Wrong CName Format",
          })
        );
      }
    });
  };
  useEffect(() => {
    siteService.findCNameList({
      keyword: "",
      searchPage: {
        page: 1,
        pageSize: 10,
      },
      uid: currUid,
    });
  }, [refresh]);
  const TempConfig = {
    onSearch: (params: any) => {
      const { searchPage, filters } = params;
      siteService.findCNameList({
        keyword: filters.name,
        searchPage,
        uid: currUid,
      });
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
      <Template primarySearch="name" {...TempConfig} />
    </Drawer>
  );
};
export default EditDrawer;

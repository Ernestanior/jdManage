import { useLoading } from "@/components/loading";
import { Template } from "@/components/template";
import useEvent from "@/hooks/useEvent";
import { supplierApi } from "@/store/api";
import request from "@/store/request";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import DetailDrawer from "./detailDrawer";
import CreateDrawer from "./createDrawer";
import EditDrawer from "./editDrawer";
import { from } from "rxjs";
import { EdgeModal } from "@/components/modal";
import { notification } from "antd";

export interface ISupplierInfo {
  code: string;
  description: string;
  displayName: string;
  name: string;
  supportsMultiAccount: boolean;
  tokenFields: any[];
  tokenValue: any;
  uid: string;
}

export interface ISupplierAccount {
  customerCount: number;
  customers: any[];
  name: string;
  quota: any;
  remark: string;
  status: string;
  supplier: ISupplierInfo;
  uid: string;
}
const Index: FC = () => {
  const [detailFlag, setDetailFlag] = useState<boolean>(false);
  const [createFlag, setCreateFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [disableFlag, setDisableFlag] = useState<boolean>(false);
  const [enableFlag, setEnableFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  const [supplierDetail, setSupplierDetail] = useState<any>();
  const [allSuppliers, setAllSuppliers] = useState<ISupplierInfo[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [event$, sendMessage] = useEvent();
  const loading = useLoading();
  const routerState: any = useLocation().state;
  const type = useMemo(() => {
    return routerState && routerState.platMana;
  }, [routerState]);
  const [supplierAccountList, setSupplierAccountList] = useState<
    ISupplierAccount[]
  >([]);
  useEffect(() => {
    const obs = from(request(supplierApi.SupplierInfoAll(type))).subscribe(
      (data) => data instanceof Array && setAllSuppliers(data)
    );
    return () => obs.unsubscribe();
  }, []);

  const supplierOption = useMemo(() => {
    return allSuppliers.map((i: { code: string; displayName: string }) => ({
      uid: i.code,
      name: i.displayName,
    }));
  }, [allSuppliers]);

  const operateAccount = async (id: string, operate: string) => {
    let api;
    switch (operate) {
      case "Delete":
        api = supplierApi.DeleteAccount(id);
        break;
      case "Disable":
        api = supplierApi.DisableAccount(id);
        break;
      case "Enable":
        api = supplierApi.EnableAccount(id);
        break;
      default:
        api = supplierApi.DeleteAccount(id);
        break;
    }
    const res = await request(api, true);
    res.response === "success"
      ? notification.success({ message: `${operate} Success` })
      : notification.error({
          message: `${operate} failed`,
          description: res.message,
        });
    sendMessage("reload");

    switch (operate) {
      case "Delete":
        setDeleteFlag(false);
        break;
      case "Disable":
        setDisableFlag(false);
        break;
      case "Enable":
        setEnableFlag(false);
        break;
    }
  };

  const TempConfig = {
    optList: [
      {
        text: "查看",
        event: async (data: any) => {
          setDetailFlag(true);
          const res = await request(supplierApi.SupplierAccountView(data.uid));
          res && setSupplierDetail(res);
        },
      },
      {
        text: "修改",
        event: async (data: any) => {
          setEditFlag(true);
          const res = await request(supplierApi.SupplierAccountView(data.uid));
          res && setSupplierDetail(res);
        },
      },
      {
        text: "启用",
        hide: (data:any)=>data.status ==="enabled",
        event: async (data: any) => {
          setSelected(data.uid);
          setEnableFlag(true)
    
        },
      },
      {
        text: "禁用",
        hide: (data:any)=>data.status ==="disabled",
        event: async (data: any) => {
          setSelected(data.uid);
          setDisableFlag(true);
        },
      },
      {
        text: "删除",
        event: async (data: any) => {
          setSelected(data.uid);
          setDeleteFlag(true);
        },
      },
    ],
    normalBtns: [
      {
        text: "新增账号",
        onClick: () => {
          setCreateFlag(true);
        },
      },
    ],
    onSearch: (params: any) => {
      const { filters, searchPage } = params;
      const payload = { ...filters, searchPage, type };
      from(request(supplierApi.SupplierAccountList(payload))).subscribe(
        (data) => data && setSupplierAccountList(data)
      );
    },
    rowId: "uid",
    data: supplierAccountList,
    config: [
      {
        title: "平台账号",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "平台",
        dataIndex: "supplier",
        key: "supplier",
        render: (key: any) => <div>{key.displayName}</div>,
      },
      {
        title: "使用客户量",
        dataIndex: "customerCount",
        key: "customerCount",
      },
      {
        title: "域名額度",
        dataIndex: "quota",
        key: "quota",
        render: (key: any) => {
          return (
            <div>
              {key !== null
                ? `${key.domain.allocated}/${key.domain.capacity}`
                : "-"}
            </div>
          );
        },
      },
    ],
  };

  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "平台账号",
            name: "name",
            type: "input",
          },
          {
            text: "平台",
            name: "supplier",
            data: supplierOption,
            type: "select",
          },
        ]}
        {...TempConfig}
        event$={event$}
        sort="name"
      ></Template>
      <DetailDrawer
        onClose={() => {
          setDetailFlag(false);
          setSupplierDetail({});
        }}
        visible={detailFlag}
        currentData={supplierDetail}
        loading={loading}
      ></DetailDrawer>
      <CreateDrawer
        onClose={() => setCreateFlag(false)}
        onRefresh={() => sendMessage("reload")}
        visible={createFlag}
        supplier={allSuppliers}
        loading={loading}
      ></CreateDrawer>
      <EditDrawer
        onClose={() => setEditFlag(false)}
        onRefresh={() => sendMessage("reload")}
        visible={editFlag}
        currData={supplierDetail}
        loading={loading}
      ></EditDrawer>
      <EdgeModal
        visible={deleteFlag}
        onCancel={() => setDeleteFlag(false)}
        onOk={() => operateAccount(selected, "Delete")}
        title="删除"
        loading={loading}
      >
        你确定删除此账户？
      </EdgeModal>
      <EdgeModal
        visible={disableFlag}
        onCancel={() => setDisableFlag(false)}
        onOk={() => operateAccount(selected, "Disable")}
        title="禁用"
        loading={loading}
      >
        你确定禁用此账户？
      </EdgeModal>
      <EdgeModal
        visible={enableFlag}
        onCancel={() => setEnableFlag(false)}
        onOk={() => operateAccount(selected, "Enable")}
        title="启用"
        loading={loading}
      >
        你确定启用此账户？
      </EdgeModal>
    </div>
  );
};

export default Index;

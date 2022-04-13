import { Template } from "@/components/template";
import { notification } from "antd";
import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateDrawer from "./createDrawer";
import EditDrawer from "./editDrawer";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { companyApi } from "@/store/api";
import { EdgeModal } from "@/components/modal";
import useEvent from "@/hooks/useEvent";
import { ICustomerList } from "@/store/network/customer/interface";
import { ITempParams } from "@/store/api/common.interface";

const Content: FC = () => {
  const [createFlag, setCreateFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);

  const [selected, setSelected] = useState<string[]>([]);
  const [editData, setEditData] = useState<any>({});
  const [companyList, setCompanyList] = useState<ICustomerList>();
  const [event$, sendMessage] = useEvent();
  const loading = useLoading();
  const routerState: any = useLocation().state;
  const type = useMemo(() => {
    return routerState && routerState.userMana;
  }, [routerState]);

  const deleteCustomer = (data: string[]) => {
    from(request(companyApi.DeleteCompany(data))).subscribe((data) => {
      data instanceof Object
        ? notification.success({ message: "Delete Success" })
        : notification.error({ message: "Delete failed", description: data });
      sendMessage("reload");
      setDeleteFlag(false);
      setSelected([]);
    });
  };

  const TempConfig = {
    normalBtns: [
      {
        text: "新增公司",
        onClick: () => setCreateFlag(true),
        loading: loading,
      },
    ],
    optList: [
      {
        text: "编辑",
        event: (data: any) => {
          setEditData(data);
          setEditFlag(true);
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          setSelected([data.uid]);
          setDeleteFlag(true);
        },
      },
    ],
    onSearch: async (params: ITempParams) => {
      console.log(params);
      const { pageNum, pageSize } = params.searchPage;
      const res = await request(companyApi.FindCompany({ pageNum, pageSize }));
      console.log(res);

      res && setCompanyList(res);
    },
    rowId: "uid",
    data: companyList,
    config: [
      {
        title: "用户名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (status: any) =>
          status === 1 ? (
            <div className={`${"status-box"} ${"status-normal"}`}>正常</div>
          ) : (
            <div className={`${"status-box"} ${"status-error"}`}>故障</div>
          ),
      },
    ],
  };
  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "使用者名称",
            name: "name",
            type: "input",
          },
          {
            text: "邮箱",
            name: "email",
            type: "input",
          },
          {
            text: "状态",
            name: "status",
            data: [
              { uid: 0, name: "未启用" },
              { uid: 1, name: "正常" },
            ],
            type: "select",
          },
        ]}
        {...TempConfig}
        event$={event$}
      ></Template>
      <CreateDrawer
        onClose={() => setCreateFlag(false)}
        reload={() => sendMessage("reload")}
        visible={createFlag}
        loading={loading}
        type={type}
      ></CreateDrawer>
      <EditDrawer
        onClose={() => setEditFlag(false)}
        reload={() => sendMessage("reload")}
        data={editData}
        visible={editFlag}
        loading={loading}
      ></EditDrawer>
      <EdgeModal
        visible={deleteFlag}
        onCancel={() => setDeleteFlag(false)}
        onOk={() => deleteCustomer(selected)}
        title="删除"
        loading={loading}
      >
        你确定删除此账户？
      </EdgeModal>
    </div>
  );
};

export default Content;

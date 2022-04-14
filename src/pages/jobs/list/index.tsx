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

const Content: FC = () => {
  const [createFlag, setCreateFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [currData, setCurrData] = useState<any>();
  const [selected, setSelected] = useState<string[]>([]);
  const [editData, setEditData] = useState<any>({});
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
    optList: [
      {
        text: "查看", //修改
        event: (data: any) => {
          console.log(data);
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          console.log(data);
        },
      },
    ],
    onSearch: async (params: any) => {
      const { pageNum, pageSize } = params.searchPage;
      const res = await request(companyApi.FindCompany({ pageNum, pageSize }));
      const { data, size } = res;
      setCurrData({
        number: pageNum - 1,
        numberOfElements: 0,
        size: pageSize,
        totalElements: size,
        totalPages: size / pageNum,
        content: data,
      });
    },
    normalBtns: [
      {
        text: "新增公司",
        onClick: () => {
          setCreateFlag(true);
        },
      },
    ],
    rowId: "id",
    data: currData,
    config: [
      {
        title: "公司名称",
        dataIndex: "companyName",
        key: "companyName",
      },
      {
        title: "职位类型",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "招聘员工数量",
        dataIndex: "staffNum",
        key: "staffNum",
      },
    ],
  };
  return (
    <>
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
    </>
  );
};

export default Content;

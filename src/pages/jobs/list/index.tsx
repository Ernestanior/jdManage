import { Template } from "@/components/template";
import { Button, notification } from "antd";
import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateDrawer from "./createDrawer";
import EditDrawer from "./editDrawer";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { companyApi, jdApi } from "@/store/api";
import { EdgeModal } from "@/components/modal";
import useEvent from "@/hooks/useEvent";

const Content: FC = () => {
  const [createFlag, setCreateFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [currData, setCurrData] = useState<any>();
  const [deleteId, setDeleteId] = useState<number>();
  const [editData, setEditData] = useState<any>({});
  const [event$, sendMessage] = useEvent();
  const loading = useLoading();
  const routerState: any = useLocation().state;
  const type = useMemo(() => {
    return routerState && routerState.userMana;
  }, [routerState]);

  const deleteCustomer = () => {
    deleteId &&
      from(request(jdApi.DeleteJd(deleteId))).subscribe((data) => {
        if (data.code !== 200) {
          notification.error({ message: "Delete failed" });
          return null;
        }
        notification.success({ message: "Delete Success", description: data });
        setDeleteFlag(false);
        sendMessage("reload");
        setDeleteId(0);
      });
  };
  const detailJd = (id: number) => {
    from(request(jdApi.DetailJd(id))).subscribe((data) => {
      if (data.code !== 200) {
        notification.error({ message: "Detail load failed" });
        return null;
      }
      setEditData(data);
    });
  };

  const TempConfig = {
    optList: [
      {
        text: "查看", //修改
        event: (data: any) => {
          detailJd(data.id);
        },
      },
      {
        text: "更新", //修改
        event: (data: any) => {
          detailJd(data.id);
          setEditFlag(true);
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          setDeleteFlag(true);
          setDeleteId(data.id);
        },
      },
    ],
    onSearch: async (params: any) => {
      const { pageNum, pageSize } = params.searchPage;
      const res = await request(jdApi.FindJd(pageNum, pageSize));
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
        text: "新增职位",
        onClick: () => {
          setCreateFlag(true);
        },
      },
    ],
    rowId: "id",
    data: currData,
    config: [
      {
        title: "岗位名称",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "城市",
        dataIndex: "location",
        key: "location",
      },
      {
        title: "工资",
        dataIndex: "salaryRange",
        key: "salaryRange",
      },
      {
        title: "岗位行业类型",
        dataIndex: "ind",
        key: "ind",
      },
      {
        title: "招聘类型",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "公司名称",
        dataIndex: "companyName",
        key: "companyName",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (e: string) =>
          e ? (
            <Button type="primary" style={{ backgroundColor: "#4ee876" }}>
              正常
            </Button>
          ) : (
            <Button type="primary" style={{ backgroundColor: "#ff4d4d" }}>
              已删除
            </Button>
          ),
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
        onOk={() => deleteCustomer()}
        title="删除"
        loading={loading}
      >
        你确定删除此账户？
      </EdgeModal>
    </>
  );
};

export default Content;

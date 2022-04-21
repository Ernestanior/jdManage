import { Template } from "@/components/template";
import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateDrawer from "./createDrawer";
import { useLoading } from "@/components/loading";
import request from "@/store/request";
import { adminApi } from "@/store/api";
import useEvent from "@/hooks/useEvent";
import { Flag } from "@/common/utils/constants";
import IconFont from "@/components/icon";

const Content: FC = () => {
  const [flag, setFlag] = useState<Flag>(Flag.CLOSE);
  const [currData, setCurrData] = useState<any>();
  // const [selected, setSelected] = useState<number>(0);
  // const [detailData, setDetailData] = useState<any>({});
  const [event$, sendMessage] = useEvent();
  const loading = useLoading();
  const routerState: any = useLocation().state;
  const type = useMemo(() => {
    return routerState && routerState.userMana;
  }, [routerState]);

  // const deleteCompany = (id: number) => {
  //   from(request(adminApi.DeleteCompany(id))).subscribe((data) => {
  //     notification.success({ message: "Delete Success" });
  //     sendMessage("reload");
  //     // setDeleteFlag(false);
  //     setFlag(Flag.CLOSE);
  //     setSelected(0);
  //   });
  // };

  const TempConfig = {
    optList: [
      {
        text: "更新",
        icon: <IconFont type="icon-peizhi"></IconFont>,
        event: (data: any) => {
          // setDeleteFlag(true);
          setFlag(Flag.EDIT);
          // setDetailData(data);
          // deleteCompany(data.id);
        },
      },
    ],
    onSearch: async (params: any) => {
      const { pageNum, pageSize } = params.searchPage;
      const res = await request(adminApi.FindAdmin(pageNum, pageSize));
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
        text: "新增管理员",
        onClick: () => {
          // setCreateFlag(true);
          setFlag(Flag.CREATE);
        },
      },
    ],
    rowId: "id",
    data: currData,
    config: [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "账号名称",
        dataIndex: "username",
        key: "username",
      },
    ],
  };
  return (
    <>
      <Template
        closeFilter
        primarySearch={"keyword"}
        searchList={[
          {
            text: "公司名称",
            name: "name",
            type: "input",
          },
          {
            text: "规模",
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
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        visible={flag === Flag.CREATE}
        loading={loading}
        type={type}
      ></CreateDrawer>
      {/* <EditDrawer
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        data={detailData}
        visible={flag === Flag.EDIT}
        loading={loading}
      ></EditDrawer> */}
      {/* <DetailDrawer
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        title="公司详情"
        data={detailData}
        visible={flag === Flag.DETAIL}
      ></DetailDrawer>
      <EdgeModal
        visible={flag === Flag.DELETE}
        onCancel={() => setFlag(Flag.CLOSE)}
        onOk={() => deleteCompany(selected)}
        title="删除"
        loading={loading}
      >
        你确定删除此公司？
      </EdgeModal> */}
    </>
  );
};

export default Content;

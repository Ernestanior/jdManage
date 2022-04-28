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
import EditDrawer from "./editDrawer";

const Content: FC = () => {
  const [flag, setFlag] = useState<Flag>(Flag.CLOSE);
  const [currData, setCurrData] = useState<any>();
  const [selectedData, setSelectedData] = useState<any>({});
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
        icon: (
          <a onClick={(e) => e.preventDefault()} href=".">
            <IconFont type="icon-peizhi"></IconFont>
          </a>
        ),
        event: (data: any) => {
          setSelectedData(data);
          setFlag(Flag.EDIT);
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
      <EditDrawer
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        data={selectedData}
        visible={flag === Flag.EDIT}
        loading={loading}
      ></EditDrawer>
    </>
  );
};

export default Content;

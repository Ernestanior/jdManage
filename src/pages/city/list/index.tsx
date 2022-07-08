import { Template } from "@/components/template";
import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateDrawer from "./createDrawer";
import { useLoading } from "@/components/loading";
import request from "@/store/request";
import { cityApi } from "@/store/api";
import useEvent from "@/hooks/useEvent";
import { Flag } from "@/common/utils/constants";
// import EditDrawer from "./editDrawer";
import { EdgeModal } from "@/components/modal";
import { from } from "rxjs";
import { notification } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

const Content: FC = () => {
  const [flag, setFlag] = useState<Flag>(Flag.CLOSE);
  const [currData, setCurrData] = useState<any>();
  const [selectedId, setSelectedId] = useState<any>(0);
  const [event$, sendMessage] = useEvent();
  const loading = useLoading();
  const routerState: any = useLocation().state;
  const type = useMemo(() => {
    return routerState && routerState.userMana;
  }, [routerState]);

  const deleteCity = (id: number) => {
    from(request(cityApi.DeleteCity(id))).subscribe((data) => {
      notification.success({ message: "Delete Success" });
      sendMessage("reload");
      // setDeleteFlag(false);
      setFlag(Flag.CLOSE);
      setSelectedId(0);
    });
  };

  const TempConfig = {
    optList: [
      {
        text: "删除",
        icon: <DeleteTwoTone />,
        event: (data: any, id: any) => {
          setSelectedId(data.id);
          setFlag(Flag.DELETE);
        },
      },
    ],
    onSearch: async (params: any) => {
      const { pageNum, pageSize } = params.searchPage;
      const res = await request(cityApi.FindCity());
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
        text: "新增城市",
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
        title: "城市id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "城市名",
        dataIndex: "cname",
        key: "cname",
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
      {/* <EditDrawer
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        data={selectedData}
        visible={flag === Flag.EDIT}
        loading={loading}
      ></EditDrawer> */}
      <EdgeModal
        visible={flag === Flag.DELETE}
        onCancel={() => setFlag(Flag.CLOSE)}
        onOk={() => deleteCity(selectedId)}
        title="删除"
        loading={loading}
      >
        你确定删除此公司？
      </EdgeModal>
    </>
  );
};

export default Content;

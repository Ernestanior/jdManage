import { Template } from "@/components/template";
import { Button, notification } from "antd";
import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateDrawer from "./createDrawer";
import EditDrawer from "./editDrawer";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { jdApi } from "@/store/api";
import { EdgeModal } from "@/components/modal";
import useEvent from "@/hooks/useEvent";
import DetailDrawer from "./detailDrawer";
import { Flag } from "@/common/utils/constants";

const Content: FC = () => {
  const [flag, setFlag] = useState<Flag>(Flag.CLOSE);
  const [currData, setCurrData] = useState<any>();
  const [selectId, setSelected] = useState<number>();
  const [detailData, setDetailData] = useState<any>();
  const [event$, sendMessage] = useEvent();
  const loading = useLoading();
  const routerState: any = useLocation().state;
  const type = useMemo(() => {
    return routerState && routerState.userMana;
  }, [routerState]);

  const deleteJd = () => {
    selectId &&
      from(request(jdApi.DeleteJd(selectId))).subscribe((data) => {
        if (data.code !== 200) {
          notification.error({ message: "Delete failed" });
          return null;
        }
        notification.success({ message: "Delete Success", description: data });
        setFlag(Flag.CLOSE);
        sendMessage("reload");
        setSelected(0);
      });
  };
  const detailJd = (id: number) => {
    from(request(jdApi.DetailJd(id))).subscribe((data) => {
      if (data.code !== 200) {
        notification.error({ message: "Detail load failed" });
        return null;
      }
      setDetailData(data.data);
    });
  };

  const TempConfig = {
    optList: [
      {
        text: "查看", //修改
        event: (data: any) => {
          setFlag(Flag.DETAIL);
          detailJd(data.id);
        },
      },
      {
        text: "更新", //修改
        event: (data: any) => {
          setFlag(Flag.EDIT);
          detailJd(data.id);
          setSelected(data.id);
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          setFlag(Flag.DELETE);
          setSelected(data.id);
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
          setFlag(Flag.CREATE);
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
        closeFilter
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
        data={{ id: selectId, ...detailData }}
        visible={flag === Flag.EDIT}
        loading={loading}
      ></EditDrawer>
      <DetailDrawer
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        title="职位详情"
        data={detailData}
        loading={loading}
        visible={flag === Flag.DETAIL}
      ></DetailDrawer>
      <EdgeModal
        visible={flag === Flag.DELETE}
        onCancel={() => setFlag(Flag.CLOSE)}
        onOk={() => deleteJd()}
        title="删除"
        loading={loading}
      >
        你确定删除此公司？
      </EdgeModal>
    </>
  );
};

export default Content;

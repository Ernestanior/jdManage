import { Template } from "@/components/template";
import { Button, notification } from "antd";
import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateDrawer from "./createDrawer";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { noteApi } from "@/store/api";
import { EdgeModal } from "@/components/modal";
import useEvent from "@/hooks/useEvent";
import DetailDrawer from "./detailDrawer";
import { Flag } from "@/common/utils/constants";
import EditDrawer from "./editDrawer";

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

  const deleteNote = () => {
    selectId &&
      from(request(noteApi.DeleteNote(selectId))).subscribe((data) => {
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
  const detailNote = (id: number) => {
    from(request(noteApi.DetailNote(id))).subscribe((data) => {
      if (data.code !== 200) {
        notification.error({ message: "Detail load failed" });
        return null;
      }
      setDetailData(data.data);
      setFlag(Flag.DETAIL);
    });
  };

  const TempConfig = {
    optList: [
      {
        text: "查看", //修改
        event: (data: any) => {
          if (!data.status) {
            notification.error({ message: "该笔记已被删除" });
            return;
          }
          detailNote(data.id);
        },
      },
      {
        text: "图片补发", //修改
        event: (data: any) => {
          if (!data.status) {
            notification.error({ message: "该笔记已被删除" });
            return;
          }
          setFlag(Flag.EDIT);
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
      const res = await request(noteApi.FindNote(pageNum, pageSize));
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
        text: "新增笔记",
        onClick: () => {
          setFlag(Flag.CREATE);
        },
      },
    ],
    rowId: "id",
    data: currData,
    config: [
      {
        title: "笔记id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "作者昵称",
        dataIndex: "authorName",
        key: "authorName",
      },
      {
        title: "课程编号",
        dataIndex: "courseCode",
        key: "courseCode",
      },
      {
        title: "收藏数",
        dataIndex: "fav",
        key: "fav",
      },
      {
        title: "点赞数",
        dataIndex: "like",
        key: "like",
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "学校名称缩写",
        dataIndex: "uniAcronym",
        key: "type",
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
      <DetailDrawer
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        title="笔记详情"
        data={detailData}
        loading={loading}
        visible={flag === Flag.DETAIL}
      ></DetailDrawer>
      <EditDrawer
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        title="笔记图片补发"
        loading={loading}
        noteId={selectId || 0}
        visible={flag === Flag.EDIT}
      />
      <EdgeModal
        visible={flag === Flag.DELETE}
        onCancel={() => setFlag(Flag.CLOSE)}
        onOk={() => deleteNote()}
        title="删除"
        loading={loading}
      >
        你确定删除此公司？
      </EdgeModal>
    </>
  );
};

export default Content;

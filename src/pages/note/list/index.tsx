import { Template } from "@/components/template";
import { Button, notification } from "antd";
import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateDrawer from "./createDrawer";
import DetailDrawer from "./detailDrawer";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { companyApi } from "@/store/api";
import { EdgeModal } from "@/components/modal";
import useEvent from "@/hooks/useEvent";
import { Flag } from "@/common/utils/constants";

const Content: FC = () => {
  const [flag, setFlag] = useState<Flag>(Flag.CLOSE);
  const [currData, setCurrData] = useState<any>();
  const [selected, setSelected] = useState<number>(0);
  const [detailData, setDetailData] = useState<any>({});

  const [event$, sendMessage] = useEvent();
  const loading = useLoading();
  const routerState: any = useLocation().state;
  const type = useMemo(() => {
    return routerState && routerState.userMana;
  }, [routerState]);

  const deleteCompany = (id: number) => {
    from(request(companyApi.DeleteCompany(id))).subscribe((data) => {
      notification.success({ message: "Delete Success" });
      sendMessage("reload");
      // setDeleteFlag(false);
      setFlag(Flag.CLOSE);
      setSelected(0);
    });
  };

  const TempConfig = {
    optList: [
      {
        text: "查看", //修改
        event: async (data: any) => {
          const res = await request(companyApi.DetailCompany(data.id));
          if (res.code === 200) {
            setDetailData(res.data);
            setFlag(Flag.DETAIL);
          }
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          // setDeleteFlag(true);
          setFlag(Flag.DELETE);
          setSelected(data.id);
          // deleteCompany(data.id);
        },
      },
    ],
    onSearch: async (params: any) => {
      const { pageNum, pageSize } = params.searchPage;
      const res = await request(companyApi.FindCompany(pageNum, pageSize));
      const { data, size } = res;
      setCurrData({
        number: pageNum - 1,
        numberOfElements: 0,
        size: pageSize,
        totalElements: size,
        totalPages: size / pageNum,
        content: data,
      });

      // findCompany(page, pageSize).then((res: any) => {
      //   if (res) {
      //     const { data, size } = res.data
      //     setCurrData({
      //       number: page - 1,
      //       numberOfElements: 0,
      //       size: pageSize,
      //       totalElements: size,
      //       totalPages: size / page,
      //       content: data
      //     })
      //   }
      // });
    },
    normalBtns: [
      {
        text: "新增公司",
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
      {
        title: "公司图标",
        dataIndex: "logoName",
        key: "logoName",
        render: (e: string) =>
          e ? (
            <img
              style={{ width: 30, height: 30 }}
              src={`https://api.reviewonclass.com/static/image/${e}`}
            ></img>
          ) : (
            "no-logo"
          ),
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
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        visible={flag === Flag.CREATE}
        loading={loading}
        type={type}
      ></CreateDrawer>
      {/* <EditDrawer
        onClose={() => setFlag(Flag.CLOSE)}
        reload={() => sendMessage("reload")}
        data={editData}
        visible={flag === Flag.EDIT}
        loading={loading}
      ></EditDrawer> */}
      <DetailDrawer
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
      </EdgeModal>
    </>
  );
};

export default Content;
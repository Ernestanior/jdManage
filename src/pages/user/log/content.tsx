import IconFont from "@/components/icon";
import { useLoading } from "@/components/loading";
import { EdgeModal } from "@/components/modal";
import { Template } from "@/components/template";
import useEvent from "@/hooks/useEvent";
import { userApi } from "@/store/api";
import { worklogDetail } from "@/store/api/user";
import request from "@/store/request";
import { Col, Input, notification, Row } from "antd";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { from } from "rxjs";

interface IEvent {
  [props: string]: string;
}
interface ICodeList {
  eventService: IEvent;
  eventType: IEvent;
}
interface IEventList {
  eventDate: number;
  eventId: string;
  eventService: string;
  eventType: string;
  initiator: string;
  platform: string;
  resourceName: string;
  resourceType: string;
}
interface IEventDetail extends IEventList {
  oldData: string;
  newData: string;
}
const Index: FC = () => {
  const { TextArea } = Input;
  const loading = useLoading();
  const [codelist, setCodelist] = useState<ICodeList>();
  const [worklog, setWorklog] = useState<any>();
  const [logDetail, setLogDetail] = useState<IEventDetail>();
  const [handleExpand, setHandleExpand] = useState(true);
  const [eventID, setEventID] = useState<string>("");
  const [deleteId, setDeleteId] = useState<any>();
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [event$, sendMessage] = useEvent();
  const routerState: any = useLocation().state;
  const type = useMemo(() => {
    return routerState && routerState.userLog;
  }, [routerState]);
  console.log(type);

  useEffect(() => {
    const obs = from(request(userApi.LogCodeList())).subscribe((data) => {
      data && setCodelist(data);
    });
    return () => obs.unsubscribe();
  }, []);

  const eventType = useMemo(() => {
    return codelist
      ? Object.entries(codelist?.eventType).map(([key, value]: string[]) => ({
          uid: key,
          name: value,
        }))
      : [];
  }, [codelist]);

  const eventService = useMemo(() => {
    return codelist
      ? Object.entries(codelist?.eventService).map(
          ([key, value]: string[]) => ({
            uid: key,
            name: value,
          })
        )
      : [];
  }, [codelist]);

  const onDelete = async () => {
    const res = await request(userApi.UserDeleteWorkLog([deleteId]));
    res.response === "success"
      ? notification.success({ message: "Delete Success" })
      : notification.error({
          message: "Delete failed",
          description: res.result,
        });
    sendMessage("reload");
    setDeleteFlag(false);
  };

  useEffect(() => {
    if (eventID) {
      console.log(eventID);
      const obs = from(request(userApi.LogDetail(eventID))).subscribe(
        (data) => {
          data && setLogDetail(data);
        }
      );
      return () => obs.unsubscribe();
    }
  }, [eventID]);

  const TempConfig = {
    optList: [
      {
        icon: (
          <IconFont type="icon-trash" style={{ color: "#ec8525" }}></IconFont>
        ),
        event: ({ eventId }: any) => {
          setDeleteId(eventId);
          setDeleteFlag(true);
        },
      },
    ],
    onSearch: async ({ searchPage, filters }: any) => {
      let payload: any = { searchPage, filters };
      if (type !== "customer") {
        payload.includesAll = true;
      }
      const res = await request(userApi.LogEventList(payload));
      res && setWorklog(res);
    },
    rowId: "eventId",
    data: worklog,
    config: [
      {
        title: "功能",
        dataIndex: "eventType",
        key: "eventType",
      },
      {
        title: "菜单",
        dataIndex: "resourceType",
        key: "resourceType",
      },
      {
        title: "站点/域名",
        dataIndex: "resourceName",
        key: "resourceName",
      },
      {
        title: "执行人",
        dataIndex: "initiator",
        key: "initiator",
      },
      {
        title: "执行时间",
        dataIndex: "eventDate",
        key: "eventDate",
        render: (text: number) => moment(text).format("YYYY/MM/DD h:mm:ss"),
      },
    ],
    expandedRowRender: () => {
      return (
        <div>
          {expandaRowDetail.map((item, index) => {
            return (
              <Row key={index} style={{ paddingBottom: 15 }}>
                <Col span={4}>{item.name}</Col>
                <Col span={16}>
                  {item.name === "oldData" || item.name === "newData" ? (
                    <div>
                      <TextArea
                        style={{ width: 500, height: 190 }}
                        value={item.data}
                        readOnly={true}
                      ></TextArea>
                    </div>
                  ) : item.data ? (
                    item.data
                  ) : (
                    "-"
                  )}
                </Col>
              </Row>
            );
          })}
        </div>
      );
    },
    onExpand: (e: boolean, record: worklogDetail) => {
      console.log(e);
      console.log(record);

      if (e) {
        setHandleExpand(true);
        setEventID(record?.eventId);
      } else {
        setHandleExpand(false);
        setEventID("");
      }
    },
    expandedRowKeys: handleExpand ? [logDetail?.eventId || ""] : [""],
  };

  const expandaRowDetail = [
    { name: "eventId", data: logDetail?.eventId },
    { name: "eventDate", data: logDetail?.eventDate },
    { name: "eventService", data: logDetail?.eventService },
    { name: "resourceName", data: logDetail?.resourceName },
    { name: "eventType", data: logDetail?.eventType },
    { name: "initiator", data: logDetail?.initiator },
    { name: "oldData", data: logDetail?.oldData },
    { name: "newData", data: logDetail?.newData },
  ];

  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "功能",
            name: "eventType",
            data: eventType,
            type: "select",
          },
          {
            text: "菜单",
            name: "eventService",
            data: eventService,
            type: "select",
          },
          {
            text: "开始日期",
            name: "startDate",
            type: "datepicker",
          },
          {
            text: "菜单",
            name: "endDate",
            type: "datepicker",
          },
        ]}
        {...TempConfig}
        event$={event$}
      />
      <EdgeModal
        visible={deleteFlag}
        onCancel={() => setDeleteFlag(false)}
        onOk={() => onDelete()}
        title="删除"
        loading={loading}
      >
        你确定删除此账户？
      </EdgeModal>
    </div>
  );
};

export default Index;

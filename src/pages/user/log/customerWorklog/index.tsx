import IconFont from "@/components/icon";
import { Template } from "@/components/template";
import { worklogDetail } from "@/store/api/user";
import { useCodeList, useEventList, useWorkLog } from "@/store/network/user";
import userService from "@/store/network/user/service";
import { Col, message, Popconfirm, Row } from "antd";

import moment from "moment";
import { FC, useEffect, useState } from "react";
interface Role {
  type: number;
}
const Index: FC<Role> = (props: Role) => {
  const codelist = useCodeList();
  const worklog = useEventList();
  const LogDetail = useWorkLog();
  const [handleExpand, setHandleExpand] = useState(true);
  const [eventID, seteventID] = useState<string>("");
  const [eventType, setEventType] = useState<object[]>([]);
  const [eventService, setEventService] = useState<object[]>([]);
  const [params, setparams] = useState<any>();
  useEffect(() => userService?.UserServiceWorkLogCodeList(), []);
  useEffect(() => {
    if (codelist !== undefined) {
      // if (codelist.eventType && codelist.eventService !== undefined) {
      let eventType: object[] = [];
      let eventService: object[] = [];
      codelist?.eventType &&
        Object.entries(codelist?.eventType).map(
          ([key, value]: any, index: number) => {
            eventType.push({ uid: key, name: value });
          }
        );
      codelist?.eventService &&
        Object.entries(codelist?.eventService).map(
          ([key, value]: any, index: number) => {
            eventService.push({ uid: key, name: value });
          }
        );
      setEventType(eventType);
      setEventService(eventService);
      // }
    }
  }, [codelist, codelist?.evetType, codelist?.eventService]);
  useEffect(() => userService?.UserServiceLogDetail(eventID), [eventID]);
  useEffect(() => {
    if (props.type === 2) {
      if(params){
        if (params.filters !== undefined) {
          userService?.UserServiceWorkLogEventList({
            keyword: params.filters.keyword,
            searchPage: params.searchPage,
            includesAll: true,
            eventType: params.filters.eventType,
            eventService: params.filters.eventService,
            startDate: params.filters.startDate,
            endDate: params.filters.endDate,
          });
        } else {
          userService?.UserServiceWorkLogEventList({
            searchPage: { desc: 1, page: 1, pageSize: 10, sort: "" },
            includesAll: true,
          });
        }
      }
      }
      
   
  }, [params, props.type]);

  const TempConfig = {

    onSearch: (params: any) => {
      setparams(params);
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
      {
        title: "操作",
        dataIndex: "",
        key: "",
        render: (key: any) => (
          <div>
            <Popconfirm
              title="Are you sure delete this task?"
              //visible={this.state.visible}
              //onVisibleChange={this.handleVisibleChange}
              onConfirm={() => confirm(key)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <IconFont
                type="icon-shanchu"
                className="DeleteBtn"
                style={{ fontSize: 17, color: "#FF8900" }}
              ></IconFont>
            </Popconfirm>
          </div>
        ),
      },
    ],
    expandedRowRender: () => {
      return (
        <div>
          {expandaRowDetail.map((item, index) => {
            return (
              <Row key={index}>
                <Col span={4}>{item.name}</Col>
                <Col span={5}>{item.data}</Col>
              </Row>
            );
          })}
        </div>
      );
    },
    onExpand: (e: boolean, record: worklogDetail) => {
      if (e) {
        setHandleExpand(true);
        seteventID(record?.eventId);
      } else {
        setHandleExpand(false);
        seteventID("");
      }
    },
    expandedRowKeys: handleExpand ? [LogDetail?.eventId] : [""],
  };

  const expandaRowDetail = [
    { name: "eventId", data: LogDetail?.eventId },
    { name: "eventDate", data: LogDetail?.eventDate },
    { name: "eventService", data: LogDetail?.eventService },
    { name: "resourceName", data: LogDetail?.resourceName },
    { name: "eventType", data: LogDetail?.eventType },
    { name: "initiator", data: LogDetail?.initiator },
    { name: "oldData", data: LogDetail?.oldData },
    { name: "newData", data: LogDetail?.newData },
  ];
  const confirm = (key: { eventId: any }) => {
    const eventId = key.eventId;
    console.log(eventId);
    userService.UserDeleteWorkLog([eventId]);
    message.success("Delete Success");
  };
  const cancel = () => {};

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
      />
    </div>
  );
};

export default Index;
// expandable={{

// expandIcon: ({ expanded, onExpand, record }) =>
//   expanded ? (
//     <IconFont
//       type="icon-search"
//       className="SearchBtn"
//       style={{ fontSize: 12 }}
//       onClick={(e) => {
//         onExpand(record, e);
//       }}
//     ></IconFont>
//   ) : (
//     <IconFont
//       type="icon-search"
//       className="SearchBtn"
//       style={{ fontSize: 12 }}
//       onClick={(e) => {
//         onExpand(record, e);
//       }}
//     ></IconFont>
//   ),
//   onExpand: (e, record: any) => {
//     if (e) {
//       seteventID(record?.eventId);
//       setKey(record?.key);
//       console.log(record, "aa");
//     } else {
//       setKey(-1);
//     }
//   },
// }}

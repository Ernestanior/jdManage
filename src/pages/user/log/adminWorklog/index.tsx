import IconFont from "@/components/icon";
import { Template } from "@/components/template";
import { userApi } from "@/store/api";
import { worklogDetail } from "@/store/api/user";
import {
  useCodeList,
  useEventList,
  useNewDeleteWorklog,
  useWorkLog,
} from "@/store/network/user";
import userService from "@/store/network/user/service";
import request from "@/store/request";
import { Col, Input, Popconfirm, Row } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { from } from "rxjs";

interface Role {
  type: number;
}

const Index: FC<Role> = (props: Role) => {
  const { TextArea } = Input;
  const codelist = useCodeList();
  const worklog = useEventList();
  const deletelog = useNewDeleteWorklog();
  const LogDetail = useWorkLog();
  const [handleExpand, setHandleExpand] = useState(true);
  const [eventID, seteventID] = useState<string>("");
  const [eventType, setEventType] = useState<object[]>([]);
  const [eventService, setEventService] = useState<object[]>([]);
  const [params, setparams] = useState<any>();
  const [deleteId, setDeleteId] = useState<any>();
  useEffect(() => userService?.UserServiceWorkLogCodeList(), []);

  useEffect(() => {
    if (codelist !== undefined) {
      // if (codelist.eventType && codelist.eventService !== undefined) {
      let eventType: object[] = [];
      let eventService: object[] = [];
      codelist?.eventType &&
        Object.entries(codelist?.eventType).forEach(
          ([key, value]: any, index: number) => {
            eventType.push({ uid: key, name: value });
          }
        );
      codelist?.eventService &&
        Object.entries(codelist?.eventService).forEach(
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
    if (props.type === 1) {
      if (params) {
        if (params.filters !== undefined) {
          userService?.UserServiceWorkLogEventList({
            keyword: params.filters.keyword,
            searchPage: params.searchPage,
            eventType: params.filters.eventType,
            eventService: params.filters.eventService,
            startDate: params.filters.startDate,
            endDate: params.filters.endDate,
          });
        } else {
          userService?.UserServiceWorkLogEventList({
            searchPage: { desc: 1, page: 1, pageSize: 10, sort: "" },
          });
        }
      }
    }
  }, [params, props.type, deletelog]);

  const confirm = async () => {
    const res = await request(userApi.UserDeleteWorkLog([deleteId]));
    res && alert("delete Log Success");
  };
  const cancel = () => {};

  const TempConfig = {
    optList: [
      {
        icon: (
          <div>
            <Popconfirm
              title="Are you sure delete this task?"
              //visible={this.state.visible}
              //onVisibleChange={this.handleVisibleChange}
              onConfirm={() => confirm()}
              onCancel={() => cancel()}
              okText="Yes"
              cancelText="No"
              trigger={"click"}
            >
              <div>
                <IconFont
                  type="icon-shanchu"
                  className="DeleteBtn"
                  style={{ fontSize: 17, color: "#FF8900" }}
                ></IconFont>
              </div>
            </Popconfirm>
          </div>
        ),
        event: (data: any) => {
          setDeleteId(data.eventId);
        },
      },
    ],
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
                        allowClear={false}
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

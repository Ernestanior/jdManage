import IconFont from "@/components/icon";
import { Template } from "@/components/template";
import { userApi } from "@/store/api";
import { worklogDetail } from "@/store/api/user";
import { useCodeList, useEventList, useWorkLog } from "@/store/network/user";
import userService from "@/store/network/user/service";
import request from "@/store/request";
import { Col, Input, Popconfirm, Row } from "antd";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import { from } from "rxjs";

interface Role {
  type: number;
}

const Index: FC<Role> = (props: Role) => {
  const { TextArea } = Input;
  const codelist = useCodeList();
  const worklog = useEventList();
  const LogDetail = useWorkLog();
  const [handleExpand, setHandleExpand] = useState(true);
  const [eventID, seteventID] = useState<string>("");
  const [deleteId, setDeleteId] = useState<any>();
  useEffect(() => userService?.UserServiceWorkLogCodeList(), []);

  const eventType = useMemo(() => {
    if (codelist) {
      let { eventType } = codelist;
      const obj = Object.entries(eventType).map(([key, value]: any) => ({
        uid: key,
        name: value,
      }));
      return obj;
    } else {
      return [];
    }
  }, [codelist]);

  const eventService = useMemo(() => {
    if (codelist) {
      let { eventService } = codelist;
      const obj = Object.entries(eventService).map(([key, value]: any) => ({
        uid: key,
        name: value,
      }));
      return obj;
    } else {
      return [];
    }
  }, [codelist]);

  useEffect(() => userService?.UserServiceLogDetail(eventID), [eventID]);

  const confirm = () => {
    from(request(userApi.UserDeleteWorkLog([deleteId]))).subscribe((data) => {
      if (data) {
        alert("delete Log Success");
      }
    });
  };
  const cancel = () => {};

  const TempConfig = {
    optList: [
      {
        icon: (
          <div>
            <Popconfirm
              title="Are you sure delete this task?"
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

    onSearch: ({searchPage, filters}: any) => {
      userService?.UserServiceWorkLogEventList({
        ...filters,
        includesAll: true,
        searchPage,
      });
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

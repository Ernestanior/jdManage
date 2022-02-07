import { Divider, Table } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import "./index.less";
import IconFont from "@/components/icon";
import userService from "@/store/network/user/service";
import { useCodeList, useEventList } from "@/store/network/user";
import moment from "moment";

const Index: FC = (): ReactElement => {
  const columns = [
    {
      title: "key",
      dataIndex: "eventId",
      key: "eventId",
    },
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
      render: (text: number) => moment(text).format(),
    },
    {
      title: "操作",
      dataIndex: "search",
      key: "search",
      render: (_: any, record: { key: React.Key }) => (
        <div>
          <IconFont
            type="icon-search"
            className="SearchBtn"
            style={{ fontSize: 12 }}
            onClick={(_: any) => _}
          ></IconFont>
          <Divider type="vertical" />
          <IconFont
            type="icon-shanchu"
            className="DeleteBtn"
            style={{ fontSize: 17, color: "#FF8900" }}
            onClick={() => _}
          ></IconFont>
        </div>
      ),
    },
  ];
  useEffect(() => userService.UserServiceWorkLogCodeList(), []);
  const codelist = useCodeList();

  useEffect(
    () =>
      userService.UserServiceWorkLogEventList({
        eventType: "site.create",
        keyWord: "",
        searchPage: {
          page: 1,
          pageSize: 25,
        },
      }),
    []
  );
  const eventList = useEventList();

  useEffect(() => {
    console.log(codelist, "codelist");
  }, [codelist]);

  useEffect(() => {
    console.log(eventList, "eventlist");
  }, [eventList]);

  useEffect(() => {
    const a = eventList?.map((item: any) => ({
      key: item.eventId,
      eventType: item.eventType,
      resourceType: item.resourceType,
      resourceName: item.resourceName,
      initiator: item.initiator,
      eventDate: item.eventDate,
    }));
    setfirst(a);
  }, [eventList]);
  const [first, setfirst] = useState<any | null>();

  return (
    <div>
      <Table
        columns={columns}
  
        dataSource={first}
        expandable={{
          expandedRowRender: () => <p style={{ margin: 0 }}>

            aaaaa
          </p>,
        }}
      />
    </div>
  );
};

export default Index;

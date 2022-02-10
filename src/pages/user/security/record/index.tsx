import IconFont from "@/components/icon";
import { Pagination, Table } from "antd";
import "./index.less";
import React, { FC, ReactElement, useEffect, useState } from "react";
import userService from "@/store/network/user/service";
import { useNewUserAccessLog } from "@/store/network/user";

const Index: FC = (): ReactElement => {
  const columns = [
    {
      title: "登陆平台",
      dataIndex: "userAgent",
      key: "userAgent",
    },
    {
      title: "IP地址",
      dataIndex: "remoteIp",
      key: "remoteIp",
    },
    {
      title: "登陆时间",
      dataIndex: "accessTime",
      key: "accessTime",
    },
    {
      title: "操作",
      dataIndex: "delete",
      key: "delete",
      render: () => (
        <div>
          <IconFont
            type="icon-shanchu"
            style={{ fontSize: 17, color: "#FF8900" }}
          ></IconFont>
        </div>
      ),
    },
  ];
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [Accesslog, setAccessLog] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    userService.UserAccessLog({
      searchPage: { desc: 1, page: 1, pageSize: 25 },
    });
  },[]);

  const accessLog = useNewUserAccessLog();

  useEffect(() => {
    const a = accessLog?.content.map((item: any) => ({
      ...item,
      key: item.id,
    }));
    setAccessLog(a);
    setLoading(false);
  }, [accessLog]);

  const hanldePagination = (page: number, pageSize: number) => {
    setLoading(true);
    setAccessLog([]);
    userService?.UserAccessLog({
      searchPage: { desc: 1, page: page, pageSize: pageSize },
    });
  };
  return (
    <div>
      <Table
        loading={loading}
        dataSource={Accesslog}
        columns={columns}
        bordered={false}
        pagination={false}
      />
      <Pagination
        total={loading?"":accessLog?.totalElements}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items ${loading?"":accessLog?.totalPages} pages`}
        pageSizeOptions={[25, 50, 75, 100]}
        defaultPageSize={25}
        onChange={(page, pageSize) => {
          hanldePagination(page, pageSize);
        }}
      />
    </div>
  );
};

export default Index;

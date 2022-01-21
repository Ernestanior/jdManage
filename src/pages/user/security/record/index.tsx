import IconFont from "@/components/icon";
import { Table } from "antd";
import "./index.less";
import React, { FC, ReactElement, useState } from "react";

const temporaryData = [
  {
    key: 1,
    loginStage: "ja1c",
    ip: "122.44.1.0",
    loginTime: "19:00",
  },
  {
    key: 4,
    loginStage: "ja2c",
    ip: "122.44.1.0",
    loginTime: "19:00",
  },
  {
    key: 2,
    loginStage: "ja3c",
    ip: "122.44.1.0",
    loginTime: "19:00",
  },
];

const Index: FC = (): ReactElement => {
  const columns = [
    {
      title: "登陆平台",
      dataIndex: "loginStage",
      key: "loginStage",
    
    },
    {
      title: "IP地址",
      dataIndex: "ip",
      key: "ip",
      
    },
    {
      title: "登陆时间",
      dataIndex: "loginTime",
      key: "loginTime",
      
    },
    {
      title: "操作",
      dataIndex: "delete",
      key: "delete",
      render: (_: any, record: { key: React.Key }) => (
        <div>
          <IconFont
            type="icon-shanchu"
            style={{ fontSize: 17, color: "#FF8900"}}
            onClick={() => handleDelete(record.key)}
          ></IconFont>
        </div>
      ),
    },
  ];
  const [data, setData] = useState<any>(temporaryData);

  const handleDelete = (key: any) => {
    setData(data.filter((item: any) => item.key !== key));
  };

  return (
    <div>
     
      <Table dataSource={data} columns={columns} bordered={false} />
    </div>
  );
};

export default Index;

import { Table } from "antd";
import { FC, useMemo } from "react";
interface IProps {
  data: any;
  type: "availability" | "responseTime";
}
interface ITableData {
  key: number;
  supplier: string;
  usage: string;
}
const columnsAvail = [
  {
    title: "cdnSuppliers",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "cdnUtil",
    dataIndex: "usage",
    key: "usage",
  },
];
const columnsResTime = [
  {
    title: "cdnSuppliers",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "response time",
    dataIndex: "rest",
    key: "rest",
  },
];
const TableComp: FC<IProps> = ({ data, type }) => {
  const tableData: ITableData[] = useMemo(
    () =>
      data &&
      Object.keys(data).map((key, i) => {
        return type === "availability"
          ? {
              key: i,
              supplier: key,
              usage: (data[key].avg * 100).toFixed(2).toString() + " %",
            }
          : {
              key: i,
              supplier: key,
              rest: parseInt(data[key].avg).toString() + "s",
            };
      }),
    [data]
  );
  return (
    <Table
      columns={type === "availability" ? columnsAvail : columnsResTime}
      dataSource={tableData}
      pagination={false}
    />
  );
};

export default TableComp;

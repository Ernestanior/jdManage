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
    title: "min",
    dataIndex: "min",
    key: "min",
  },
  {
    title: "max",
    dataIndex: "max",
    key: "max",
  },
  {
    title: "avg",
    dataIndex: "avg",
    key: "avg",
  },
];
const columnsResTime = [
  {
    title: "cdnSuppliers",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "min(ms)",
    dataIndex: "min",
    key: "min",
  },
  {
    title: "max(ms)",
    dataIndex: "max",
    key: "max",
  },
  {
    title: "avg(ms)",
    dataIndex: "avg",
    key: "avg",
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
              min: (data[key].min * 100).toFixed(2).toString() + " %",
              max: (data[key].max * 100).toFixed(2).toString() + " %",
              avg: (data[key].avg * 100).toFixed(2).toString() + " %",
            }
          : {
              key: i,
              supplier: key,
              min: Math.round(data[key].min),
              max: Math.round(data[key].max),
              avg: Math.round(data[key].avg),
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

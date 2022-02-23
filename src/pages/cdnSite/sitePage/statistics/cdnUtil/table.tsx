import { Table } from "antd";
import { FC, useMemo } from "react";
import { colorPalette } from "../../../../../components/charts/flow/flow";
interface IProps {
  data: any;
}
interface ITableData {
  key: number;
  color: string;
  supplier: string;
  usage: string;
}
const columns = [
  {
    title: "color",
    dataIndex: "color",
    key: "color",
    render: (color: string) => {
      return (
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            background: color,
          }}
        ></span>
      );
    },
  },
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
const TableComp: FC<IProps> = ({ data }) => {
  const tableData: ITableData[] = useMemo(
    () =>
      data &&
      Object.keys(data).map((key, i) => ({
        key: i,
        color: colorPalette[i] || colorPalette[colorPalette.length - i],
        supplier: key,
        usage: (data[key].avg * 100).toFixed(2).toString() + " %",
      })),
    [data]
  );
  return <Table columns={columns} dataSource={tableData} pagination={false} />;
};

export default TableComp;

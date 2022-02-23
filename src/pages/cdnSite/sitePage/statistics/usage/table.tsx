import { transformBindWidth, transformFlow } from "@/common/utils/util";
import { Table } from "antd";
import { FC, useMemo } from "react";
interface IProps {
  bandwidth: any;
  flow: any;
}
interface ITableData {
  key: number;
  color: string;
  supplier: string;
  usage: string;
}
const columns = [
  {
    title: "cdn",
    key: "cdn",
    dataIndex: "cdn",
  },
  {
    title: "peak",
    key: "peak",
    dataIndex: "peak",
    render: (i: number) => transformBindWidth(i),
  },
  {
    title: "95th-percentile",
    key: "95th-percentile",
    dataIndex: "95th-percentile",
    render: (i: number) => transformBindWidth(i),
  },
  {
    title: "sum",
    key: "sum",
    dataIndex: "sum",
    render: (i: number) => transformFlow(i),
  },
];
const TableComp: FC<IProps> = ({ bandwidth, flow }) => {
  const tableData: ITableData[] = useMemo(
    () =>
      bandwidth &&
      Object.keys(bandwidth).map((key, i) => ({
        key,
        cdn: key,
        peak: bandwidth[key]["peak"] || 0,
        "95th-percentile": bandwidth[key]["95th-percentile"] || 0,
        sum: flow[key] ? flow[key]["sum"] || 0 : "",
      })),
    [bandwidth]
  );
  console.log(tableData);

  if (!bandwidth) {
    return null;
  }
  return <Table columns={columns} dataSource={tableData} pagination={false} />;
};

export default TableComp;

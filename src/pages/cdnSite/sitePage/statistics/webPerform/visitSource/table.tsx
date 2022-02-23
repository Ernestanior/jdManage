import { Table } from "antd";
import { FC, useMemo } from "react";
import { ISiteOrigin } from ".";

interface IProps {
  data: any;
  type: "region" | "ip";
  loading: boolean;
}
const columnsRegion = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count",
  },
];

const columnsIp = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count",
  },
];
const TableComp: FC<IProps> = ({ data, type, loading }) => {
  const tableData: ISiteOrigin[] = useMemo(
    () =>
      data &&
      data
        .map((value: ISiteOrigin, i: number) => {
          return {
            key: i,
            no: i + 1,
            region: value.region,
            count: value.count,
            ip: value.ip,
          };
        })
        .filter((v: any, i: number) => i < 10),
    [data]
  );
  return (
    <Table
      columns={type === "region" ? columnsRegion : columnsIp}
      dataSource={tableData}
      pagination={false}
      loading={loading}
    />
  );
};

export default TableComp;

import { FC, useMemo } from "react";
import { Drawer, Table } from "antd";
import { useLoading } from "@/components/loading";

interface ITableData {
  ip?: string;
  region: string;
  count: number;
}
interface IProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  data: ITableData[];
}

const CreateDrawer: FC<IProps> = ({ title, visible, onClose, data }) => {
  const loading = useLoading();
  const currData = useMemo(
    () => data.map((v, i) => ({ key: i, ...v })),
    [data]
  );

  const columns = [
    {
      title: "访问来源",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "访问量",
      key: "count",
      dataIndex: "count",
    },
  ];
  return (
    <Drawer
      title={title}
      width={570}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      <Table columns={columns} dataSource={currData} loading={loading} />
    </Drawer>
  );
};
export default CreateDrawer;

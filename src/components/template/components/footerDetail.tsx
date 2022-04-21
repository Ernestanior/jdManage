import { FC, useMemo } from "react";
import { Select } from "antd";
const { Option } = Select;

interface IProps {
  start: string;
  end: string;
  total: string;
  hide: boolean;
  size: number;
  pageSizeChange?: (pageSize: number | undefined) => void;
}

const FooterDetail: FC<IProps> = ({
  start,
  end,
  total,
  hide,
  size,
  pageSizeChange,
}) => {
  const message = useMemo(
    () => (
      <>
        显示第{start}到第{end}条记录，共{total}条。每页显示
        <Select
          defaultValue={size.toString()}
          style={{
            width: 65,
            margin: "0 10px",
          }}
          onChange={(pageSize) =>
            pageSizeChange && pageSizeChange(parseInt(pageSize))
          }
          size="small"
        >
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="15">15</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
        </Select>
        条
      </>
    ),
    [end, start, total, pageSizeChange, size]
  );
  return <div style={{ color: th, paddingLeft: 14 }}>{!hide && message}</div>;
};
export default FooterDetail;

const th = "#A7A7A7";

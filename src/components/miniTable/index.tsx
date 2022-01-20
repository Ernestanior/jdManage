import React, { FC, ReactElement, useState } from "react";
import "./index.less";
import { Btn } from "@/components/button";
import { Pagination, Button } from "antd";
import { PlusCircleOutlined, SettingFilled } from "@ant-design/icons";
import Loading from "@/components/loading/context";
interface IProps {
  title: string;
  btnTitle: string;
  list: string[] | null;
  loading: boolean;
  totalElements: number | null;
  pageChange: (page: number) => void;
}
const MiniTable = ({
  title,
  btnTitle,
  list,
  loading,
  totalElements,
  pageChange,
}: IProps): ReactElement => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  return (
    <div className="mini-table">
      <div className="mini-table-header">
        <div className="title">
          {title}
          <div className="more"> {`查看更多>>`} </div>
        </div>
        <Btn type="primary" icon={<PlusCircleOutlined />}>
          {btnTitle}
        </Btn>
      </div>
      <div className="mini-table-body">
        <Loading display={loading}></Loading>
        {list &&
          list.map((item, index) => (
            <div className="list-item" key={index}>
              {item}
              <SettingFilled style={{ color: "#ef8f35", fontSize: "16px" }} />
            </div>
          ))}
      </div>
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          size="small"
          pageSize={6}
          total={totalElements || 1}
          onChange={(page) => pageChange(page)}
        />
      </div>
    </div>
  );
};
export default MiniTable;

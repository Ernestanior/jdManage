import { Button, Popconfirm, Select, Table } from "antd";
import React, { FC, ReactElement, useState } from "react";
import { EditableCell } from "./editableCell";
import { EditableRow } from "./editableRow";

type EditableTableProps = Parameters<typeof Table>[0];

interface IProps {
  loading: boolean;
  editable: boolean;
  data: any[];
  column: any;
  btns?: ReactElement;
  title?: ReactElement;
  onOk?: any;
  onSave: Function;
  onCancel?: () => void;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const Index: FC<IProps> = ({
  loading,
  data,
  column,
  btns,
  editable,
  title,
  onSave,
  onOk,
  onCancel,
}): ReactElement => {
  const columns = column.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const handleSave = (row: any) => {
    const index = data.findIndex((item) => row.key === item.key);
    const item = data[index];
    data.splice(index, 1, {
      ...item,
      ...row,
    });
    onSave([...data]);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {title}
        <>{btns}</>
      </div>

      <Table
        loading={loading}
        components={components}
        // rowClassName={() => "editable-row"}
        bordered
        dataSource={data}
        columns={columns as ColumnTypes}
        pagination={false}
      />
      {editable && (
        <div style={{ marginTop: "20px" }}>
          <Button type="primary" style={{ marginRight: "20px" }} onClick={onOk}>
            确定
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </div>
      )}
    </div>
  );
};

export default Index;

import React, { FC, ReactElement, useEffect, useState } from "react";
import Editable from "@/components/editable";
import { Button, notification, Popconfirm, Select } from "antd";
import IconFont from "@/components/icon";
import { from } from "rxjs";
import request from "@/store/request";
import { siteApi } from "@/store/api";
import useUid from "@/hooks/useUid";

export interface DataType {
  key: React.Key;
  sourceIp: string;
  sourcePort: string;
  sourceScheme: string;
}
const { Option } = Select;

let initData: any[] = [];
let initScheme: string = "HTTP";
const Index: FC = (): ReactElement => {
  //获取当前uid
  const uid = useUid();
  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [scheme, setScheme] = useState<string>("");
  const [data, setData] = useState<DataType[]>([]);
  const [count, setCount] = useState(0);

  const column = [
    {
      title: "source",
      dataIndex: "sourceIp",
      editable: editable,
    },
    {
      title: "port",
      dataIndex: "sourcePort",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <IconFont
              // onClick={() => remove(field.name)}
              style={{
                color: "#ef8f35",
                fontSize: "20px",
                marginLeft: "5px",
              }}
              type="icon-trash"
            />
          </Popconfirm>
        ) : null,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const data$ = from(request(siteApi.SourceList(uid))).subscribe((data) => {
      setLoading(false);
      if (data) {
        const { content } = data;
        if (content) {
          initScheme = content[0].sourceScheme.toUpperCase();
          setScheme(initScheme);
          initData = content.map((item: any, index: number) => ({
            ...item,
            key: index,
          }));
          setData(initData);
          setCount(content.length);
        }
      }
    });
    return () => data$.unsubscribe();
  }, [refresh]);
  const handleChange = (e: any) => {
    setScheme(e);
    setData(
      data.map((item) => ({
        ...item,
        sourcePort: e === "HTTP" ? "80" : "443",
      }))
    );
  };
  const handleDelete = (key: React.Key) => {
    setEditable(true);
    setData(data.filter((item: any) => item.key !== key));
  };
  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      sourceIp: "-",
      sourceScheme: scheme,
      sourcePort: scheme === "HTTP" ? "80" : "443",
    };
    setEditable(true);
    setData([...data, newData]);
    setCount(count + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const submitData = {
      uid,
      sources: data.map((item: any) => item.sourceIp),
      sourceScheme: scheme.toLocaleLowerCase(),
    };
    const res = await request(siteApi.SourceUpdate(submitData));
    setLoading(false);
    setEditable(false);
    setRefresh(!refresh);

    if (!(res instanceof Array)) {
      notification.success({
        message: "Update Success",
      });
    }
  };
  const handleCancel = () => {
    setData(initData);
    setEditable(false);
    setScheme(initScheme);
  };
  const btns = (
    <div style={{ marginBottom: 16 }}>
      <Button
        onClick={() => setEditable(!editable)}
        style={{ marginRight: "20px" }}
        disabled={loading}
      >
        编辑全部
      </Button>
      <Button onClick={handleAdd} type="primary" disabled={loading}>
        新增源点
      </Button>
    </div>
  );
  const title = (
    <div style={{ fontSize: "18px", fontWeight: 550 }}>
      <span style={{ marginRight: "15px" }}>回源方式:</span>
      {editable ? (
        <Select defaultValue={scheme} onChange={handleChange}>
          <Option value="HTTP">HTTP</Option>
          <Option value="HTTPS">HTTPS</Option>
        </Select>
      ) : (
        scheme
      )}
    </div>
  );
  return (
    <Editable
      loading={loading}
      column={column}
      data={data}
      btns={btns}
      title={title}
      editable={editable}
      onOk={handleSubmit}
      onCancel={handleCancel}
      onSave={(data: any) => setData(data)}
    ></Editable>
  );
};

export default Index;

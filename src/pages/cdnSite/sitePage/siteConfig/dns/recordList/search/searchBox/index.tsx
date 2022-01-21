import React, { FC, ReactElement } from "react";
import { Form, Input, Select, Button, Tag } from "antd";
// import PubSub from "pubsub-js";
import "./index.less";

interface IResult {
  record: string;
  domain: string;
  dnsStatus: string;
  sslStatus: string;
}
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const Index: FC = (): ReactElement => {
  // 筛选条件汇总并保存
  const [result, setResult] = React.useState<IResult>({
    record: "",
    domain: "",
    dnsStatus: "",
    sslStatus: "",
  });
  // tag标签关闭事件
  const handleClose = (key: string, value: string) => {
    setResult({ ...result, [key]: value });
    // PubSub.publish("RecordSearch", { ...result, [key]: value });
  };
  // 数据提交事件
  const onFinish = (values: any) => {
    setResult(values);
    // PubSub.publish("RecordSearch", values);
  };
  return (
    <div className="search-box-bg">
      <Form
        className="search-box-container"
        onFinish={onFinish}
        {...formItemLayout}
      >
        <Form.Item label="记录" name="record">
          <Input />
        </Form.Item>
        <Form.Item label="域名" name="domain">
          <Input />
        </Form.Item>
        <Form.Item label="筛选条件" className="search-box-select-box">
          <Form.Item name="dnsStatus" className="search-box-select-item">
            <Select placeholder="DNS状态" allowClear>
              <Option value="已指向">已指向</Option>
              <Option value="未指向">未指向</Option>
            </Select>
          </Form.Item>
          <Form.Item name="sslStatus" className="search-box-select-item">
            <Select placeholder="SSL状态" allowClear>
              <Option value="on">on</Option>
              <Option value="off">off</Option>
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 2, offset: 21 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="search-box-button"
          >
            查询
          </Button>
        </Form.Item>
      </Form>
      {/* tag标签组件 */}
      <span className="search-tag">
        {result.record || result.domain || result.dnsStatus || result.sslStatus
          ? "当前位置:"
          : ""}
        {result.record ? (
          <Tag closable onClose={() => handleClose("record", "")}>
            记录: {result.record}
          </Tag>
        ) : (
          ""
        )}
        {result.domain ? (
          <Tag closable onClose={() => handleClose("domain", "")}>
            域名: {result.domain}
          </Tag>
        ) : (
          ""
        )}
        {result.dnsStatus ? (
          <Tag closable onClose={() => handleClose("dnsStatus", "")}>
            DNS状态: {result.dnsStatus}
          </Tag>
        ) : (
          ""
        )}
        {result.sslStatus ? (
          <Tag closable onClose={() => handleClose("sslStatus", "")}>
            SSL状态: {result.sslStatus}
          </Tag>
        ) : (
          ""
        )}
      </span>
    </div>
  );
};

export default Index;

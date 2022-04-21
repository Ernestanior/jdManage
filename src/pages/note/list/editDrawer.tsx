import { FC, useEffect } from "react";
import { companyApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, Form, Input, Select } from "antd";

interface IProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  loading: boolean;
  data: any;
}
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const { Option } = Select;
const EditDrawer: FC<IProps> = ({ visible, onClose, reload, data }) => {
  const [form] = Form.useForm();
  useEffect(() => form.setFieldsValue(data), [data]);
  const onFinish = async (e: any) => {
    if (data) {
      const res = await request(
        companyApi.UpdateCompany({ ...e, uid: data.uid })
      );
      if (res) {
        form.resetFields();
        onClose();
        reload();
        // notification.success({ message: "success" });
      }
    }
  };
  return (
    <Drawer
      title="更新公司"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
      closable={false}
      getContainer={false}
    >
      <Form onFinish={onFinish}>
        <Form.Item
          {...formItemLayout}
          name="companyName"
          label="公司名字"
          rules={[
            {
              required: true,
              message: "Company name cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input company name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="description"
          label="公司简介"
          rules={[
            {
              required: true,
              message: "Description cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input company description" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="logo"
          label="公司图标"
          rules={[
            {
              required: true,
              message: "Company logo cannot be empty!",
            },
          ]}
        >
          {/* <Upload
            listType="picture"
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload> */}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="staffNum"
          label="公司规模"
          rules={[
            {
              required: true,
              message: "Company logo cannot be empty!",
            },
          ]}
        >
          <Select>
            <Option value="1-50">50-99人</Option>
            <Option value="50-199">50-199人</Option>
            <Option value="200-500">200-500人</Option>
            <Option value="500-1000">500-1000人</Option>
            <Option value="1000以上">1000人以上</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
          <Button className="default-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditDrawer;

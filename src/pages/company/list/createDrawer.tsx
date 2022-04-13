import { FC } from "react";
import { companyApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, Form, Input, notification, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface IProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  loading: boolean;
  type: string | null;
}
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};


const { Option } = Select;
const CreateDrawer: FC<IProps> = ({
  visible,
  onClose,
  reload,
  loading,
  type,
}) => {
  const [form] = Form.useForm();
  const onFinish = async (e: any) => {
    const res = await request(
      companyApi.CreateCompany({ ...e, type: type || "admin" })
    );
    if (res) {
      form.resetFields();
      onClose();
      reload();
      notification.success({ message: "success" });
    }
  };
  return (
    <Drawer
      title="新增公司"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
      closable={false}
    >
      <Form
        onFinish={onFinish}
        initialValues={{ protocol: "HTTPS", websocket: false }}
      >
        <Form.Item
          {...formItemLayout}
          name="city"
          label="城市"
          rules={[
            {
              required: true,
              message: "City cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input city" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="companyId"
          label="公司id"
          rules={[
            {
              required: true,
              message: "Company id cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input company id" />
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
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item {...formItemLayout} name="stuffNum" label="公司规模">
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

export default CreateDrawer;

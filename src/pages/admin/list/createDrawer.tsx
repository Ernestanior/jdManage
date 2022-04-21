import { FC } from "react";
import { adminApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, Form, Input, notification } from "antd";
import { IAdminInfo } from "@/store/network/admin/interface";
import md5 from "md5";

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

const CreateDrawer: FC<IProps> = ({ visible, onClose, reload }) => {
  const [form] = Form.useForm();
  const onFinish = async (e: IAdminInfo) => {
    const { username, password } = e;
    const payload = { username, password: md5(password) };
    const res = await request(adminApi.CreateAdmin(payload));
    if (res.code === 200) {
      form.resetFields();
      onClose();
      reload();
      notification.success({ message: "success" });
    }
  };
  return (
    <Drawer
      title="新增管理员"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
      closable={false}
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          {...formItemLayout}
          name="username"
          label="账号"
          rules={[
            {
              required: true,
              message: "username cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input username" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "password cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input password" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
          <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateDrawer;

import { FC, useEffect } from "react";
import request from "@/store/request";
import { Button, Drawer, Form, Input, notification } from "antd";
import { adminApi } from "@/store/api";
import md5 from "md5";

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
const EditDrawer: FC<IProps> = ({ visible, onClose, reload, data }) => {
  const [form] = Form.useForm();
  useEffect(() => form.setFieldsValue(data), [data, form]);
  const onFinish = async (e: any) => {
    const res = await request(
      adminApi.UpdateAdmin({ ...e, password: md5(e.password) })
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
      title="更新管理员密码"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={700}
      closable={false}
      getContainer={false}
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item hidden name="username">
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="password" label="密码">
          <Input />
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

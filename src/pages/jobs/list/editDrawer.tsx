import { FC, useEffect } from "react";
import { companyApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, Form, Input } from "antd";

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
const CreateDrawer: FC<IProps> = ({
  visible,
  onClose,
  reload,
  loading,
  data,
}) => {
  const [form] = Form.useForm();
  useEffect(() => form.setFieldsValue(data), [data, form]);
  const onFinish = async (e: any) => {
    if (data) {
      const res = await request(
        companyApi.ModifyCompany({ ...e, uid: data.uid })
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
      title="修改账号"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
      closable={false}
      getContainer={false}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          {...formItemLayout}
          name="email"
          label="登录邮箱"
          rules={[
            {
              required: true,
              message: "邮箱不能为空!",
            },
          ]}
        >
          <Input placeholder="请输入你的邮箱" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="name"
          label="用户名"
          rules={[
            {
              required: true,
              message: "用户名不能为空!",
            },
          ]}
        >
          <Input placeholder="请输入你的用户名" />
        </Form.Item>
        <section
          style={{
            width: "150px",
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-between",
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            确定
          </Button>
          <Button htmlType="reset" loading={loading} onClick={onClose}>
            取消
          </Button>
        </section>
      </Form>
    </Drawer>
  );
};

export default CreateDrawer;

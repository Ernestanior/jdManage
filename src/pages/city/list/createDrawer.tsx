import { FC } from "react";
import { cityApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, Form, Input, notification } from "antd";
import { ICity } from "@/store/api/city";

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
  const onFinish = async (e: ICity) => {
    // const { city } = e;
    const res = await request(cityApi.CreateCity(e));
    if (res.code === 200) {
      form.resetFields();
      onClose();
      reload();
      notification.success({ message: "success" });
    }
  };
  return (
    <Drawer
      title="新增城市"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
      closable={false}
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          {...formItemLayout}
          name="city"
          label="城市名"
          rules={[
            {
              required: true,
              message: "city cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input city" />
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

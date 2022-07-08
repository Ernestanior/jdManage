import { FC, useState } from "react";
import { Button, Drawer, Form, notification, Upload } from "antd";
import Loading from "@/components/loading/context";
import { UploadOutlined } from "@ant-design/icons";
import { noteApi } from "@/store/api";
import request from "@/store/request";

interface IProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  noteId: number;
  title: string;
  loading: boolean;
}

const DetailDrawer: FC<IProps> = ({
  visible,
  onClose,
  title,
  reload,
  loading,
  noteId,
}) => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState<any[]>([]);

  const onFinish = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("pics", file));
    const result = await request(noteApi.UploadPic(noteId, formData));
    if (result.code) {
      form.resetFields();
      setFiles([]);
      onClose();
      reload();
      notification.success({ message: "success" });
    }
  };

  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={600}
      closable={false}
      getContainer={false}
    >
      <Loading display={loading}></Loading>
      <Form onFinish={onFinish}>
        <Form.Item
          name="logo"
          label="笔记图片"
          rules={[
            {
              required: true,
              message: "Note picture cannot be empty!",
            },
          ]}
        >
          <Upload
            listType="picture"
            beforeUpload={(file) => {
              setFiles([...files, file]);
              return false;
            }}
            maxCount={6}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
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

export default DetailDrawer;

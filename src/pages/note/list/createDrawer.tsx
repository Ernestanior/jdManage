import { FC, useState } from "react";
import { noteApi } from "@/store/api";
import request from "@/store/request";
import {
  Button,
  Drawer,
  Form,
  Input,
  notification,
  Select,
  Upload,
} from "antd";
import moment from "moment";
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
const CreateDrawer: FC<IProps> = ({ visible, onClose, reload }) => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState<any[]>([]);

  const onFinish = async (e: any) => {
    const res = await request(
      noteApi.CreateNote({
        ...e,
        courseCode: e.courseCode.toUpperCase(),
        publishTime: moment().format("YYYYMMDDHHmmss"),
      })
    );
    if (res.code === 200) {
      const formData = new FormData();
      console.log(files);

      files.forEach((file) => formData.append("pics", file));
      const result = await request(noteApi.UploadPic(res.data, formData));
      if (result.code) {
        console.log(result);
        form.resetFields();
        onClose();
        reload();
        notification.success({ message: "success" });
      }
    }
  };
  return (
    <Drawer
      title="新增笔记"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={700}
      closable={false}
    >
      <Form onFinish={onFinish}>
        <Form.Item
          {...formItemLayout}
          name="title"
          label="笔记标题"
          rules={[
            {
              required: true,
              message: "Title cannot be empty!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="uniId"
          label="学校"
          initialValue={1}
          rules={[
            {
              required: true,
              message: "Type cannot be empty!",
            },
          ]}
        >
          <Select>
            <Option value={1}>UQ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="courseCode"
          label="课程编号"
          rules={[
            {
              required: true,
              message: "CourseCode cannot be empty!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="content"
          label="笔记内容"
          rules={[
            {
              required: true,
              message: "Content cannot be empty!",
            },
          ]}
        >
          <Input.TextArea rows={14} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
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

export default CreateDrawer;

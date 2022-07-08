import { FC, useEffect, useState } from "react";
import { companyApi } from "@/store/api";
import request, { img_url } from "@/store/request";
import {
  Button,
  Drawer,
  Form,
  Input,
  notification,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

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
  const [file, setFile] = useState<any>();
  const [diffData, setDiffData] = useState<Object>({});

  useEffect(() => {
    form.setFieldsValue(data);
    return () => setDiffData({});
  }, [data, form]);
  const onFinish = async (e: any) => {
    const res = await request(
      companyApi.UpdateCompany({ ...diffData, id: e.id })
    );
    if (res.code === 200) {
      if (file) {
        const formData = new FormData();
        formData.append("logo", file);
        const result = await request(
          companyApi.UploadCompanyLogo(e.id, formData)
        );
        if (result.code === 200) {
          form.resetFields();
          onClose();
          reload();
          setFile(null);
          notification.success({ message: "success" });
        }
        return;
      }
      form.resetFields();
      onClose();
      reload();
      notification.success({ message: "success" });
    }
  };
  return (
    <Drawer
      title="更新公司"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={700}
      closable={false}
      getContainer={false}
    >
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={(e) => setDiffData({ ...diffData, ...e })}
      >
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
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
          <Input.TextArea rows={10} placeholder="Input company description" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="公司图标">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {data.logoName && (
              <div>
                <span style={{ marginRight: 20 }}>原Logo:</span>
                <img
                  style={{ width: 100 }}
                  src={`${img_url}/${data.logoName}`}
                  alt=""
                ></img>
              </div>
            )}
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
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
            <Option value="1-50人">1-50人</Option>
            <Option value="50-199人">50-199人</Option>
            <Option value="200-500人">200-500人</Option>
            <Option value="500-1000人">500-1000人</Option>
            <Option value="1000人以上">1000人以上</Option>
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

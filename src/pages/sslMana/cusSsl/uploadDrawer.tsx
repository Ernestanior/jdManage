import { sslManageApi } from "@/store/api";
import SslAPI from "@/store/api/sslManage";
import { useCustomerList } from "@/store/network/customer";
import customerService from "@/store/network/customer/service";
import request from "@/store/request";
import {
  Button,
  Drawer,
  Form,
  Input,
  notification,
  Select,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Dragger from "antd/lib/upload/Dragger";
import { FC, useCallback, useEffect, useState } from "react";
import { from } from "rxjs";
import "./index.less";
interface IProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  loading: boolean;
}
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const CreateDrawer: FC<IProps> = ({ visible, onClose, reload, loading }) => {
  const [certData, setCertData] = useState("");
  const [keyData, setKeyData] = useState("");
  const customerList = useCustomerList();
  const [form] = Form.useForm();

  useEffect(() => {
    const dragData = { sslKey: keyData, sslCrt: certData };
    form.setFieldsValue(dragData);
  }, [keyData, certData]);
  //CustomerList for select option
  useEffect(() => {
    if (!customerList || !customerList.content) {
      customerService.findCustomer({
        searchPage: { page: 1, pageSize: 99999 },
      });
    }
  }, [customerList]);
  const onSubmit = useCallback((e: any) => {
    const payload = { ...e, sslEnable: 0 };
    const res = request(sslManageApi.uploadCert(payload));
    if (res instanceof Object) {
      notification.success({ message: "Upload Success" });
      form.resetFields();
      onClose();
      reload();
    }
  }, []);
  return (
    <Drawer
      title="新增客户"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={540}
      closable={false}
      getContainer={false}
    >
      <Form form={form} {...formItemLayout} onFinish={onSubmit}>
        <Form.Item
          label="选择客户"
          name="customerUid"
          rules={[{ required: true }]}
        >
          <Select>
            <>
              {customerList &&
                customerList.content &&
                customerList.content.length > 0 &&
                customerList.content.map((v, t) => (
                  <Option value={v.uid} key={t}>
                    {v.email}
                  </Option>
                ))}
            </>
          </Select>
        </Form.Item>

        <Upload
          className="ssl-upload"
          accept=".key"
          showUploadList={false}
          // Prevent onClick event
          openFileDialogOnClick={false}
          beforeUpload={(file: any) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              setKeyData(e.target.result);
            };
            reader.readAsText(file);
            // Prevent upload
            return false;
          }}
        >
          <Form.Item
            label="SSL Key 文件"
            name="sslKey"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="将文件拖拽到文本框内，或者将文件内容粘贴到此处"
              autoSize={{ minRows: 8, maxRows: 8 }}
              value={keyData}
            />
          </Form.Item>
        </Upload>

        <Upload
          accept=".crt"
          className="ssl-upload"
          showUploadList={false}
          // Prevent onClick event
          openFileDialogOnClick={false}
          beforeUpload={(file: any) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              setCertData(e.target.result);
            };
            reader.readAsText(file);
            // Prevent upload
            return false;
          }}
        >
          <Form.Item
            label="SSL Cert 文件"
            name="sslCrt"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="将文件拖拽到文本框内，或者将文件内容粘贴到此处"
              autoSize={{ minRows: 8, maxRows: 8 }}
              value={certData}
            />
          </Form.Item>
        </Upload>
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

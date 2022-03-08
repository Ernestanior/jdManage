import { warnIcon } from "@/components/icon";
import Tip from "@/components/tip";
import { customerApi } from "@/store/api";
import {
  IDefenceQuota,
  IServiceDomain,
} from "@/store/network/customer/interface";
import request from "@/store/request";
import {
  Button,
  Drawer,
  Form,
  Input,
  notification,
  Select,
  Switch,
} from "antd";
import { FC, useEffect, useState } from "react";

interface IProps {
  data: any;
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  loading: boolean;
  defenceQuota: IDefenceQuota[];
  serviceDomain: IServiceDomain[];
}
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const EditDrawer: FC<IProps> = ({
  data,
  visible,
  onClose,
  reload,
  loading,
  defenceQuota,
  serviceDomain,
}) => {
  const [form] = Form.useForm();
  const [cdnEnabled, setCdnEnabled] = useState<boolean>(false);
  const [dnsEnabled, setDnsEnabled] = useState<boolean>(true);
  const [defenceEnabled, setDefenceEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (data.uid) {
      const currData = {
        ...data,
        dnsConfig: data.dnsConfig ? data.dnsConfig.domainQuota : "",
      };
      form.setFieldsValue(currData);
      setCdnEnabled(!!data.cdnEnabled);
      setDnsEnabled(!!data.dnsEnabled);
      setDefenceEnabled(!!defenceEnabled);
    }
  }, [data]);
  useEffect(() => {
    if (!cdnEnabled && !dnsEnabled) {
      notification.warn({ message: "CDN和DNS不能同时关闭" });
      setDnsEnabled(true);
    }
  }, [cdnEnabled, dnsEnabled]);
  const onFinish = async (e: any) => {
    const payload = {
      ...data,
      cdnEnabled,
      dnsEnabled,
      defenceEnabled,
      ...e,
      dnsConfig: { domainQuota: parseInt(e.dnsConfig) || 0 },
      type: "customer",
      dataAllowance: parseInt(e.dataAllowance) || 0,
      domainQuota: parseInt(e.domainQuota) || 0,
    };

    const res = await request(customerApi.ModifyCustomer(payload));
    if (res) {
      form.resetFields();
      onClose();
      reload();
    }
    if (res instanceof Object) {
      notification.success({ message: "Edit Success" });
    }
  };
  return (
    <Drawer
      title="新增客户"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
      closable={false}
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
        <Form.Item
          wrapperCol={{ offset: 2 }}
          style={{ borderTop: "1px dashed #eee", paddingTop: 15 }}
          // name="cdnEnabled"
          label="CDN功能"
          tooltip={{
            title: `CDN和DNS不能同时关闭`,
            icon: warnIcon,
          }}
        >
          <Switch
            checkedChildren="ON"
            unCheckedChildren="OFF"
            checked={cdnEnabled}
            onChange={setCdnEnabled}
          />
        </Form.Item>
        {cdnEnabled && (
          <>
            <Form.Item wrapperCol={{ offset: 2 }} label="用户类型">
              {data && data.supportsSupplier ? "企业版" : "个人版"}
            </Form.Item>
            <Form.Item {...formItemLayout} name="domainQuota" label="域名额度">
              <Input type="number" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2 }} label="防御">
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
                checked={defenceEnabled}
                onChange={setDefenceEnabled}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 8 }}
              name="defenceQuota"
              label="防御额度"
              initialValue="20"
            >
              <Select>
                {defenceQuota &&
                  defenceQuota.map((i) => (
                    <Option key={i.value} value={`${i.value}`}>
                      {i.value} GB
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            {true ? (
              <Tip>请在分配平台设套餐流量</Tip>
            ) : (
              <Form.Item
                {...formItemLayout}
                name="dataAllowance"
                label="套餐流量（GB）"
              >
                <Input type="number" />
              </Form.Item>
            )}
          </>
        )}
        <Form.Item
          wrapperCol={{ offset: 2 }}
          // name="dnsEnabled"
          style={{ borderTop: "1px dashed #eee", paddingTop: 15 }}
          label="域名解析"
          tooltip={{
            title: `CDN和DNS不能同时关闭`,
            icon: warnIcon,
          }}
        >
          <Switch
            checkedChildren="ON"
            unCheckedChildren="OFF"
            checked={dnsEnabled}
            onChange={setDnsEnabled}
          />
        </Form.Item>
        {dnsEnabled && (
          <Form.Item {...formItemLayout} name="dnsConfig" label="域名额度">
            <Input type="number" />
          </Form.Item>
        )}
        <Form.Item
          {...formItemLayout}
          name="serviceDomain"
          style={{ borderTop: "1px dashed #eee", paddingTop: 15 }}
          label="服务域名"
          initialValue={serviceDomain[0] && serviceDomain[0].name}
        >
          <Select>
            {serviceDomain.map((i) => (
              <Option key={i.uid} value={i.name}>
                {i.name}
              </Option>
            ))}
          </Select>
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

export default EditDrawer;

import { Btn } from "@/components/button";
import { warnIcon } from "@/components/icon";
import Tip from "@/components/tip";
import { customerApi } from "@/store/api";
import { useDefenceQuota, useServiceDomain } from "@/store/network/customer";
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
} from "antd";
import { FC, useEffect, useState } from "react";
import { from } from "rxjs";

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
  const [form] = Form.useForm();
  const defenceQuota = useDefenceQuota();
  const serviceDomain = useServiceDomain();
  const [cdnEnabled, setCdnEnabled] = useState<boolean>(false);
  const [dnsEnabled, setDnsEnabled] = useState<boolean>(true);
  const [defenceEnabled, setDefenceEnabled] = useState<boolean>(true);
  const [supSupplier, setSupsSupplier] = useState<boolean>(false);
  useEffect(() => {
    !defenceQuota && customerService.findDefenceQuota();
  }, []);
  useEffect(() => {
    !serviceDomain && customerService.findServiceDomain();
  }, []);
  useEffect(() => {
    if (!cdnEnabled && !dnsEnabled) {
      notification.warn({ message: "CDN和DNS不能同时关闭" });
      setDnsEnabled(true);
    }
  }, [cdnEnabled, dnsEnabled]);
  const onFinish = (e: any) => {
    const payload = {
      cdnEnabled,
      dnsEnabled,
      defenceEnabled,
      ...e,
      dnsConfig: { domainQuota: parseInt(e.dnsConfig) || 0 },
      type: "customer",
      dataAllowance: parseInt(e.dataAllowance) || 0,
      domainQuota: parseInt(e.domainQuota) || 0,
    };
    from(request(customerApi.CreateCustomer(payload))).subscribe((data) => {
      if (data) {
        form.resetFields();
        onClose();
        reload();
        // notification.success({ message: "success" });
      }
    });
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
          {...formItemLayout}
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "密码不能为空!",
            },
          ]}
        >
          <Input placeholder="请输入你的密码" />
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
            <Form.Item
              {...formItemLayout}
              name="supportsSupplier"
              label="用户类型"
              initialValue={supSupplier}
            >
              <Select onChange={setSupsSupplier}>
                <Option value={false}>个人版</Option>
                <Option value={true}>企业版</Option>
              </Select>
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
            {supSupplier ? (
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
        <Form.Item {...formItemLayout} name="dnsConfig" label="域名额度">
          <Input type="number" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="serviceDomain"
          style={{ borderTop: "1px dashed #eee", paddingTop: 15 }}
          label="服务域名"
          initialValue={serviceDomain && serviceDomain[0].name}
        >
          <Select>
            {serviceDomain &&
              serviceDomain.map((i) => (
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

export default CreateDrawer;

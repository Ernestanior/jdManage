import IconFont from "@/components/icon";
import Loading from "@/components/loading/context";
import Tip from "@/components/tip";
import { supplierApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, Form, Input, notification, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useEffect, useMemo, useState } from "react";
interface IProps {
  visible: boolean;
  onClose: () => void;
  onRefresh: () => void;
  currData: any;
  loading: boolean;
}

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const EditDrawer: FC<IProps> = ({
  visible,
  onClose,
  onRefresh,
  currData,
  loading,
}) => {
  const [form] = Form.useForm();
  const [tokenValue, setTokenValue] = useState<any>();
  const [valid, setValid] = useState<number>(1);
  const [hasValidate, setHasValidate] = useState<boolean>(false);

  const option = useMemo(() => currData && currData.supplier, [currData]);

  useEffect(() => {
    if (tokenValue) {
      setHasValidate(false);
      setValid(-1);
    }
  }, [tokenValue]);

  useEffect(() => {
    if (currData) {
      const { name, supplier, remark, quota } = currData;
      form.setFieldsValue({ name, remark });
      if (supplier) {
        const { code, tokenValue } = supplier;
        form.setFieldsValue({ code, tokenValue: { ...tokenValue } });
      }
      if (quota) {
        form.setFieldsValue({ capacity: quota.domain.capacity });
      }
      return () => {
        form.resetFields();
        setHasValidate(false);
        setValid(1);
      };
    }
  }, [currData]);
  const onFinish = async (data: any) => {
    let payload: any;
    const { name, remark, code, capacity, tokenValue } = data;
    //判断是否需要验证
    if (valid < 1) {
      payload = { supplier: { code, tokenValue } };
      console.log(payload);
      verify(payload);
    } else {
      payload = {
        name,
        remark,
        status: "enabled",
        supplier: { code, tokenValue },
        uid: currData.uid,
      };
      if (capacity) {
        payload = { ...payload, quota: { domain: { capacity } } };
      }

      const res = await request(supplierApi.UpdateAccount(payload), true);
      if (res.response === "success") {
        notification.success({ message: "Update Success" });
        onClose();
        onRefresh();
      }
    }
  };
  const verify = async (payload: any) => {
    const res = await request(
      supplierApi.SupplierAccountValidate(payload),
      true
    );
    setHasValidate(true);
    if (res.response === "success") {
      notification.success({ message: "Verify Success" });
      setValid(1);
    } else {
      setValid(0);
    }
  };

  return (
    <Drawer
      title="修改账号"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={540}
      closable={false}
      getContainer={false}
    >
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{ capacity: 1 }}
        form={form}
      >
        <Form.Item
          label="平台配置名称"
          name="name"
          rules={[
            {
              required: true,
              message: "名称不能为空!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {option && (
          <>
            <Form.Item label="平台选择" name="code" {...formItemLayout}>
              <Select>
                <Option value={option.code} key={option.code}>
                  {option.displayName}
                </Option>
              </Select>
            </Form.Item>
            {option.supportsMultiAccount && (
              <Form.Item label="总域名额度" name="capacity" {...formItemLayout}>
                <Input type="number" />
              </Form.Item>
            )}
            {option.description && <Tip hideTitle>{option.description}</Tip>}
            {option.tokenFields.map((item: any) => (
              <Form.Item
                label={item.displayName}
                name={["tokenValue", item.name]}
                key={item.name}
                {...formItemLayout}
              >
                <Input
                  onChange={(e) =>
                    setTokenValue({
                      ...tokenValue,
                      [e.target.id]: e.target.value,
                    })
                  }
                  required
                />
              </Form.Item>
            ))}
          </>
        )}
        <Form.Item name="remark" label="备注">
          <TextArea />
        </Form.Item>

        {valid < 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" htmlType="submit">
              验证账户
            </Button>
          </div>
        )}
        {hasValidate && (
          <Form.Item>
            <div style={{ display: "flex", alignItems: "center" }}>
              {valid ? (
                <>
                  <IconFont type="icon-check-green"></IconFont>
                  <span style={{ marginLeft: "5px" }}>账号凭证验证已通过</span>
                </>
              ) : (
                <>
                  <IconFont type="icon-fail"></IconFont>
                  <span style={{ marginLeft: "5px" }}>账号凭证验证未通过</span>
                </>
              )}
            </div>
          </Form.Item>
        )}
        <section
          style={{
            width: "150px",
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-between",
          }}
        >
          <Button type="primary" htmlType="submit" disabled={valid < 1}>
            确认
          </Button>
          <Button type="primary" onClick={onClose}>
            取消
          </Button>
        </section>
      </Form>
      <Loading display={loading}></Loading>
    </Drawer>
  );
};

export default EditDrawer;

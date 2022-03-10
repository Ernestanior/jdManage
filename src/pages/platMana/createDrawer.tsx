import IconFont from "@/components/icon";
import Loading from "@/components/loading/context";
import Tip from "@/components/tip";
import { supplierApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, Form, Input, notification, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useEffect, useState } from "react";
import { ISupplierInfo } from "./content";
interface IProps {
  visible: boolean;
  onClose: () => void;
  onRefresh: () => void;
  supplier: ISupplierInfo[];
  loading: boolean;
}

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const CreateDrawer: FC<IProps> = ({
  visible,
  onClose,
  onRefresh,
  supplier,
  loading,
}) => {
  const [tokenValue, setTokenValue] = useState<any>();
  const [valid, setValid] = useState<number>(-1);
  const [option, setOption] = useState<ISupplierInfo>();

  useEffect(() => setTokenValue({}), [option]);
  useEffect(() => setValid(-1), [tokenValue, option]);

  const onFinish = async (data: any) => {
    const { name, remark, code, capacity } = data;
    const payload = {
      name,
      remark,
      status: "enabled",
      quota: { domain: { capacity: capacity || 0 } },
      supplier: { code, tokenValue },
    };
    const res = await request(supplierApi.CreateAccount(payload), true);
    if (res.response === "success") {
      notification.success({ message: "Create Success" });
      onClose();
      onRefresh();
    }
  };
  const verify = async () => {
    if (option) {
      const payload = { supplier: { code: option.code, tokenValue } };
      const res = await request(
        supplierApi.SupplierAccountValidate(payload),
        true
      );
      if (res.response === "success") {
        notification.success({ message: "Verify Success" });
        setValid(1);
      } else {
        setValid(0);
      }
    }
  };
  return (
    <Drawer
      title="新增账号"
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
        <Form.Item label="平台选择" name="code">
          <Select
            onChange={(e) => {
              setOption(supplier.find((i) => i.code === e));
            }}
          >
            {supplier.map((i) => (
              <Option value={i.code} key={i.code}>
                {i.displayName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {option?.supportsMultiAccount && (
          <Form.Item label="总域名额度" name="capacity">
            <Input type="number" />
          </Form.Item>
        )}
        {option?.description && <Tip hideTitle>{option.description}</Tip>}
        {option?.tokenFields.map((item) => (
          <Form.Item label={item.displayName} name={item.name} key={item.name}>
            <Input
              onChange={(e) =>
                setTokenValue({ ...tokenValue, [e.target.id]: e.target.value })
              }
              required
            />
          </Form.Item>
        ))}
        <Form.Item name="remark" label="备注">
          <TextArea />
        </Form.Item>

        {option && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={verify}>
              验证账户
            </Button>
          </div>
        )}
        {valid !== -1 && (
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

export default CreateDrawer;

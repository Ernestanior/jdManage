import { sslManageApi } from "@/store/api";
import customerService from "@/store/network/customer/service";
import { RequestOriginalCert } from "@/store/api/sslManage";
import request from "@/store/request";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  notification,
  Radio,
  Select,
  Space,
} from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { FC, useCallback, useEffect, useState } from "react";
import { from } from "rxjs";

interface IProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  loading: boolean;
}
interface IOption {
  key: string;
  displayName: string;
}
const { Option } = Select;

const validity: number[] = [];
for (let i = 0; i < 15; i++) {
  validity.push(i + 1);
}
const CreateDrawer: FC<IProps> = ({ visible, onClose, reload, loading }) => {
  const [form] = Form.useForm();
  const [optionList, setOptionList] = useState<IOption[]>();
  const [priKeyType, setPriKeyType] = useState<string>();
  const [radio, setRadio] = useState<number>(1);
  const [fileData, setFileData] = useState<string>("");
  const [domain, setDomain] = useState<string[]>([]);
  const [applyWildcard, setApplyWildcard] = useState<boolean>(false);

  useEffect(() => {
    from(request(sslManageApi.originCertOption())).subscribe((data) => {
      data && setOptionList(data.privateKeyTypes);
      data.privateKeyTypes && setPriKeyType(data.privateKeyTypes[0].key);
    });
  }, []);

  const dragConfig = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setFileData(e.target.result);
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    },
    onRemove(e: any) {
      console.log(e);
    },
  };

  const onSubmit = useCallback(
    async (e: any) => {
      const usesOwnPrivateKey = radio === 2;
      const domains = applyWildcard
        ? [...e.domains, ...e.domains.map((item: string) => `*.${item}`)]
        : [...e.domains];
      const payload: RequestOriginalCert = usesOwnPrivateKey
        ? {
            domains: domains,
            validity: e.validity * 365,
            usesOwnPrivateKey,
            privateKey: fileData,
          }
        : {
            domains: domains,
            validity: e.validity * 365,
            usesOwnPrivateKey,
            privateKeyType: priKeyType,
          };
      const res = await request(sslManageApi.requestOriginalCert(payload));
      if (res.uid) {
        notification.success({ message: "Apply Success" });
        reload();
        onClose();
      }
    },
    [applyWildcard, radio, priKeyType, fileData]
  );

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
      <Form
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Radio.Group
          name="radiogroup"
          value={radio}
          onChange={(e) => setRadio(e.target.value)}
        >
          <Space direction="vertical">
            <Radio value={1}>使用Edgejoint生成私钥</Radio>
            {radio === 1 && (
              <>
                <Select
                  style={{ width: 450 }}
                  onChange={setPriKeyType}
                  value={priKeyType}
                >
                  {optionList &&
                    optionList.map((item) => (
                      <Option value={item.key} key={item.key}>
                        {item.displayName}
                      </Option>
                    ))}
                </Select>
              </>
            )}
            <Radio value={2}>使用自己的私钥</Radio>
            {radio === 2 && (
              <>
                <Dragger {...dragConfig}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Dragger>
              </>
            )}
          </Space>
        </Radio.Group>

        <Form.Item
          label="选择域名（单次只能选择同一顶级域名下的记录）"
          name="domains"
          style={{ marginTop: 20, marginBottom: 5 }}
        >
          <Select mode="tags" onChange={setDomain}></Select>
        </Form.Item>

        <Checkbox
          checked={applyWildcard}
          onChange={(e) => setApplyWildcard(e.target.checked)}
        >
          <div> 是否申请通配符证书</div>
        </Checkbox>
        {domain.length >= 1 && (
          <div style={{ marginTop: 20 }}>
            即将为
            {domain.map((item, key) => {
              return (
                <div key={key}>
                  <b>{item}</b>
                </div>
              );
            })}
            {applyWildcard
              ? domain.map((item, key) => {
                  return (
                    <div key={key}>
                      <b>*.{item}</b>
                    </div>
                  );
                })
              : ""}
            <div>域名申请证书</div>
          </div>
        )}

        <Form.Item
          name="validity"
          label="请选择证书有效期"
          style={{ marginTop: 15, marginBottom: 5 }}
        >
          <Select>
            {validity.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div>默认证书有效期为15年,可选择您的证书有效期</div>

        <section
          style={{
            width: "150px",
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-between",
          }}
        >
          <Button htmlType="submit" type="primary">
            确认
          </Button>
          <Button onClick={onClose}>取消</Button>
        </section>
      </Form>
    </Drawer>
  );
};

export default CreateDrawer;

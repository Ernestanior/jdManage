// import "./index.less";
import { FC, useState } from "react";
import { Form, Drawer, Input, Select, Switch } from "antd";
import Tip from "@/components/tip";
import { FormattedMessage } from "react-intl";
import IconFont, { tipIcon } from "@/components/icon";
import { ICustomerList } from "@/store/network/customer/interface";
import { Btn } from "@/components/button";
import CheckboxGroup from "@/components/checkboxGroup";
interface IProps {
  title: string;
  visible: boolean;
  customerList: ICustomerList | null;
  onClose: () => void;
}
enum Status {
  故障 = "故障",
  正常 = "正常",
}

const optionList = [
  "GreyPanel",
  "阿里云(全球加速)",
  "阿里云(国内加速)",
  "网速(国内加速)",
  "华为云(全球加速)",
  "腾讯云(全球加速)",
  "华为云(国内加速)",
  "Incapsula",
  "测试NIGNCX",
  "Amazon Cloudfront",
];

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const { Option } = Select;

const CreateDrawer: FC<IProps> = ({
  title,
  visible,
  customerList,
  onClose,
}) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const onFinish = (value: any) => {
    console.log({ ...value, ips: checkedList });
  };

  return (
    <Drawer
      title="新增站点"
      width={520}
      // onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      <Tip>
        123
        {/* <div className="note">
          <FormattedMessage id="Note" />
        </div>
        <div>
          <FormattedMessage id="addSiteNote" />
        </div>
        <ol className="note-list">
          <li className="note-list-item">
            <FormattedMessage id="addSiteList1" />
          </li>
          <li className="note-list-item">
            <FormattedMessage id="addSiteList2" />
          </li>
          <li className="note-list-item">
            <FormattedMessage id="addSiteList3" />
          </li>
        </ol> */}
      </Tip>
      <Form
        onFinish={onFinish}
        initialValues={{ protocol: "HTTPS", websocket: false }}
        requiredMark={false}
      >
        <Form.Item
          {...formItemLayout}
          name="sitename"
          label="站点名称"
          rules={[
            {
              required: true,
              message: "站点名称不能为空!",
            },
          ]}
          tooltip={{
            title: "可自定义站点名称",
            icon: tipIcon,
          }}
        >
          <Input placeholder="请输入IP或IP网段，如123.123.123.123" />
        </Form.Item>
        <h3>源点设置</h3>
        <Form.List name="ips">
          {(fields, { add, remove }) => (
            <>
              <Form.Item
                tooltip={{
                  title:
                    "源点地址可以填写源点CNAME或IPV4地址, 如需多源点配置, 请点击右侧添加按钮进行添加",
                  icon: tipIcon,
                }}
                label="源点地址"
                style={{
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "-10px",
                  }}
                >
                  <Btn type="primary" onClick={() => add()}>
                    添加
                  </Btn>
                </div>
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入",
                  },
                ]}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
              {fields.map((field, index) => (
                <Form.Item required={true} key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入或者删除该输入框",
                      },
                    ]}
                    noStyle
                  >
                    <Input style={{ width: "80%" }} />
                  </Form.Item>
                  <IconFont
                    onClick={() => remove(field.name)}
                    style={{
                      color: "#ef8f35",
                      fontSize: "20px",
                      marginLeft: "5px",
                    }}
                    type="icon-trash"
                  />
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item
          {...formItemLayout}
          name="protocol"
          label="回源方式"
          tooltip={{
            title: `回源方式仅支持系统默认HTTP回源端口为：80,    
              HTTPS回源端口为：443`,
            icon: tipIcon,
          }}
        >
          <Select>
            <Option value="HTTP">HTTP</Option>
            <Option value="HTTPS">HTTPS</Option>
          </Select>
        </Form.Item>
        <Form.Item name="websocket" label="Websocket" valuePropName="checked">
          <Switch
            checkedChildren="ON"
            unCheckedChildren="OFF"
            defaultChecked={false}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} name="customer" label="选择客户">
          <Select>
            {customerList &&
              customerList.content.map((item) => (
                <Option value={item.name} key={item.name}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <CheckboxGroup
          optionList={optionList}
          showCheckAll={true}
          checkedOptions={(list: any) => setCheckedList(list)}
        ></CheckboxGroup>
        <Form.Item labelCol={{ span: 24 }} name="note" label="备注">
          <Input.TextArea />
        </Form.Item>
        <div
          style={{
            width: "150px",
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-between",
          }}
        >
          <Btn type="primary" htmlType="submit" boxShadow>
            确定
          </Btn>
          <Btn htmlType="reset" boxShadow onClick={() => onClose()}>
            取消
          </Btn>
        </div>
      </Form>
    </Drawer>
  );
};
export default CreateDrawer;

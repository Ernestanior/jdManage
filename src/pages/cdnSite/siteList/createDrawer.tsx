// import "./index.less";
import { FC, useState } from "react";
import { Form, Drawer, Input, Select, Switch, notification } from "antd";
import Tip from "@/components/tip";
// import { FormattedMessage } from "react-intl";
import IconFont, { tipIcon } from "@/components/icon";
import { Btn } from "@/components/button";
import CheckboxGroup from "@/components/checkboxGroup";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import request from "@/store/request";
import { siteApi, supplierApi } from "@/store/api";
interface IProps {
  title: string;
  visible: boolean;
  cusList: any[];
  onClose: () => void;
}

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const { Option } = Select;

const CreateDrawer: FC<IProps> = ({ title, visible, cusList, onClose }) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  //  const [cusId,setCusId] = useState<string>('')
  const [supplierList, setSupplierList] = useState<string[]>([]);
  const onFinish = async (value: any) => {
    const submitData = {
      ...value,
      sourceIps: value.sourceIps.join(" "),
      siteSuppliers: checkedList.map((item) => JSON.parse(item)),
    };

    const res = await request(siteApi.CreateSite(submitData));
    if (res && JSON.stringify(res) !== "{}") {
      notification.success({
        message: "Create Success",
      });
      onClose();
    }
  };
  // const supplierList = useSupplierList();
  // const optionList = useMemo(
  //   () =>{

  //   },
  //     // (supplierList &&
  //       // supplierList.map((item: any) =>
  //       //   JSON.stringify({
  //       //     uid: item.customerSupplier.uid,
  //       //     name: item.displayName,
  //       //   })
  //       // )) ||
  //     // [],
  //   [cusId]
  // );
  const onChange = async (cusId: string) => {
    const res = await request(supplierApi.FindSupplier(cusId));
    if (res) {
      const supList = res.map((item: any) =>
        JSON.stringify({
          uid: item.customerSupplier.uid,
          name: item.displayName,
        })
      );
      setSupplierList(supList);
    }
  };

  const loading = useLoading();

  return (
    <Drawer
      title={title}
      width={570}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      <Loading display={loading}></Loading>

      <Tip>
        <p>
          新增站点配置将帮助并指导进行相应的站点基本配置。系统提供多源点下负载，用户可以根据源站点相关设置进行配置。
        </p>
        <p>
          1.
          选择正确配置的源点回源方式，系统默认HTTP回源端口为：80，HTTPS回源端口为443；
        </p>
        <p>
          2. 平台为已购买的平台，如需要其他平台进行负载，请联系销售进行购买；
        </p>
        <p>
          3.
          新增站点配置完成并保存后，请前往DNS管理下菜单的二级菜单：记录管理中进行域名记录指向配置。
        </p>
      </Tip>
      <Form
        onFinish={onFinish}
        initialValues={{
          webSocketEnabled: false,
          remark: "",
          sourceScheme: "HTTP",
        }}
        requiredMark={false}
      >
        <Form.Item
          {...formItemLayout}
          name="name"
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
        <Form.List name="sourceIps" initialValue={[""]}>
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

              {fields.map((field, index) =>
                index === 0 ? (
                  <Form.Item
                    {...field}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入",
                      },
                    ]}
                    key={field.key}
                  >
                    <Input style={{ width: "80%" }} />
                  </Form.Item>
                ) : (
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
                )
              )}
            </>
          )}
        </Form.List>
        <Form.Item
          {...formItemLayout}
          name="sourceScheme"
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
        <Form.Item
          name="webSocketEnabled"
          label="Websocket"
          valuePropName="checked"
        >
          <Switch
            checkedChildren="ON"
            unCheckedChildren="OFF"
            defaultChecked={false}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} name="customerUid" label="选择客户">
          <Select onChange={onChange}>
            {cusList &&
              cusList.map((item) => (
                <Option value={item.uid} key={item.uid}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <CheckboxGroup
          optionList={supplierList}
          showCheckAll={supplierList && supplierList.length >= 2}
          checkedOptions={(list: any) => setCheckedList(list)}
        ></CheckboxGroup>
        <Form.Item labelCol={{ span: 24 }} name="remark" label="备注">
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
          <Btn htmlType="reset" boxShadow onClick={onClose}>
            取消
          </Btn>
        </div>
      </Form>
    </Drawer>
  );
};
export default CreateDrawer;

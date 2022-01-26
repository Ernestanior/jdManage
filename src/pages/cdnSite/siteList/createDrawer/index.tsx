// import "./index.less";
import { FC, useMemo, useState } from "react";
import { Form, Drawer, Input, Select, Switch, notification } from "antd";
import Tip from "@/components/tip";
import { FormattedMessage } from "react-intl";
import IconFont, { tipIcon } from "@/components/icon";
import { ICustomerList } from "@/store/network/customer/interface";
import { Btn } from "@/components/button";
import CheckboxGroup from "@/components/checkboxGroup";
import SupplierService from "@/store/network/supplier/service";
import siteService from "@/store/network/site/service";
import { useSupplierList } from "@/store/network/supplier";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { siteApi } from "@/store/api";
interface IProps {
  title: string;
  visible: boolean;
  cusList: any[];
  onClose: () => void;
}
enum Status {
  故障 = "故障",
  正常 = "正常",
}

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const { Option } = Select;

const CreateDrawer: FC<IProps> = ({ title, visible, cusList, onClose }) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const onFinish = (value: any) => {
    const submitData = {
      ...value,
      sourceIps: value.sourceIps.join(" "),
      siteSuppliers: checkedList.map((item) => JSON.parse(item)),
    };
    // console.log(submitData);

    from(request(siteApi.CreateSite(submitData))).subscribe((data) => {
      if (data && JSON.stringify(data) !== "{}") {
        notification.success({
          message: "Create Success",
        });
        onClose();
      }
    });
  };
  const supplierList = useSupplierList();
  const optionList = useMemo(
    () =>
      (supplierList &&
        supplierList.map((item: any) =>
          JSON.stringify({
            uid: item.customerSupplier.uid,
            name: item.displayName,
          })
        )) ||
      [],
    [supplierList]
  );
  const loading = useLoading();

  return (
    <Drawer
      title={title}
      width={520}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      <Loading display={loading}></Loading>

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
          <Select onChange={(id) => SupplierService.findSupplier(id)}>
            {cusList &&
              cusList.map((item) => (
                <Option value={item.uid} key={item.uid}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <CheckboxGroup
          optionList={optionList}
          showCheckAll={optionList && optionList.length >= 2}
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
          <Btn htmlType="reset" boxShadow onClick={() => onClose()}>
            取消
          </Btn>
        </div>
      </Form>
    </Drawer>
  );
};
export default CreateDrawer;

import { FC } from "react";
import "./index.less";
import Tip from "@/components/tip/index";
import { TipInfo } from "./msg";
import { Form, Input } from "antd";
import { Btn } from "@/components/button/index";
import { from } from "rxjs";
import request from "@/store/request";
import { userApi } from "@/store/api";

interface userPassword {
  userID?: string;
  password?: string;
}

const Index: FC<userPassword> = () => {
  const [form] = Form.useForm();
  const resetPwdFormList = [
    {
      label: "当前密码",
      name: "oldPwd",
    },
    {
      label: "新密码",
      name: "newPwd",
    },
    {
      label: "确认密码",
      name: "confirmPwd",
    },
  ];

  const onFinish = async (values: any) => {
    if (values.oldPwd && values.newPwd && values.comfirmPwd !== null) {
      if (values.newPwd === values.confirmPwd) {
        const res = await request(userApi.UserChangePassword(values), true);
        res && alert("change password success");
      }
      console.log("Comfirm Password and New Password must be same");
    } else console.log("Cannot Be Empty");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="resetPassword-Container">
      <Tip children={TipInfo}></Tip>
      <div className={`ResetPassword-Form`}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 3 }}
          labelAlign="left"
          wrapperCol={{ span: 4 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {resetPwdFormList.map((item, index) => {
            return (
              <Form.Item
                key={index}
                label={item.label}
                name={item.name}
                rules={[{ message: "Please input your password!" }]}
              >
                <Input.Password />
              </Form.Item>
            );
          })}
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Btn type="primary" htmlType="submit">
              应用
            </Btn>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Index;


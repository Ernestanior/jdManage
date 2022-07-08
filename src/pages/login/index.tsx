import { Form, Input, Button } from "antd";
import accountService from "@/store/network/account/service";
import { useLoading } from "@/components/loading";
import md5 from "md5";
import userSvg from "./assets/user.svg";
import lockSvg from "./assets/lock.svg";
import "./index.less";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";

const Login = () => {
  const loading = useLoading();
  const [form] = useForm();
  const onFinish = (values: any) => {
    accountService.login(values.userName, md5(values.pwd));
  };
  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <>
      <Form style={{ height: "100%" }} onFinish={onFinish} form={form}>
        <div className="page-user">
          <div className="login-form">
            <div className="login-form-content">
              <div className="logo">
                <h1>安普希</h1>
              </div>
              <Form.Item
                className="email"
                name="userName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={
                    <img
                      src={userSvg}
                      alt="user"
                      style={{
                        position: "relative",
                        top: 1,
                        left: 14,
                        width: 16,
                        height: 16,
                        marginRight: 30,
                      }}
                    />
                  }
                  placeholder="请输入用户名"
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name="pwd"
                className="pwd"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="请输入密码"
                  prefix={
                    <img
                      src={lockSvg}
                      alt="lock"
                      style={{
                        position: "relative",
                        top: 1,
                        left: 14,
                        width: 18,
                        height: 18,
                        marginRight: 30,
                      }}
                    />
                  }
                />
              </Form.Item>

              {/* <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
              <Button className="login-btn" htmlType="submit" loading={loading}>
                登录
              </Button>
            </div>
          </div>
          <div className="login-picture" />
          <div className="login-cloud"></div>
        </div>
      </Form>
      <div className="login-copyright">
        Copyright &copy; {new Date().getFullYear()} EDGEJOINT. All Rights
        Reserved.
        <div
          className="flex-center"
          style={{
            justifyContent: "center",
          }}
        >
          <a href="." className="link" style={{ marginRight: 30 }}>
            隐私政策
          </a>
          <a href="." className="link">
            条款和条件
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;

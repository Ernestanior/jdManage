import React, { FC, ReactElement } from "react";
import "./index.less";
import { Button, Form, Input } from "antd";
import Msg from "./msg";

const Index: FC = (): ReactElement => {
  const onFinish = (value: any) => {
    console.log(value);
  };
  return (
    <div className="user-pw">
      <div className="user-pw-bg">
        <Msg></Msg>

        <div className="user-pw-container">
          <h2>修改密码</h2>
          <Form onFinish={onFinish}>
            <ul>
              <li>
                <span className="user-pw-label">旧密码</span>
                <Form.Item
                  name="oldpw"
                  rules={[
                    {
                      required: true,
                      message: "Please input your old password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </li>
              <li>
                <span className="user-pw-label">新密码</span>
                <Form.Item
                  name="newpw"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </li>
              <li>
                <span className="user-pw-label">确认密码</span>
                <Form.Item
                  name="confirmpw"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newpw") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </li>
              <li>
                <Button htmlType="submit" className="user-pw-btn">
                  Save
                </Button>
                <Button htmlType="reset" className="user-pw-btn">
                  Reset
                </Button>
              </li>
            </ul>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Index;

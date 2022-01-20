import React, { FC, ReactElement, useState } from "react";
import "./index.less";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;
interface IUser {
  name: string;
  email: string;
  contact: string;
  language: string;
  time: string;
}
const Index: FC = (): ReactElement => {
  // 数据读取并保存
  const [userData, setUserData] = useState<IUser>({
    name: "Ernest",
    email: "ernest_l@greypanel.com",
    contact: "-",
    language: "English",
    time: "2021",
  });
  // 展示模式和修改模式的切换
  const [mode, setMode] = useState<Boolean>(false);
  // 修改内容提交
  const onFinish = (value: any) => {
    console.log(value);
    setUserData({
      name: "Ernest",
      email: value.email,
      contact: value.contact,
      language: value.language,
      time: "2022",
    });
    // 提交后切换成展示模式
    setMode(false);
  };
  return (
    <div className="user-info">
      <div className="user-info-container">
        <h2>更新个人简介</h2>
        {mode ? (
          <Form
            onFinish={onFinish}
            initialValues={{
              contact: userData.contact,
              email: userData.email,
              language: userData.language,
            }}
          >
            <ul>
              <li>
                <span className="user-info-label">用户名称</span>
                {userData.name}
              </li>
              <li>
                <span className="user-info-label">电子邮箱</span>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </li>
              <li className="user-info-label">
                <span className="user-info-label">联系方式</span>
                <Form.Item name="contact">
                  <Input />
                </Form.Item>
              </li>
              <li className="user-info-label">
                <span className="user-info-label">系统语言</span>
                <Form.Item name="language">
                  <Select style={{ width: 150 }}>
                    <Option key="English" value="English">
                      English
                    </Option>
                    <Option key="中文简体" value="中文简体">
                      中文简体
                    </Option>
                    <Option key="中文繁体" value="中文繁体">
                      中文繁体
                    </Option>
                  </Select>
                </Form.Item>
              </li>
              <li>
                <span className="user-info-label">注册时间</span>
                {userData.time}
              </li>
              <li>
                <Button htmlType="submit" className="user-info-btn">
                  Save
                </Button>
                <Button
                  onClick={() => setMode(false)}
                  className="user-info-btn"
                >
                  Cancel
                </Button>
              </li>
            </ul>
          </Form>
        ) : (
          <ul>
            <li>
              <span className="user-info-label">用户名称</span>
              {userData.name}
            </li>
            <li>
              <span className="user-info-label">电子邮箱</span>
              {userData.email}
            </li>
            <li>
              <span className="user-info-label">联系方式</span>
              {userData.contact}
            </li>
            <li>
              <span className="user-info-label">系统语言</span>
              {userData.language}
            </li>
            <li>
              <span className="user-info-label">注册时间</span>
              {userData.time}
            </li>
            <li>
              <Button onClick={() => setMode(true)} className="user-info-btn">
                Modify
              </Button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Index;

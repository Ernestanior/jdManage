//New UI
import React, { FC, useEffect, useState } from "react";
import { Btn } from "@/components/button/index";
import { Form, Input, Select } from "antd";
import "./index.less";
import { Col, Row } from "antd";
import { useNewUserInfo } from "@/store/network/user";
import userService from "@/store/network/user/service";
import moment from "moment";
const { Option } = Select;

interface UserInfoInterFace {
  label?: string;
  name?: string;
  fieldType?: string;
}
const UserInfoForm = [
  {
    label: "登入邮箱",
    name: "email",
    fieldType: "Input",
    type: "email",
  },
  {
    label: "用户名称",
    name: "name",
    fieldType: "Input",
    type: "string",
  },
  {
    label: "联系电话",
    name: "mobile",
    fieldType: "Input",
    type: "number",
  },
  {
    label: "系统语言",
    name: "lang",
    fieldType: "Select",
    type: "string",
  },
  {
    label: "注册时间",
    name: "regTime",
    fieldType: "Date",
  },
];

export const Index: FC<UserInfoInterFace> = () => {
  useEffect(() => userService?.UserInfo(), []); //调接口
  const rawInfo = useNewUserInfo(); // 订阅流
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(rawInfo);
    console.log(rawInfo);
  }, [form, rawInfo]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    console.log(rawInfo?.lang, values.lang);

    userService.UserChangeLanguage(rawInfo?.lang, values.lang);
    setOnSetting(!onSetting);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [onSetting, setOnSetting] = useState<boolean>(false);
  return (
    <div className="userInfo-Container">
      <Form
        layout="horizontal"
        form={form}
        initialValues={rawInfo}
        name="userInfo"
        preserve={true}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 5 }}
      >
        {UserInfoForm.map((item, index) => {
          return (
            <Form.Item label={item.label} name={item.name} key={index}>
              {item.fieldType === "Select" ? (
                <Select
                  showArrow={onSetting}
                  style={
                    !onSetting
                      ? {
                          cursor: "default",
                          pointerEvents: "none",
                          touchAction: "none",
                        }
                      : { cursor: "pointer" }
                  }
                  className={`form`}
                  //disabled={!onSetting ? true : false}
                  bordered={onSetting}
                >
                  <Option value="en_US" key={"en_US"}>English</Option>
                  <Option value="zh_TW" key={"zh_TW"}>繁體中文</Option>
                  <Option value="zh_CN" key={"zh_CN"}>简体中文</Option>
                </Select>
              ) : item.fieldType === "Date" ? (
                <div style={{ paddingLeft: 10 }} className={`form`}>
                  {!rawInfo
                    ? ""
                    : moment(rawInfo?.regTime).format(`YYYY/MM/DD h:mm:ss`)}
                </div>
              ) : (
                <Input
                  style={onSetting ? { cursor: "text" } : { cursor: "default" }}
                  className={`form`}
                  readOnly={!onSetting}
                  bordered={onSetting}
                />
              )}
            </Form.Item>
          );
        })}

        <Form.Item style={{ paddingLeft: 20 }}>
          <Row>
            <Col>
              <Btn type="default" onClick={() => setOnSetting(!onSetting)}>{`${
                onSetting ? "取消" : "编辑"
              }`}</Btn>
            </Col>
            <Col offset={2} style={onSetting ? {} : { display: "none" }}>
              <Btn type="primary" htmlType="submit">
                确定
              </Btn>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;

//New UI
import React, { FC, useMemo, useState } from "react";
import { Btn } from "@/components/button/index";
import { Form, Input, Select, Spin } from "antd";
import "./index.less";
import { Col, Row } from "antd";
import moment from "moment";
import { userApi } from "@/store/api";
import request from "@/store/request";
import { LoadingOutlined } from '@ant-design/icons';
const { Option } = Select;

interface UserInfoInterFace {
  label?: string;
  name?: string;
  fieldType?: string;
  readonly?: boolean;
  style?: any;
}

export const Index: FC<UserInfoInterFace> = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<any>();
  const [onSetting, setOnSetting] = useState<boolean>(false);

  const UserInfoForm = [
    {
      label: "用户名称",
      name: "name",
      fieldType: "Input",
      type: "string",
      readonly: true,
      style: { cursor: "default" },
    },
    {
      label: "登入邮箱",
      name: "email",
      fieldType: "Input",
      type: "email",
      readonly: !onSetting,
      style: !onSetting ? { cursor: "default" } : { cursor: "text" },
    },
    {
      label: "联系电话",
      name: "mobile",
      fieldType: "Input",
      type: "number",
      readonly: !onSetting,
      style: !onSetting ? { cursor: "default" } : { cursor: "text" },
    },
    {
      label: "系统语言",
      name: "lang",
      fieldType: "Select",
      type: "string",
      style: { cursor: "default" },
    },
    {
      label: "注册时间",
      name: "regTime",
      fieldType: "Date",
      readonly: true,
      style: { cursor: "default" },
    },
  ];

  useMemo(async () => {
    const info = await request(userApi.UserInfo());
    const newInfo = {
      ...info,
      regTime: moment(info.regTime).format("YYYY-MM-DD h:mm:ss"),
    };
    setUserInfo(newInfo);
    form.setFieldsValue(newInfo);
  }, [form]);

  const onFinish = async ({email, mobile, lang}:any) => {
    console.log(email);
    console.log(userInfo);

    if (
      userInfo?.email !== email ||
      userInfo?.mobile !== mobile
    ) {
      const res = await request(userApi.UserAccountModify({email, mobile}), true);
      console.log(res);
   
    }

    if (userInfo?.lang !== lang) {
      const res = await request(userApi.UserChangeLanguage(lang));
      console.log(res);
    }

    setOnSetting(!onSetting);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="userInfo-Container">
      <Form
        layout="horizontal"
        form={form}
        initialValues={undefined}
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
                  <Option value="en_US" key={"en_US"}>
                    English
                  </Option>
                  <Option value="zh_TW" key={"zh_TW"}>
                    繁體中文
                  </Option>
                  <Option value="zh_CN" key={"zh_CN"}>
                    简体中文
                  </Option>
                </Select>
              ) : item.fieldType === "Date" ? (
                <Input
                  style={item.style}
                  className={`form`}
                  bordered={onSetting}
                  readOnly={item.readonly}
                ></Input>
              ) : (
                <Input
                  style={item.style}
                  className={`form`}
                  readOnly={item.readonly}
                  bordered={onSetting}
                />
              )}
            </Form.Item>
          );
        })}

        <Form.Item style={{ paddingLeft: 20 }}>
          <Row>
            <Col>
              <Btn
                type="default"
                onClick={userInfo ? () => setOnSetting(!onSetting) : () => {}}
              >
                {userInfo ? `${onSetting ? "取消" : "编辑"}` : <LoadingOutlined spin/>}
              </Btn>
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

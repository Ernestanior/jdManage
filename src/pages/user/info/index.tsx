//New UI
import React, { FC, useEffect, useMemo, useState } from "react";
import { Btn } from "@/components/button/index";
import { Button, Form, Input, notification, Select, Spin } from "antd";
import "./index.less";
import { Col, Row } from "antd";
import moment from "moment";
import { userApi } from "@/store/api";
import request from "@/store/request";
import { LoadingOutlined } from "@ant-design/icons";
import { useLoading } from "@/components/loading";
import Loading from "@/components/loading/context";
import { from } from "rxjs";
const { Option } = Select;

interface UserInfoInterFace {
  label?: string;
  name?: string;
  fieldType?: string;
  readonly?: boolean;
  style?: any;
}

export const Index: FC<UserInfoInterFace> = () => {
  const [loading, setLoading] = useState<boolean>(false);
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

  useEffect(() => {
    setLoading(true);
    const obs = from(request(userApi.UserInfo())).subscribe((data) => {
      const newInfo = {
        ...data,
        regTime: moment(data.regTime).format("YYYY-MM-DD h:mm:ss"),
      };
      setLoading(false);

      setUserInfo(newInfo);
      form.setFieldsValue(newInfo);
    });
    return () => obs.unsubscribe();
  }, [form]);

  const onFinish = async ({ email, mobile, lang }: any) => {
    setLoading(true);
    if (userInfo?.email !== email || userInfo?.mobile !== mobile) {
      const res = await request(
        userApi.UserAccountModify({ email, mobile }),
        true
      );
      res.response === "success" &&
        notification.success({ message: "Update Success" });
    }

    if (userInfo?.lang !== lang) {
      const res = await request(userApi.UserChangeLanguage(lang));
      res.response === "success" &&
        notification.success({ message: "Change Language Success" });
    }
    setLoading(false);
    setOnSetting(!onSetting);
  };

  return (
    <div className="userInfo-Container">
      <Loading display={loading}></Loading>
      <Form
        form={form}
        initialValues={undefined}
        name="userInfo"
        preserve={true}
        onFinish={onFinish}
        labelCol={{ span: 2 }}
        wrapperCol={{ offset: 1, span: 7 }}
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

        <div
          style={{
            width: "150px",
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-between",
          }}
        >
          <Button type="default" onClick={() => setOnSetting(!onSetting)}>
            {onSetting ? "取消" : "编辑"}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={onSetting ? {} : { display: "none" }}
            loading={loading}
          >
            确定
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Index;

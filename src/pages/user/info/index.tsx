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
  useEffect(() => userService.UserInfo(), []); //调接口
  const rawInfo = useNewUserInfo(); // 订阅流
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(rawInfo);
    console.log(rawInfo);
  }, [form, rawInfo]);

  // useEffect(() => {
  //   newUserInfoStream.subscribe((res) => {
  //     console.log(res, 'res')
  //     setInfo(res)
  //   })
  // }, [])

  const onFinish = (values: any) => {
    console.log("Success:", values);
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
        //   onFinish={}
        //   onFinishFailed={}
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
                  <Option value="en_US">English</Option>
                  <Option value="zh_TW">繁體中文</Option>
                  <Option value="zh_CN">简体中文</Option>
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
//OLD VERSION 旧版本
// import React, { FC, ReactElement, useState } from "react";
// import "./index.less";
// import { Button, Form, Input, Select } from "antd";

// const { Option } = Select;
// interface IUser {
//   name: string;
//   email: string;
//   contact: string;
//   language: string;
//   time: string;
// }

// const Index: FC = (): ReactElement => {
//   // 数据读取并保存
//   const [userData, setUserData] = useState<IUser>({
//     name: "Ernest",
//     email: "ernest_l@greypanel.com",
//     contact: "-",
//     language: "English",
//     time: "2021",
//   });
//   // 展示模式和修改模式的切换
//   const [mode, setMode] = useState<Boolean>(false);
//   // 修改内容提交
//   const onFinish = (value: any) => {
//     console.log(value);
//     setUserData({
//       name: "Ernest",
//       email: value.email,
//       contact: value.contact,
//       language: value.language,
//       time: "2022",
//     });
//     // 提交后切换成展示模式
//     setMode(false);
//   };
//   return (
//     <div className="user-info">
//       <div className="user-info-container">
//         <h2>更新个人简介</h2>
//         {mode ? (
//           <Form
//             onFinish={onFinish}
//             initialValues={{
//               contact: userData.contact,
//               email: userData.email,
//               language: userData.language,
//             }}
//           >
//             <ul>
//               <li>
//                 <span className="user-info-label">用户名称</span>
//                 {userData.name}
//               </li>
//               <li>
//                 <span className="user-info-label">电子邮箱</span>
//                 <Form.Item
//                   name="email"
//                   rules={[
//                     { required: true, message: "Please input your email!" },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               </li>
//               <li className="user-info-label">
//                 <span className="user-info-label">联系方式</span>
//                 <Form.Item name="contact">
//                   <Input />
//                 </Form.Item>
//               </li>
//               <li className="user-info-label">
//                 <span className="user-info-label">系统语言</span>
//                 <Form.Item name="language">
//                   <Select style={{ width: 150 }}>
//                     <Option key="English" value="English">
//                       English
//                     </Option>
//                     <Option key="中文简体" value="中文简体">
//                       中文简体
//                     </Option>
//                     <Option key="中文繁体" value="中文繁体">
//                       中文繁体
//                     </Option>
//                   </Select>
//                 </Form.Item>
//               </li>
//               <li>
//                 <span className="user-info-label">注册时间</span>
//                 {userData.time}
//               </li>
//               <li>
//                 <Button htmlfieldType="submit" className="user-info-btn">
//                   Save
//                 </Button>
//                 <Button
//                   onClick={() => setMode(false)}
//                   className="user-info-btn"
//                 >
//                   Cancel
//                 </Button>
//               </li>
//             </ul>
//           </Form>
//         ) : (
//           <ul>
//             <li>
//               <span className="user-info-label">用户名称</span>
//               {userData.name}
//             </li>
//             <li>
//               <span className="user-info-label">电子邮箱</span>
//               {userData.email}
//             </li>
//             <li>
//               <span className="user-info-label">联系方式</span>
//               {userData.contact}
//             </li>
//             <li>
//               <span className="user-info-label">系统语言</span>
//               {userData.language}
//             </li>
//             <li>
//               <span className="user-info-label">注册时间</span>
//               {userData.time}
//             </li>
//             <li>
//               <Button onClick={() => setMode(true)} className="user-info-btn">
//                 Modify
//               </Button>
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>

//   );
// };

// export default Index;

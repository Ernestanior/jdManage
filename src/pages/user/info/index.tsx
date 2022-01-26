//New UI
import React, { FC, useEffect, useState } from "react";
import { Btn } from "@/components/button/index";
import { Button, Form, Input, Table } from "antd";
import "./index.less";
import { Col, Row } from "antd";
import request from "@/store/request";
import { userApi } from "@/store/api";

interface UserInfoInterFace {
  title?: string;
  detail?: string;
  name?: string;
  type?: string;
  edditable?: boolean;
}

const UserData = [
  {
    title: "登录邮箱",
    detail: "eddie@gmail.com",
    name: "email",
    type: "email",
    edditable: true,
  },
  {
    title: "用户名称",
    detail: "eddie",
    name: "username",
    edditable: true,
  },
  {
    title: "联系电话",
    detail: "9991111",
    name: "phoneNo",
    edditable: true,
  },
  {
    title: "系统语言",
    detail: "eddie",
    name: "language",
    edditable: true,
  },
  {
    title: "注册时间",
    detail: "2020",
    name: "date",
    edditable: false,
  },
];
export const Index: FC<UserInfoInterFace> = () => {
  



  
  const [form] = Form.useForm();
  const [userDetail, setUserDetail] = useState<UserInfoInterFace[]>(UserData);
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
        name="userInfo"
        preserve={true}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 5 }}
        //   onFinish={}
        //   onFinishFailed={}
      >
        {userDetail.map((item, index) => {
          return (
           
            
            <Form.Item label={item.title} name={item.name}>
           
              <Input
                type={`${item.type}`}
                defaultValue={item.detail}
                className={`${
                  onSetting ? "" : "formInput-onSetting"
                } formInput`}
                readOnly={!onSetting ? true : !item.edditable}
                bordered={onSetting ? item.edditable : false}
              />
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
//                 <Button htmlType="submit" className="user-info-btn">
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

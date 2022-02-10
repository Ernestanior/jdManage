import React, { FC, useEffect } from "react";
import "./index.less";
import Tip from "@/components/tip/index";
import { TipInfo } from "./msg";
import { Form, Input } from "antd";
import { Btn } from "@/components/button/index";
import userService from "@/store/network/user/service";
import { useNewChangePassword } from "@/store/network/user";

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

  const onFinish = (values: any) => {
    if (values.oldPwd && values.newPwd && values.comfirmPwd !== null) {
      if (values.newPwd === values.confirmPwd) {
        userService.UserChangePassword(values);
      }
      console.log("Comfirm Password and New Password must be same");
    } else console.log("Cannot Be Empty");
  };

  const changepassword = useNewChangePassword();

  useEffect(() => {
    if (changepassword?.response === "success") {
      alert("success");
      form.resetFields();
    }
  }, [changepassword]);

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

//OLD VERSION
// import React, { FC, ReactElement } from "react";
// import "./index.less";
// import { Button, Form, Input } from "antd";
// import Msg from "./msg";

// const Index: FC = (): ReactElement => {
//   const onFinish = (value: any) => {
//     console.log(value);
//   };
//   return (
//     <div className="user-pw">
//       <div className="user-pw-bg">
//         <Msg></Msg>

//         <div className="user-pw-container">
//           <h2>修改密码</h2>
//           <Form onFinish={onFinish}>
//             <ul>
//               <li>
//                 <span className="user-pw-label">旧密码</span>
//                 <Form.Item
//                   name="oldpw"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input your old password!",
//                     },
//                   ]}
//                 >
//                   <Input.Password />
//                 </Form.Item>
//               </li>
//               <li>
//                 <span className="user-pw-label">新密码</span>
//                 <Form.Item
//                   name="newpw"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input your new password!",
//                     },
//                   ]}
//                 >
//                   <Input.Password />
//                 </Form.Item>
//               </li>
//               <li>
//                 <span className="user-pw-label">确认密码</span>
//                 <Form.Item
//                   name="confirmpw"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please confirm your password!",
//                     },
//                     ({ getFieldValue }) => ({
//                       validator(_, value) {
//                         if (!value || getFieldValue("newpw") === value) {
//                           return Promise.resolve();
//                         }
//                         return Promise.reject(
//                           new Error(
//                             "The two passwords that you entered do not match!"
//                           )
//                         );
//                       },
//                     }),
//                   ]}
//                 >
//                   <Input.Password />
//                 </Form.Item>
//               </li>
//               <li>
//                 <Button htmlType="submit" className="user-pw-btn">
//                   Save
//                 </Button>
//                 <Button htmlType="reset" className="user-pw-btn">
//                   Reset
//                 </Button>
//               </li>
//             </ul>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;

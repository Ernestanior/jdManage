import { Btn } from "@/components/button";
import accountService from "@/store/network/account/service";
import userService from "@/store/network/user/service";
import { Drawer } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  visible: boolean;
  onClose: () => void;
  customerUid: string;
}

const LoginDrawer: FC<IProps> = ({ visible, customerUid, onClose }) => {
  const navigator = useNavigate();
  return (
    <Drawer
      title="提示"
      placement="left"
      onClose={onClose}
      visible={visible}
      width={500}
      closable={false}
    >
      <h3>登录</h3>
      <p>你确定登录此账户？</p>
      <div
        style={{
          width: "150px",
          display: "flex",
          marginTop: "50px",
          justifyContent: "space-between",
        }}
      >
        <Btn
          type="primary"
          onClick={() => {
            userService.UserLogin({ customerUid });
            accountService.UserInfo();
            navigator("/");
          }}
          boxShadow
        >
          登录
        </Btn>
        <Btn htmlType="reset" boxShadow onClick={onClose}>
          取消
        </Btn>
      </div>
    </Drawer>
  );
};

export default LoginDrawer;

import { FC } from "react";
import accountService from "@/store/network/account/service";
import { Btn } from "@/components/button";
import "./index.less";
import { useNavigate } from "react-router-dom";
interface IProps {
  userName: string;
}
const Index: FC<IProps> = ({ userName }) => {
  const navigator = useNavigate();
  return (
    <div className="setting-title">
      <div className="setting-title-detail">
        <div className="setting-title-username">{userName}</div>
      </div>
      <Btn
        type="primary"
        onClick={() => {
          navigator("/home");
          accountService.logout();
        }}
      >
        退出
      </Btn>
    </div>
  );
};

export default Index;

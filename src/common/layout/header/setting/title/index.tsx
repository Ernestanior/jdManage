import { FC } from "react";
import { Button } from "antd";
import accountService from "@/store/network/account/service";
import moment from "moment";
import "./index.less";
interface IProps {
  userName: string;
  lastLoginTime: number;
}
const Index: FC<IProps> = ({ userName, lastLoginTime }) => {
  return (
    <div className="setting-title">
      <div className="setting-title-detail">
        <div className="setting-title-username">{userName}</div>
        你最后的登录时间是：
        <div>{moment(lastLoginTime).format("YYYY MMM Do ddddHH:mm")}</div>
      </div>
      <Button
        type="primary"
        style={{ borderRadius: "15px", fontWeight: 550 }}
        onClick={() => {
          accountService.logout();
        }}
      >
        退出
      </Button>
    </div>
  );
};

export default Index;

import { FC } from "react";
import accountService from "@/store/network/account/service";
import moment from "moment";
import { Btn } from "@/components/button";
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
      <Btn
        type="primary"
        onClick={() => {
          accountService.logout({});
        }}
      >
        退出
      </Btn>
    </div>
  );
};

export default Index;

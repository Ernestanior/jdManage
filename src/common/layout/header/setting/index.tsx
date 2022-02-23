import { FC, useEffect } from "react";
import { Popover } from "antd";
import Content from "./content";
import { DownOutlined } from "@ant-design/icons";
import { useUserInfo } from "@/store/network/account";
import Title from "./title";
import accountService from "@/store/network/account/service";
import { useNewUserLogin } from "@/store/network/user";
const HeaderPlx: FC = () => {
  const userInfo = useUserInfo();
  const userLogin = useNewUserLogin();
  useEffect(() => {
    accountService.UserInfo();
  }, [userLogin]);

  return (
    <>
      {userInfo && (
        <Popover
          content={<Content />}
          title={
            <Title
              userName={userInfo.userName ? userInfo.userName : ""}
              lastLoginTime={
                userInfo.lastLoginTime ? userInfo.lastLoginTime : 0
              }
            />
          }
          overlayStyle={{ width: "280px" }}
        >
          <span className="pop-over">
            {userInfo.userName ? userInfo.userName : ""}
            <DownOutlined style={{ marginLeft: "30px" }} />
          </span>
        </Popover>
      )}
    </>
  );
};

export default HeaderPlx;

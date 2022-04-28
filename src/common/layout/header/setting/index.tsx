import { FC } from "react";
import { Popover } from "antd";
import Content from "./content";
import { DownOutlined } from "@ant-design/icons";
import { useUserInfo } from "@/store/network/account";
import Title from "./title";
const HeaderPlx: FC = () => {
  const userInfo = useUserInfo();
  // const userLogin = useNewUserLogin();
  // useEffect(() => {
  //   accountService.UserInfo();
  // }, [userLogin]);

  return (
    <>
      {userInfo && (
        <Popover
          content={<Content />}
          title={
            <Title userName={userInfo.username ? userInfo.username : ""} />
          }
          overlayStyle={{ width: "280px" }}
        >
          <span className="pop-over">
            {userInfo.username ? userInfo.username : ""}
            <DownOutlined style={{ marginLeft: "30px" }} />
          </span>
        </Popover>
      )}
    </>
  );
};

export default HeaderPlx;

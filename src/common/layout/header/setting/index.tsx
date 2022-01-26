import { FC } from "react";
import { Popover } from "antd";
import Content from "./content";
import { DownOutlined } from "@ant-design/icons";
import { useUserInfo } from "@/store/network/account";
import Title from "./title";
const HeaderPlx: FC = () => {
  const userInfo = useUserInfo();
  if (userInfo) {
    const { userName, lastLoginTime } = userInfo;
    return (
      <Popover
        content={<Content />}
        title={<Title userName={userName} lastLoginTime={lastLoginTime} />}
        overlayStyle={{ width: "280px" }}
      >
        <span className="pop-over">
          {userName}
          <DownOutlined style={{ marginLeft: "30px" }} />
        </span>
      </Popover>
    );
  }
  return (
    <span className="pop-over">
      unknow@greypanel.com
      <DownOutlined style={{ marginLeft: "30px" }} />
    </span>
  );
};

export default HeaderPlx;

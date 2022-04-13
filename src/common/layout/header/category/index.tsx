import { FC, useMemo } from "react";
import {
  SmileTwoTone,
  HomeTwoTone,
  HeartTwoTone,
  CrownTwoTone,
  CheckCircleTwoTone,
  ReconciliationTwoTone,
  SoundTwoTone,
  ToolTwoTone,
} from "@ant-design/icons";
import { Drawer } from "antd";
import "./index.less";
import { NavLink } from "react-router-dom";
import useRole from "@/hooks/useRole";
import { IUserType } from "@/hooks/useInfo";
import { useUserInfo } from "@/store/network/account";
interface IProps {
  visible: boolean;
  onClose: () => void;
}

const HeaderPlx: FC<IProps> = ({ visible, onClose }) => {
  // 权限
  const roleAuth = useRole();
  const role = useUserInfo();

  const navList = useMemo(() => {
    return [
      {
        icon: <HomeTwoTone twoToneColor="#eb9f16" />,
        title: "主页",
        path: "/",
      },
      {
        icon: <HeartTwoTone twoToneColor="#eb2f96" />,
        title: "公司管理",
        path: "/company",
      },
      {
        icon: <CheckCircleTwoTone twoToneColor="#22c7d3" />,
        title: "客户管理",
        path: "/customer-management",
      },
      {
        icon: <SmileTwoTone twoToneColor="#822496" />,
        title: "平台",
        path: "/platform-management",
      },
      {
        icon: <ReconciliationTwoTone twoToneColor="#52c41a" />,
        title: "CDN站点",
        path: "/cdn-site",
      },
      {
        icon: <SoundTwoTone twoToneColor="#a72626" />,
        title: "域名解析",
        path: "/dns-management",
      },
      {
        icon: <ToolTwoTone twoToneColor="#423626" />,
        title: "资料查询",
        path: "/info-inquiry",
      },
      {
        icon: <CrownTwoTone twoToneColor="#789abc" />,
        title: "证书管理",
        path: "/ssl-management",
      },
    ];
  }, [role]);

  return (
    <Drawer
      placement="top"
      closable={false}
      onClose={onClose}
      visible={visible}
      height={130}
    >
      <div className="header-category">
        {navList.map(
          (item) =>
            item && (
              <NavLink
                to={item.path}
                key={item.title}
                className="header-category-item"
                onClick={() => onClose()}
              >
                {item.icon}
                {item.title}
              </NavLink>
            )
        )}
      </div>
    </Drawer>
  );
};

export default HeaderPlx;

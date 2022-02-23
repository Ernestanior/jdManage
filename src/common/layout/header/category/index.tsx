import { FC } from "react";
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
interface IProps {
  visible: boolean;
  onClose: () => void;
}

const HeaderPlx: FC<IProps> = ({ visible, onClose }) => {
  const navList = [
    { icon: <HomeTwoTone twoToneColor="#eb9f16" />, title: "主页", path: "/" },
    {
      icon: <HeartTwoTone twoToneColor="#eb2f96" />,
      title: "系统管理",
      path: "/system-management",
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

  return (
    <Drawer
      placement="top"
      closable={false}
      onClose={onClose}
      visible={visible}
      height={130}
    >
      <div className="header-category">
        {navList.map((item) => (
          <NavLink
            to={item.path}
            key={item.title}
            className="header-category-item"
            onClick={() => onClose()}
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </div>
    </Drawer>
  );
};

export default HeaderPlx;

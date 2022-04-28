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
// import { useUserInfo } from "@/store/network/account";
interface IProps {
  visible: boolean;
  onClose: () => void;
}

const HeaderPlx: FC<IProps> = ({ visible, onClose }) => {
  // 权限
  const roleAuth = useRole();
  // const role = useUserInfo();

  const navList = useMemo(() => {
    return [
      {
        icon: <HomeTwoTone twoToneColor="#eb9f16" />,
        title: "主页",
        path: "/",
      },
      roleAuth(
        {
          icon: <ReconciliationTwoTone twoToneColor="#52c41a" />,
          title: "员工管理",
          path: "/admin",
        },
        []
      ),
      {
        icon: <HeartTwoTone twoToneColor="#eb2f96" />,
        title: "公司管理",
        path: "/company",
      },
      {
        icon: <CheckCircleTwoTone twoToneColor="#22c7d3" />,
        title: "职位管理",
        path: "/jobs",
      },
      {
        icon: <SmileTwoTone twoToneColor="#822496" />,
        title: "笔记管理",
        path: "/note",
      },
      {
        icon: <SoundTwoTone twoToneColor="#a72626" />,
        title: "待开发2",
        path: "/",
      },
      {
        icon: <ToolTwoTone twoToneColor="#423626" />,
        title: "待开发3",
        path: "/",
      },
      {
        icon: <CrownTwoTone twoToneColor="#789abc" />,
        title: "待开发4",
        path: "/",
      },
    ];
  }, [roleAuth]);

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

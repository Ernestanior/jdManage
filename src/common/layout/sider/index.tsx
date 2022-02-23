import { FC, useState } from "react";
import { Layout } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import IconFont from "@/components/icon";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Props {
  sideList: any[];
}
const AntSide = Layout.Sider;
const Sider: FC<Props> = ({ sideList }) => {
  const [collapsed, setCollapsed] = useState(true);
  // const [selected, setSelected] = useState<Number>(0);

  const currentPath = useLocation().pathname.split("/");
  const navPath = currentPath[3] || "";
  const parentPath = currentPath.slice(0, 3).join("/");
  // console.log(currentPath);
  // console.log(parentPath);
  // console.log(navPath);
  return (
    <AntSide
      collapsible
      collapsedWidth={81}
      width={200}
      collapsed={collapsed}
      theme="light"
      trigger={null}
    >
      <div className="edge-sider">
        {sideList.map((item, index) => {
          if (!item.path) {
            return (
              <NavLink to={`/cdn-site`} className="edge-sider-item" key={index}>
                <IconFont
                  style={{ fontSize: 25 }}
                  className={`sider-item-icon ${navPath ? "" : "icon-active"}`}
                  type={item.icon}
                />

                {!collapsed && (
                  <div
                    className={`sider-item-title ${
                      navPath ? "" : "title-active"
                    }  `}
                  >
                    {item.title}
                  </div>
                )}
              </NavLink>
            );
          }
          return (
            <NavLink
              to={`${parentPath}/${item.path}`}
              className="edge-sider-item"
              key={index}
            >
              <IconFont
                style={{ fontSize: 25 }}
                className={`sider-item-icon ${
                  navPath === item.path ? "icon-active" : ""
                }`}
                type={item.icon}
              />

              {!collapsed && (
                <div
                  className={`sider-item-title ${
                    navPath === item.path ? "title-active" : ""
                  }  `}
                >
                  {item.title}
                </div>
              )}
            </NavLink>
          );
        })}
        <div
          style={!collapsed ? { transform: "translateX(60px)" } : {}}
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <RightOutlined
              style={{
                fontSize: 16,
                color: "#444",
                animationName: "fadein",
                animationDuration: "1.5s",
              }}
            />
          ) : (
            <LeftOutlined
              style={{
                fontSize: 16,
                color: "#444",
                animationName: "fadein",
                animationDuration: "1.5s",
              }}
            />
          )}
        </div>
      </div>
    </AntSide>
  );
};

export default Sider;

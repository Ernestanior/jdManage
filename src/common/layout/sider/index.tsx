import { FC, useState } from "react";
import { Col, Layout, Row } from "antd";
import { NavLink } from "react-router-dom";
import IconFont from "@/components/icon";
import { SiderList } from "./config";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const AntSide = Layout.Sider;
const Sider: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState<Number>(0);

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
        {SiderList.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              className="edge-sider-item"
              key={index}
              onClick={() => setSelected(index)}
            >
              <IconFont
                style={{ fontSize: 25 }}
                className={`sider-item-icon ${
                  selected === index ? "icon-active" : ""
                }`}
                type={item.icon}
              />

              {!collapsed && (
                <div
                  className={`sider-item-title ${
                    selected === index ? "title-active" : ""
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

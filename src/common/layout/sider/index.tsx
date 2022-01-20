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
  const onCollapse = () => {
    console.log(collapsed, "aaaa");
    setCollapsed(!collapsed);
  };
  const onSelected = (index: Number) => {
    setSelected(index);
  };

  return (
    <AntSide
      collapsible
      collapsedWidth={90}
      width={200}
      collapsed={collapsed}
      theme="light"
      trigger={null}
    >
      <div>
        {SiderList.map((item, index) => {
          return (
            <li
              className="MenuItem"
              key={index}
              onClick={() => onSelected(index)}
            >
              <NavLink to={item.path}>
                <Row>
                  <Col span={6} offset={2}>
                    <div>
                      <IconFont
                      style={{fontSize:20}}
                        className={
                          selected === index ? "ItemIconFocus" : "ItemIcon"
                        }
                        type={item.icon}
                      />
                    </div>
                  </Col>
                  <Col span={12} offset={2}>
                    <div
                      className={
                        collapsed
                          ? "ItemTitleHide"
                          : selected === index
                          ? "ItemTitleFocus"
                          : "ItemTitle"
                      }
                    >
                      {item.title}
                    </div>
                  </Col>
                </Row>
              </NavLink>
            </li>
          );
        })}
      </div>
      
      <div
        style={collapsed ? { transform: "translateX(-130px)" } : {}}
        className="CollapseBtn"
        onClick={onCollapse}
      >
        {collapsed ? <RightOutlined style={{fontSize:18,animationName:"fadein",animationDuration:"1.5s"}}/> : <LeftOutlined style={{fontSize:18,animationName:"fadein",animationDuration:"1.5s"}} />}
      </div>
    </AntSide>
  );
};

export default Sider;

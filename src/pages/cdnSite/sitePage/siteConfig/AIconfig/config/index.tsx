import React, { FC, ReactElement } from "react";
import "./index.less";
import { Menu, Dropdown, Button } from "antd";
import { CaretDownFilled } from "@ant-design/icons";

const Index: FC = (): ReactElement => {
  const [setting, setSetting] = React.useState<String>("自动");
  const handleMenuClick = (e: any) => {
    setSetting(e.key);
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="自动">自动</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="手动">手动</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="自定义">自定义</Menu.Item>
    </Menu>
  );
  return (
    <div className="sub-page-container">
      <div className="ai-setting-container">
        <h3 className="ai-setting-text">CDN服务器商切换设置</h3>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          className="ai-setting-list"
        >
          <Button className="ai-setting-button">
            {setting}
            <CaretDownFilled />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Index;

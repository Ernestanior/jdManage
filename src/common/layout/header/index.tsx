import { FC } from "react";
import { ChromeOutlined, UserOutlined, DownOutlined} from '@ant-design/icons';
import { Menu, Dropdown, Button, message, Space, Row, Col  } from 'antd';
import "./index.less";

function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" icon={<UserOutlined />}>
            1st menu item
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
            2nd menu item
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
            3rd menu item
        </Menu.Item>
    </Menu>
);



const HeaderPlx:FC = () => {
    return <nav className='comp-header'>
        <Row align="middle">
            <Col flex={1}>
                <ChromeOutlined />
                <span>
                    LOGO
                </span>
            </Col>
            <Col span={6}>
                <Space>
                    <Dropdown overlay={menu}>
                        <Button>
                            Button <DownOutlined />
                        </Button>
                    </Dropdown>
                    <UserOutlined />
                </Space>
            </Col>
        </Row>
    </nav>
}

export default HeaderPlx;

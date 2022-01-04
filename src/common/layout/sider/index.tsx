import { FC } from "react";
import { Layout } from 'antd';
const AntSide = Layout.Sider

const Sider:FC = () => {
    return <AntSide width={200} className="cdn-ly-side cdn-scroll">
        侧边栏
    </AntSide>
}

export default Sider;

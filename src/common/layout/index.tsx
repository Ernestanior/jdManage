import { FC } from "react";
import { Layout } from "antd";
import ContentP from "./content";
import HeaderPlx from "./header";
import SideBar from "./sider"

const LayoutPlx:FC = ({ children }) => {
    return <Layout className="height-fill">
        <HeaderPlx />
        <Layout>
            <SideBar/>
            <ContentP>{children}</ContentP>
        </Layout>
    </Layout>
}

export default LayoutPlx

import { FC, useMemo } from "react";
import { Layout } from "antd";
import ContentP from "./content";
import HeaderPlx from "./header";
import { useLocation } from "react-router-dom";
import SideBar from "./sider";
import { cdnSite } from "./sider/config";

const LayoutPlx: FC = ({ children }) => {
  const path = useLocation()
    .pathname.split("/")
    .filter((n) => n !== "");

  const sidebar = useMemo(() => {
    if (path[0] === "cdn-site" && path.length > 1)
      return <SideBar sideList={cdnSite} />;
    return;
  }, [path]);

  return (
    <Layout className="height-fill">
      <HeaderPlx />
      <Layout>
        {sidebar}
        {/* <SideBar /> */}
        <ContentP>{children}</ContentP>
      </Layout>
    </Layout>
  );
};

export default LayoutPlx;

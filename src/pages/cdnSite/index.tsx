import { useSiteAll, useSiteInfo } from "@/store/network/site";
import siteService from "@/store/network/site/service";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { FC, ReactElement, useEffect, useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Loading from "@/components/loading/context";
const Index: FC = (): ReactElement => {
  // 获取当前路由路径
  const path = useLocation()
    .pathname.split("/")
    .filter((n) => n !== "")[1];

  // 根据uid向后台获取site信息
  useEffect(() => {
    path && siteService.getSiteInfo(path);
  }, [path]);
  const siteInfo = useSiteInfo();
  console.log(siteInfo);

  // 获取所有site
  useEffect(() => siteService.findSiteAll(), []);
  const siteList = useSiteAll();

  // const onClick = ({ key }: { key: string }) => {};

  const menu = useMemo(() => {
    return (
      <Menu style={{ height: "300px", overflowY: "scroll" }}>
        {siteList &&
          siteList instanceof Array &&
          siteList.map((item) => (
            <Menu.Item key={item.uid}>
              <NavLink to={`/cdn-site/${item.uid}`}>{item.name}</NavLink>
            </Menu.Item>
          ))}
      </Menu>
    );
  }, [siteList]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <svg
          className="icon"
          style={{ fontSize: "24px", color: "orange", marginRight: "5px" }}
          aria-hidden="true"
        >
          <use xlinkHref="#icon-kongzhitai-copy"></use>
        </svg>
        <NavLink to="/cdn-site" style={{ color: "#999" }}>
          站点管理 /
        </NavLink>
        {path &&
          (siteList ? (
            <Dropdown overlay={menu}>
              <div
                style={{
                  marginLeft: "7px",
                  fontSize: "15px",
                  userSelect: "none",
                }}
              >
                {siteInfo && siteInfo.name}
                <DownOutlined style={{ marginLeft: "7px" }} />
              </div>
            </Dropdown>
          ) : (
            <div style={{ width: "60px", position: "relative" }}>
              <Loading display={true}></Loading>
            </div>
          ))}
      </div>
      <Outlet />
    </>
  );
};

export default Index;

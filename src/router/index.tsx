import React, { FC, useEffect } from "react";
import { HashRouter, Routes, Navigate, Route } from "react-router-dom";
import { useAccountInfo } from "@/store/network/account";
import Login from "@/pages/login";
import Home from "@/pages/home";
import LayoutPlx from "../common/layout";
import accountService from "@/store/network/account/service";

// import Domain from "./cdnSite/sitePage/siteConfig/dns/domain";
import Company from "@/pages/company";

import User from "@/pages/user";
import { useNewUserLogin } from "@/store/network/user";
import useLoginInfo from "@/hooks/useInfo";

/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ProjectRouter: FC = () => {
  const accountInfo = useAccountInfo();
  console.log(accountInfo);
  // const userType = useLoginInfo().userType;

  // if (!accountInfo) {
  //   return <Login />;
  // }

  return (
    <HashRouter>
      <LayoutPlx>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/user/*" element={<User />}></Route>
          <Route path="/company/*" element={<Company />}></Route>
          {/* <Route path="/customer-management/*" element={<CusManage />}></Route> */}
          {/* <Route path="/dns-management/*" element={<DnsMana />}></Route> */}
          {/* <Route path="/cdn-site/*" element={<CdnSite />}>
            <Route path=":sitename/*" element={<SitePage />}>
              <Route path="firewall/*" element={<Firewall />}></Route>
              <Route path="statistics/*" element={<Statistics />}></Route>
              <Route path="platform-management" element={<PlatMana />} />
              <Route path="cache" element={<Cache />}></Route>
              <Route
                path="site-configuration/*"
                element={<SiteConfig />}
              ></Route>
              <Route
                path="*"
                element={<Navigate to="site-configuration" replace />}
              />
            </Route>
            <Route path="*" element={<SiteList />}></Route>
          </Route> */}
          {/* <Route path="/info-inquiry/*" element={<InfoInquiry />}></Route> */}
          {/* <Route path="/platform-management/*" element={<Platform />}></Route> */}
          {/* <Route path="/ssl-management/*" element={<SslMana />}></Route> */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LayoutPlx>
    </HashRouter>
  );
};

export default ProjectRouter;

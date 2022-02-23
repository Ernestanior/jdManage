import React, { FC, useEffect } from "react";
import { HashRouter, Routes, Navigate, Route } from "react-router-dom";
import { useAccountInfo } from "@/store/network/account";
import Login from "@/pages/login";
import Home from "@/pages/home";
import LayoutPlx from "../common/layout";
import accountService from "@/store/network/account/service";

import CdnSite from "@/pages/cdnSite";
import SiteList from "@/pages/cdnSite/siteList";
import SitePage from "@/pages/cdnSite/sitePage";
import SiteConfig from "@/pages/cdnSite/sitePage/siteConfig";

// import Domain from "./cdnSite/sitePage/siteConfig/dns/domain";
import SysManage from "@/pages/sysMana";

import CusManage from "@/pages/cusMana";

import Platform from "@/pages/platMana";

import DnsMana from "@/pages/dnsMana";

import InfoInquiry from "@/pages/infoInquiry";

import SslMana from "@/pages/sslMana";

import Cache from "@/pages/cdnSite/sitePage/cache";
import Firewall from "@/pages/cdnSite/sitePage/firewall";

import Statistics from "@/pages/cdnSite/sitePage/statistics";

import PlatMana from "@/pages/cdnSite/sitePage/plat-mana";

import User from "@/pages/user";
import { useNewUserLogin } from "@/store/network/user";

/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ProjectRouter: FC = () => {
  const accountInfo = useAccountInfo();
  // console.log(accountInfo);
  if (!accountInfo) {
    return <Login />;
  }

  return (
    <HashRouter>
      <LayoutPlx>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/user/*" element={<User />}>
            {/* <Route path="info" element={<Info />}></Route>
            <Route path="log/*" element={<Log />}>
              <Route path="admin-log" element={<Admin />}></Route>
              <Route path="customer-log" element={<Customer />}></Route>
              <Route path="*" element={<Navigate to="admin-log" replace />} />
            </Route>
            <Route path="reset-pwd" element={<ResetPwd />}></Route>
            <Route path="security/*" element={<Security />}>
              <Route path="login-restriction" element={<Restriction />} />
              <Route path="login-records" element={<Record />}></Route>
              <Route
                path="*"
                element={<Navigate to="login-restriction" replace />}
              />
            </Route>
            <Route path="*" element={<Navigate to="info" replace />} /> */}
          </Route>
          <Route path="/system-management/*" element={<SysManage />}>
            {/* <Route path="userlist/*" element={<UserList />}>
              <Route path="admin" element={<UserAdmin />} />
              <Route path="om" element={<Om />} />
              <Route path="sale" element={<Agent />} />
              <Route path="agent" element={<Sale />} />
              <Route path="*" element={<Navigate to="admin" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="userlist"></Navigate>} /> */}
          </Route>
          <Route path="/customer-management/*" element={<CusManage />}>
            {/* <Route path="registered" element={<Registered />} />
                    <Route path="sales" element={<Sales />}></Route>
                    <Route path="*" element={<Navigate to="registered" replace />} /> */}
          </Route>
          <Route path="/dns-management/*" element={<DnsMana />}>
            {/* <Route path="record-management" element={<DnsRecord />}></Route>
                    <Route path="domain-management" element={<DnsDomain />}></Route>
                    <Route path="*" element={<Navigate to="domain-management" replace />} /> */}
          </Route>
          <Route path="/cdn-site/*" element={<CdnSite />}>
            <Route path=":sitename/*" element={<SitePage />}>
              <Route path="firewall/*" element={<Firewall />}>
                {/* <Route path="ip-whitelist" element={<IPWhite />} />
                            <Route path="ip-blacklist" element={<IPBlack />} />
                            <Route path="ua-whitelist" element={<UAWhite />} />
                            <Route path="ua-blacklist" element={<UABlack />} />
                            <Route path="*" element={<Navigate replace to="ip-whitelist" />} />` */}
              </Route>
              <Route path="statistics/*" element={<Statistics />}>
                {/* <Route path="cdn-utilization" element={<CdnUtil />} />
                            <Route path="platforms/*" element={<StatPlatform />}>
                                <Route path="availability" element={<PlatAvail />} />
                                <Route path="response-time" element={<PlatResponse />} />
                                <Route path="*" element={<Navigate to="availability" replace />} />
                            </Route>
                            <Route path="usage" element={<Usage />} />
                            <Route path="web-performance" element={<WebPerform />}>
                                <Route path="availability" element={<WebAvail />} />
                                <Route path="response-time" element={<WebResponse />} />
                                <Route path="visit-source" element={<WebVisit />} />
                                <Route path="*" element={<Navigate to="availability" replace />} />
                            </Route>
                            <Route path="*" element={<Navigate to="web-performance" replace />} /> */}
              </Route>
              <Route path="platform-management" element={<PlatMana />} />
              <Route path="cache" element={<Cache />}></Route>
              <Route path="site-configuration/*" element={<SiteConfig />}>
                {/* <Route path="platform-setting/*" element={<PlatSet />} >
                                <Route path="source" element={<Source />} />
                                <Route path="basic" element={<Basic />} />
                                <Route path="ssl" element={<Ssl />} />
                                <Route path="*" element={<Navigate to="source" replace />} />
                            </Route>
                            <Route path="ai-configuration/*" element={<AIconfig />} >
                                <Route path="config" element={<Config />} />
                                <Route path="log" element={<AiLog />} />
                                <Route path="*" element={<Navigate to="config" replace />} />
                            </Route>
                            <Route path="dns/*" element={<SiteDns />} >
                                <Route path="domain" element={<Domain />} />
                                <Route path="*" element={<Navigate to="domain" replace />} />
                            </Route>
                            <Route path="*" element={<Navigate to="dns" replace />} /> */}
              </Route>
              <Route
                path="*"
                element={<Navigate to="site-configuration" replace />}
              />
            </Route>
            <Route path="*" element={<SiteList />}></Route>
          </Route>
          <Route path="/info-inquiry/*" element={<InfoInquiry />}>
            {/* <Route path="cdn-query" element={<CdnQuery />} />
                    <Route path="*" element={<Navigate to="cdn-query" replace />} /> */}
          </Route>
          <Route path="/platform-management/*" element={<Platform />}>
            {/* <Route path="all" element={<All />} />
                    <Route path="china-icp" element={<ChinaICP />} />
                    <Route path="china" element={<China />} />
                    <Route path="global" element={<Global />} />
                    <Route path="global-ddos" element={<GlobalDDOS />} />
                    <Route path="custom-platform" element={<CusPlat />} />
                    <Route path="*" element={<Navigate to="all" replace />} /> */}
          </Route>
          <Route path="/ssl-management/*" element={<SslMana />}>
            {/* <Route path="client-certificate" element={<Client />} />
                    <Route path="origin-certificate" element={<Origin />} />
                    <Route path="certificate-download" element={<Download />} />
                    <Route path="*" element={<Navigate to="client-certificate" replace />} /> */}
          </Route>

          {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LayoutPlx>
    </HashRouter>
  );
};

export default ProjectRouter;

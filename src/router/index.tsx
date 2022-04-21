import { FC } from "react";
import { HashRouter, Routes, Navigate, Route } from "react-router-dom";
import { useUserInfo } from "@/store/network/account";
import Login from "@/pages/login";
import Home from "@/pages/home";
import LayoutPlx from "../common/layout";

// import Domain from "./cdnSite/sitePage/siteConfig/dns/domain";
import Company from "@/pages/company";
import Jobs from "@/pages/jobs";
import Note from "@/pages/note";
import Admin from "@/pages/admin";

// import User from "@/pages/user";

/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ProjectRouter: FC = () => {
  const userInfo = useUserInfo();
  // console.log(accountInfo);
  // const userType = useLoginInfo().userType;

  if (!userInfo || !userInfo.token) {
    return <Login />;
  }

  return (
    <HashRouter>
      <LayoutPlx>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/user/*" element={<User />}></Route> */}
          <Route path="/company/*" element={<Company />}></Route>
          <Route path="/jobs/*" element={<Jobs />}></Route>
          <Route path="/note/*" element={<Note />}></Route>
          <Route path="/admin/*" element={<Admin />}></Route>
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

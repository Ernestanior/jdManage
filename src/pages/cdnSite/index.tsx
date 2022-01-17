import React, { FC, ReactElement } from "react";
import { NavLink, Outlet,useLocation } from "react-router-dom";
const Index: FC = (): ReactElement => {
  //     // 获取当前路由路径
  // const path = useLocation()
  // .pathname.split("/")
  // .filter((n) => n !== "");
  //   console.log(path);
    
  return (
    <div className="site-container">
    <div style={{display:"flex"}}>
        <svg className='icon' style={{fontSize:"24px",color:"orange",marginRight:"5px"}} aria-hidden="true" >
            <use xlinkHref="#icon-kongzhitai-copy"></use>
        </svg>
        <NavLink to="/cdn-site" style={{color:"#999"}}>站点管理 /</NavLink>
    </div>

    <Outlet />
    </div>
  );
};

export default Index;
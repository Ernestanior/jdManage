import React, { FC } from "react";
import { HashRouter, Routes, Navigate, Route } from "react-router-dom";
import useAccountInfo from "@/store/account";
import Login from "@/pages/login";
import Home from "@/pages/home";
import LayoutPlx from "../common/layout";

/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ProjectRouter:FC = () => {
    const accountInfo = useAccountInfo();

    if(!accountInfo){
        return <Login />;
    }

    return <HashRouter>
        <LayoutPlx>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </LayoutPlx>
    </HashRouter>
}

export default ProjectRouter

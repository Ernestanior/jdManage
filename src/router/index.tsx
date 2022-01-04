import React, { FC } from "react";
import { Redirect, Router, Switch, Route } from "react-router-dom";
import useAccountInfo from "@/store/account";
import historyService from "@/store/history"
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

    return <Router history={historyService}>
        <LayoutPlx>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Redirect to="/home" />
            </Switch>
        </LayoutPlx>
    </Router>
}

export default ProjectRouter

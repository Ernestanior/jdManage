import { FC, useState } from "react";
import {   SmileTwoTone,
  HeartTwoTone,
  CrownTwoTone,
  CheckCircleTwoTone,
  ReconciliationTwoTone,
  SoundTwoTone,
  ToolTwoTone,} from '@ant-design/icons';
import { Drawer } from 'antd';
import './index.less'
import { NavLink } from "react-router-dom";
interface IProps{
    visible:boolean;
    onClose: ()=>void;
}

const HeaderPlx:FC<IProps> = ({
    visible,
    onClose
}) => {
  const navList= [
    { icon: <HeartTwoTone twoToneColor="#eb2f96" />, title: "系统管理",path:"/" },
    {
      icon: <CheckCircleTwoTone twoToneColor="#22c7d3" />,
      title: "客户管理",
      path:"/"
    },
    { icon: <SmileTwoTone twoToneColor="#822496" />, title: "平台",path:"/" },
    {
      icon: <ReconciliationTwoTone twoToneColor="#52c41a" />,
      title: "CDN站点",
      path:"/cdn-site"
    },
    { icon: <SoundTwoTone twoToneColor="#a72626" />, title: "DNS",path:"/" },
    { icon: <ToolTwoTone twoToneColor="#423626" />, title: "资料查询",path:"/" },
    { icon: <CrownTwoTone twoToneColor="#789abc" />, title: "证书管理",path:"/" },
  ]

    return         <Drawer
    placement='top'
    closable={false}
    onClose={onClose}
    visible={visible}
    height={130}
  >
    <div className="header-category">
      {navList.map((item) => (
        <NavLink to={item.path} key={item.title} className="header-category-item">
          {item.icon}
          {item.title}
        </NavLink>
      ))}
    </div>

  </Drawer>
}

export default HeaderPlx;

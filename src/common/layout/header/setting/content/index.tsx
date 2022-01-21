import IconFont from "@/components/icon";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./index.less";
export const settingList = [
  {
    icon: "icon-ic_person_24px",
    title: "个人概况",
    // path: "/user/info",
  },
  {
    icon: "icon-ic_security_24px",
    title: "安全",
    // path: "/user/security",
  },
  {
    icon: "icon-ic_date_range_24px",
    title: "操作日志",
    // path: "/user/log",
  },
  {
    icon: "icon-ic_group_24px",
    title: "修改密码",
    // path: "/user/reset-pwd",
  },
  {
    icon: "icon-ic_assignment_24px",
    title: "工单系统",
    // path: "/user/work-order",
  },
  {
    icon: "icon-a-Subtraction2",
    title: "计费系统",
    // path: "/user/billing",
  },
];
const Index: FC = () => {
  return (
    <div className="setting-content">
      {settingList.map((item, index) => {
        return (
          <NavLink
            to={"/user"}
            state={{ user: index + 1 }}
            className="setting-item"
            key={index}
          >
            <IconFont type={item.icon} className="setting-item-icon" />
            <div>{item.title}</div>
          </NavLink>
        );
      })}
    </div>
  );
};
export default Index;

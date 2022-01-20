import React, { FC, HTMLAttributes, ReactElement } from "react";
import { Button } from "antd";
import "./index.less";
export interface IProps {
  className?: string;
  children: any;
}

/** 用于表单提交，增删改查以及页面跳转等操作 */
const Tip = ({ className, children }: IProps) => {
  return (
    <div className={className ? className + " edge-tip" : "edge-tip"}>
      {children}
    </div>
  );
};
export default Tip;

import React, { FC, HTMLAttributes, ReactElement } from "react";
import { Button } from "antd";
import "./index.less";
export interface IProps {
  className?: string;
  children: any;
  hideTitle?: boolean;
}

/** 用于表单提交，增删改查以及页面跳转等操作 */
const Tip = ({ className, children, hideTitle }: IProps) => {
  return (
    <div className={className ? className + " edge-tip" : "edge-tip"}>
      {!hideTitle && <div className="title">提示:</div>}
      {children}
    </div>
  );
};
export default Tip;

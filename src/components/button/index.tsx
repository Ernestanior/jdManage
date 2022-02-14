import React, { FC, HTMLAttributes, ReactElement } from "react";
import { Button } from "antd";
import "./index.less";
export interface IProps extends HTMLAttributes<HTMLButtonElement> {
  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  // backgroundColor?: string;
  // color?: string;
  size?: "large" | "middle" | "small";
  disabled?: boolean;
  children?: any;
  icon?: ReactElement;
  htmlType?: "submit" | "reset";
  boxShadow?: boolean;
}

/** 用于表单提交，增删改查以及页面跳转等操作 */
export const Btn = ({ children, boxShadow, ...props }: IProps) => {
  if (boxShadow) {
    return (
      <Button
        {...props}
        style={{
          boxShadow: "2px 2px 5px 0 #aaa",
          borderRadius: "15px",
          fontSize: "14px",
        }}
      >
        {children}
      </Button>
    );
  } else {
    return (
      <Button
        {...props}
        style={{
          borderRadius: "15px",
          fontSize: "14px",
        }}
      >
        {children}
      </Button>
    );
  }
};

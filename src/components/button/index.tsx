import React, { HTMLAttributes, ReactElement, useState } from "react";
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
  size?: "large" | "middle" | "small";
  disabled?: boolean;
  children?: any;
  icon?: ReactElement;
  htmlType?: "submit" | "reset";
  boxShadow?: boolean;
  delay?: boolean;
}

/** 用于表单提交，增删改查以及页面跳转等操作 */
export const Btn = ({
  onClick,
  delay,
  children,
  boxShadow,
  ...props
}: IProps) => {
  let btnEnabled = true;
  const [loading, setLoading] = useState(false);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (delay) {
      setLoading(true);
      if (!btnEnabled) {
        return;
      }
      onClick && (await onClick(e));
      btnEnabled = true;
      setLoading(false);
    } else {
      onClick && onClick(e);
    }
  };
  if (boxShadow) {
    return (
      <Button
        {...props}
        onClick={handleClick}
        style={{
          boxShadow: "2px 2px 5px 0 #aaa",
          borderRadius: "15px",
          fontSize: "14px",
        }}
        loading={loading}
      >
        {children}
      </Button>
    );
  } else {
    return (
      <Button
        onClick={handleClick}
        {...props}
        style={{
          borderRadius: "15px",
          fontSize: "14px",
        }}
        loading={loading}
      >
        {children}
      </Button>
    );
  }
};

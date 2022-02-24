import { HTMLAttributes, ReactElement } from "react";
import { Button } from "antd";
export interface IProps extends HTMLAttributes<HTMLButtonElement> {
  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  backgroundColor?: string;
  color?: string;
  size?: "large" | "middle" | "small";
  disabled?: boolean;
  children?: any;
  icon?: ReactElement;
  htmlType?: "button" | "submit" | "reset" | undefined;
  padding?: string;
  marginRight?: string;
  loading?: boolean;
}

/** 用于表单提交，增删改查以及页面跳转等操作 */
export const Btn = ({
  backgroundColor,
  color,
  children,
  padding,
  marginRight,
  loading,
  ...props
}: IProps) => {
  // console.log(children);
  // console.log(props);

  return (
    <Button
      {...props}
      loading={loading}
      style={{ color, backgroundColor, padding, marginRight }}
    >
      {children}
    </Button>
  );
};

import React, { FC } from "react";
import IconFont from "./index";
import { ITrigger } from "../interface";
import "./tip.less";

interface IProps {
  onClick: ITrigger;
  style?: React.CSSProperties;
}

const IconTip: FC<IProps> = ({ onClick, style }) => {
  return (
    <IconFont
      onClick={onClick}
      style={style}
      className="comp-icon-tip"
      type="icontishi"
    />
  );
};

export default IconTip;

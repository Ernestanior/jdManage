import React, { FC, ReactElement, useState } from "react";
import "./index.less";
export interface IProps {
  navList: any[];
}
/** 弹窗模块 */
const Navbar: FC<IProps> = ({ navList, children }): ReactElement => {
  const [flag, setFlag] = useState(0);

  // const navList = ['查看设置','健康数据','直播设置','视频源和转码','回放','托管页面']
  return (
    <div className="tabOne">
      <div className="tab">
        {navList.map((v, i) => (
          <div
            className={`option ${flag === i ? "active" : ""}`}
            onClick={() => {
              setFlag(i);
            }}
          >
            {v}
          </div>
        ))}
      </div>
      <section className="content">{children}</section>
    </div>
  );
};
export default Navbar;

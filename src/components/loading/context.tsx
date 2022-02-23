import { Layout, Spin } from "antd";
import React, { FC } from "react";
import "./context.less";

interface IProps {
  display: boolean | null;
  zIndex?: number;
}
/**
 * 内容加载中
 */
const LoadContext: FC<IProps> = ({ display, zIndex }) => {
  return (
    <div>
      {display ? (
        <Layout className="comp-load-context" style={{ zIndex: zIndex }}>
          <Spin />
        </Layout>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoadContext;

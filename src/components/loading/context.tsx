import { Layout, Spin } from "antd";
import React, { FC } from "react";
import "./context.less";

interface IProps {
  display: boolean | null;
}
/**
 * 内容加载中
 */
const LoadContext: FC<IProps> = ({ display }) => {
  return (
    <div>
      {display ? (
        <Layout className="comp-load-context">
          <Spin size="large" />
        </Layout>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoadContext;

import { Layout } from "antd";
import { FC } from "react";
import "./index.less";

const ContentP: FC = (props) => {
  return (
    <Layout.Content className="comp-layout-content">
      <section className="cdn-scroll">{props.children}</section>
    </Layout.Content>
  );
};

export default ContentP;

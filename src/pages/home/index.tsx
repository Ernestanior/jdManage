import { FC } from "react";
import IconFont from "@/components/icon";
import "./index.less";

export interface IData {
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: any;
  content: any[];
}
const Home: FC = () => {
  return (
    <div className="edge-home">
      <div className="mini-table">
        <div style={{ fontWeight: "500" }}>可用的CDN</div>
        <div className="supplier-body">
          <IconFont type="icon-greypanel-logo"></IconFont>
          <IconFont type="icon-logo-cloudflare-dark"></IconFont>
          <IconFont type="icon-Varnish-logo_x"></IconFont>
          <IconFont type="icon-chunghwa-telecom-logo"></IconFont>
          <IconFont type="icon-nginx1"></IconFont>
          <IconFont type="icon-EN-Horizontal-"></IconFont>
        </div>
      </div>
    </div>
  );
};

export default Home;

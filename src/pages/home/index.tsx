import { FC, useEffect, useMemo, useState } from "react";
import MiniTable from "@/components/miniTable";
import IconFont from "@/components/icon";
import PieChart from "@/components/echart-dns/pie";
import LineChart from "./lineChart";
import request from "@/store/request";
import { dnsApi, siteApi } from "@/store/api";
import "./index.less";
import { useNewUserLogin } from "@/store/network/user";
import { use } from "echarts";

export interface IData {
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: any;
  content: any[];
}
const initData = {
  number: 0,
  numberOfElements: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  sort: "",
  content: [],
};
const Home: FC = () => {
  const userLogin = useNewUserLogin();
  const [cdnPage, setCdnPage] = useState(1);
  const [cdnData, setCdnData] = useState<IData>(initData);
  const [cdnLoading, setcdnLoading] = useState(false);

  const [dnsPage, setDnsPage] = useState(1);
  const [dnsData, setDnsData] = useState<IData>(initData);
  const [dnsLoading, setDnsLoading] = useState(false);

  //cdn-list
  useEffect(() => {
    setcdnLoading(true);
    request(
      siteApi.FindSite({
        searchPage: {
          page: cdnPage,
          pageSize: 6,
        },
      })
    ).then((res) => {
      setcdnLoading(false);
      setCdnData(res);
    });
  }, [userLogin,cdnPage]);


  const cdnList = useMemo(
    () => cdnData.content.map((item) => item.name),
    [cdnData]
  );

  //dns-list
  useEffect(() => {
    setDnsLoading(true);
    request(
      dnsApi.FindDomain({
        searchPage: {
          page: dnsPage,
          pageSize: 6,
        },
      })
    ).then((res) => {
      setDnsLoading(false);
      setDnsData(res);
    });
  }, [dnsPage,userLogin]);

  const dnsList = useMemo(
    () => dnsData.content.map((item) => item.displayName),
    [dnsData]
  );

  return (
    <div className="edge-home">
      <MiniTable
        title="CDN站点管理"
        btnTitle="新增站点"
        loading={cdnLoading}
        list={cdnList}
        totalElements={cdnData && cdnData.totalElements}
        pageChange={(page: number) => setCdnPage(page)}
      ></MiniTable>
      <MiniTable
        title="DNS域名管理"
        btnTitle="新增域名"
        loading={dnsLoading}
        list={dnsList}
        totalElements={dnsData && dnsData.totalElements}
        pageChange={(page: number) => setDnsPage(page)}
      ></MiniTable>
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
      <div className="mini-table">
        <PieChart
          className="pie"
          data={[
            ["Greypanel", 5],
            ["Cloudflare", 3],
            ["Quantil", 2],
            ["Alibaba Cloud", 3],
          ]}
          title="流量使用比"
        ></PieChart>
      </div>
      <div className="line-table">
        <div>带宽统计</div>
        <LineChart></LineChart>
      </div>
    </div>
  );
};

export default Home;

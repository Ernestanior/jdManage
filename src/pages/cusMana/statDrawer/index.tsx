import PieComp, { IPieData } from "@/pages/cusMana/statDrawer/pie";
import TimeFilter, { ETimeFilter, ITimeFilter } from "@/components/timeFilter";
import { Drawer } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import "./index.less";
import Flow from "./flow";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { dnsApi, statApi } from "@/store/api";
import { ICustomerSupplier } from "@/store/network/supplier/interface";
import { IDomainCount } from "@/store/network/dns/interface";
interface IProps {
  visible: boolean;
  onClose: () => void;
  customerUid: string;
  supSupplier: boolean;
}

const StatDrawer: FC<IProps> = ({
  visible,
  customerUid,
  onClose,
  supSupplier,
}) => {
  const loading = useLoading();
  const [domainCount, setDomainCount] = useState<IDomainCount>();
  const [statCusOverview, setStatCusOverview] = useState<any>();
  const [statCusSupplier, setstatCusSupplier] = useState<ICustomerSupplier[]>();
  const [timeFilter, setTimeFilter] = useState<ITimeFilter>({
    reportType: ETimeFilter.TODAY,
  });
  useEffect(() => {
    const obs = from(request(dnsApi.FindDomainCount(customerUid))).subscribe(
      (data) => {
        data && setDomainCount(data);
      }
    );
    return () => obs.unsubscribe();
  }, [customerUid]);
  useEffect(() => {
    const obs = from(
      request(statApi.StatCusOverview(customerUid, timeFilter))
    ).subscribe((data) => {
      data && setStatCusOverview(data);
    });
    return () => obs.unsubscribe();
  }, [timeFilter, customerUid]);
  useEffect(() => {
    const obs = from(request(statApi.StatCusSupplier(customerUid))).subscribe(
      (data) => {
        data && setstatCusSupplier(data);
      }
    );
    return () => obs.unsubscribe();
  }, [supSupplier, customerUid]);

  const pieData = useMemo(() => {
    const obj: IPieData = {};
    statCusSupplier && statCusSupplier.forEach((i) => (obj[i.name] = i.value));
    return obj;
  }, [statCusSupplier]);
  const flowData = useMemo(() => {
    return (
      statCusOverview && {
        bandwidth: statCusOverview.bandwidth,
        flow: statCusOverview.flow,
      }
    );
  }, [statCusOverview]);

  return (
    <Drawer
      title="数据统计"
      placement="left"
      onClose={onClose}
      visible={visible}
      width={800}
      closable={false}
      className="customer-management-statistic"
    >
      <section className="domain-count">
        <div>
          记录数：<span>{domainCount && domainCount.domainCount}</span>
        </div>
        <div>
          域名数：<span>{domainCount && domainCount.recordCount}</span>
        </div>
      </section>

      {statCusSupplier && (
        <section className="box">
          <Loading display={loading}></Loading>
          <div className="title">解析量</div>
          <PieComp data={pieData}></PieComp>
        </section>
      )}
      {flowData && (
        <section className="box">
          <Loading display={loading}></Loading>
          <div className="title">带宽统计</div>
          <TimeFilter value={timeFilter} onChange={setTimeFilter}></TimeFilter>
          <Flow data={flowData}></Flow>
        </section>
      )}
    </Drawer>
  );
};

export default StatDrawer;

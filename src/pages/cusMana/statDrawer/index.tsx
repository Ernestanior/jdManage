import { Btn } from "@/components/button";
import PieComp, { IPieData } from "@/pages/cusMana/statDrawer/pie";
import TimeFilter, { ETimeFilter, ITimeFilter } from "@/components/timeFilter";
import accountService from "@/store/network/account/service";
import { useDomainCount } from "@/store/network/dns";
import dnsService from "@/store/network/dns/service";
import { useStatCusOverview, useStatCusSupplier } from "@/store/network/stat";
import statService from "@/store/network/stat/service";
import userService from "@/store/network/user/service";
import { Drawer } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import "./index.less";
import Flow from "./flow";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
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
  const domainCount = useDomainCount();
  const statCusOverview = useStatCusOverview();
  const statCusSupplier = useStatCusSupplier();
  const [timeFilter, setTimeFilter] = useState<ITimeFilter>({
    reportType: ETimeFilter.TODAY,
  });
  useEffect(() => {
    dnsService.findDomainCount(customerUid);
  }, [customerUid]);
  useEffect(() => {
    statService.statCusOverview(customerUid, timeFilter);
  }, [timeFilter, customerUid]);
  useEffect(() => {
    supSupplier && statService.statCusSupplier(customerUid);
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

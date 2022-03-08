import useUid from "@/hooks/useUid";
import { FC, ReactElement, useEffect, useState } from "react";
import Flow from "@/components/charts/flow/flow";
import TableComp from "./table";
import Pie from "./pie";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import TimeFilter, { ETimeFilter, ITimeFilter } from "@/components/timeFilter";
import { from } from "rxjs";
import request from "@/store/request";
import { statApi } from "@/store/api";
const Index: FC = (): ReactElement => {
  const uid = useUid();
  // const currData = useStatSiteSupplier();
  const [currData, setCurrData] = useState<any>();
  const loading = useLoading();
  const [timeFilter, setTimeFilter] = useState<ITimeFilter>({
    reportType: ETimeFilter.CURRENT_MONTH,
  });
  useEffect(() => {
    if (uid && timeFilter) {
      const data: any = {
        uid,
        reportType: timeFilter.reportType,
      };
      if (data.reportType === ETimeFilter.CUSTOM && timeFilter.startDate) {
        data.startDate = timeFilter.startDate.format("YYYY/MM/DD");
      }
      if (data.reportType === ETimeFilter.CUSTOM && timeFilter.endDate) {
        data.endDate = timeFilter.endDate.format("YYYY/MM/DD");
      }
      const obs = from(request(statApi.StatSiteSupplier(data))).subscribe(
        (data) => {
          data && setCurrData(data);
        }
      );
      return () => obs.unsubscribe();
    }
  }, [uid, timeFilter]);
  return (
    <div>
      <TimeFilter value={timeFilter} onChange={setTimeFilter}></TimeFilter>
      <section
        style={{ position: "relative", minHeight: 300, marginBottom: 20 }}
      >
        <Loading display={loading}></Loading>
        <Pie data={currData && currData.table}></Pie>
        <Flow data={currData && currData.chart}></Flow>
      </section>
      <TableComp data={currData && currData.table}></TableComp>
    </div>
  );
};

export default Index;

import useUid from "@/hooks/useUid";
import { FC, ReactElement, useEffect, useState } from "react";
import Flow from "./flow";
import TableComp from "./table";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import TimeFilter, { ETimeFilter, ITimeFilter } from "@/components/timeFilter";
import { Select } from "antd";
import { useSiteSupplierList } from "@/store/network/supplier";
import SupplierService from "@/store/network/supplier/service";
import { from } from "rxjs";
import request from "@/store/request";
import { statApi } from "@/store/api";
const { Option } = Select;
const Index: FC = (): ReactElement => {
  const uid = useUid();
  const siteSupplier = useSiteSupplierList();

  const loading = useLoading();
  const [bandwidth, setBandwidth] = useState<any>();
  const [flow, setFlow] = useState<any>();
  const [suppliers, setSuppliers] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<ITimeFilter>({
    reportType: ETimeFilter.CURRENT_MONTH,
  });
  useEffect(() => {
    !siteSupplier && SupplierService.findSiteSupplier(uid);
  }, []);
  useEffect(() => {
    if (uid && timeFilter) {
      const data: any = {
        suppliers,
        reportType: timeFilter.reportType,
      };
      if (data.reportType === ETimeFilter.CUSTOM && timeFilter.startDate) {
        data.startDate = timeFilter.startDate.format("YYYY/MM/DD");
      }
      if (data.reportType === ETimeFilter.CUSTOM && timeFilter.endDate) {
        data.endDate = timeFilter.endDate.format("YYYY/MM/DD");
      }
      // statService.statSiteBandwidth(uid, data);
      // statService.statSiteFlow(uid, data);
      const obs1 = from(
        request(statApi.StatSiteBandwidth(uid, data))
      ).subscribe((data) => {
        data && setBandwidth(data);
      });
      const obs2 = from(request(statApi.StatSiteFlow(uid, data))).subscribe(
        (data) => {
          data && setFlow(data);
        }
      );
      return () => {
        obs1.unsubscribe();
        obs2.unsubscribe();
      };
    }
  }, [uid, timeFilter, suppliers]);
  return (
    <div
      style={{
        position: "relative",
        minHeight: 500,
      }}
    >
      <Loading display={loading}></Loading>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <section style={{ display: "flex", flexDirection: "column" }}>
          平台选择
          <Select
            mode="multiple"
            allowClear
            style={{ width: 200, marginTop: 10 }}
            onChange={(e) => setSuppliers(e)}
          >
            {siteSupplier &&
              siteSupplier.content &&
              siteSupplier.content.map((i: any) => (
                <Option value={i.code} key={i.code}>
                  {i.displayName}
                </Option>
              ))}
          </Select>
        </section>
        <TimeFilter value={timeFilter} onChange={setTimeFilter}></TimeFilter>
      </div>

      {bandwidth && flow && (
        <section>
          <Flow data={bandwidth.chart}></Flow>
          <TableComp bandwidth={bandwidth.table} flow={flow.table}></TableComp>
        </section>
      )}
    </div>
  );
};

export default Index;

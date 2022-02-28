import { useLoading } from "@/components/loading";
import TimeFilter, { ETimeFilter, ITimeFilter } from "@/components/timeFilter";
import { FC, useEffect, useState } from "react";
import Loading from "@/components/loading/context";
import Flow from "./flow";
import { IFlowType } from ".";
import { from } from "rxjs";
import request from "@/store/request";
import { statApi } from "@/store/api";

interface IProps {
  customerUid: string;
  type: string;
  title: string;
}

const FlowComp: FC<IProps> = ({ customerUid, title, type }) => {
  const [currData, setCurrData] = useState();
  const [key, setKey] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<ITimeFilter>({
    reportType: ETimeFilter.TODAY,
  });
  useEffect(() => {
    switch (type) {
      case IFlowType.CURRENT_MONTH:
        setKey("currentMonthFlowChart");
        from(request(statApi.StatTraControlCurrMonth(customerUid))).subscribe(
          (data) => {
            if (data) {
              setCurrData(data);
            }
          }
        );
        break;
      case IFlowType.CURRENT_DAY:
        setKey("currentMonthFlowChart");
        from(request(statApi.StatTraControlCurrDay(customerUid))).subscribe(
          (data) => {
            if (data) {
              setCurrData(data);
            }
          }
        );
        break;
      case IFlowType.LAST_HOUR:
        setKey("lastHourBandwidthChart");
        from(request(statApi.StatTraControlLastHour(customerUid))).subscribe(
          (data) => {
            if (data) {
              setCurrData(data);
            }
          }
        );
        break;
    }
  }, [timeFilter, type, customerUid]);
  return (
    <section className="box">
      <div className="title">{title}</div>
      <TimeFilter value={timeFilter} onChange={setTimeFilter}></TimeFilter>
      {/* <Flow data={currData && currData[key]}></Flow> */}
      后台问题，待开发...
    </section>
  );
};

export default FlowComp;

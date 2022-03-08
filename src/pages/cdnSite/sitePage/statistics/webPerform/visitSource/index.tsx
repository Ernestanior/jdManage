import useUid from "@/hooks/useUid";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import Map from "./map";
import TableComp from "./table";
import { useLoading } from "@/components/loading";
import TimeFilter, { ETimeFilter, ITimeFilter } from "@/components/timeFilter";
import { Button, Radio, TreeSelect } from "antd";
import { treeData } from "@/common/data/area_tree";
import IconFont from "@/components/icon";
import SearchDrawer from "./searchDrawer";
import ViewAllDrawer from "./viewAllDrawer";
import "./index.less";
import { IStatSiteOrigin } from "@/store/api/stat";
import { from } from "rxjs";
import request from "@/store/request";
import { statApi } from "@/store/api";
const GlobalData = treeData[2]["children"];
const ChinaData = treeData[1]["children"];
export interface ISiteOrigin {
  key: number;
  ip?: string;
  region: string;
  count: number;
}
interface IProps {}
const Index: FC<IProps> = ({}): ReactElement => {
  const uid = useUid();
  const [statSiteOrigin, setStatSiteOrigin] = useState<ISiteOrigin[]>([]);
  const loading = useLoading();
  const [timeFilter, setTimeFilter] = useState<ITimeFilter>({
    reportType: ETimeFilter.CURRENT_MONTH,
  });
  const [scope, setScope] = useState<string>("global");
  const [lines, setLines] = useState<string[]>([]);
  const [searchFlag, setSearchFlag] = useState<boolean>(false);
  const [viewAllFlag, setViewAllFlag] = useState<boolean>(false);
  const [params, setParams] = useState<IStatSiteOrigin>({
    lines: [],
    type: "region",
    scope: "global",
    size: 300,
    reportType: "currentMonth",
  });
  const lineData = useMemo(
    () => (scope === "global" ? GlobalData : ChinaData),
    [scope]
  );
  const [type, setType] = useState<"region" | "ip">("region");
  useEffect(() => {
    if (uid && timeFilter) {
      const data: any = {
        lines,
        type,
        scope,
        size: scope === "global" ? 300 : 50,
        reportType: timeFilter.reportType,
      };
      if (data.reportType === ETimeFilter.CUSTOM && timeFilter.startDate) {
        data.startDate = timeFilter.startDate.format("YYYY/MM/DD");
      }
      if (data.reportType === ETimeFilter.CUSTOM && timeFilter.endDate) {
        data.endDate = timeFilter.endDate.format("YYYY/MM/DD");
      }
      setParams(data);
      const obs = from(request(statApi.StatSiteOrigin(uid, data))).subscribe(
        (data) => {
          data && setStatSiteOrigin(data);
        }
      );
      return () => obs.unsubscribe();
    }
  }, [uid, timeFilter, scope, lines, type]);
  return (
    <div className="stat-platform">
      <section className="top">
        <Radio.Group
          onChange={(e) => {
            setLines([]);
            setScope(e.target.value);
          }}
          defaultValue="global"
          style={{ marginTop: 10, width: 200 }}
        >
          <Radio.Button value="global">全球</Radio.Button>
          <Radio.Button value="China">大陆</Radio.Button>
        </Radio.Group>
        <TimeFilter value={timeFilter} onChange={setTimeFilter}></TimeFilter>
      </section>
      <section className="middle">
        <section>
          地区选择
          <TreeSelect
            multiple
            style={{ width: 200, marginTop: 10 }}
            suffixIcon={
              <IconFont type="sanjiaoxing" style={{ fontSize: "12px" }} />
            }
            onChange={(e) => setLines(e)}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeNodeFilterProp="title"
            value={lines}
            treeData={lineData}
          ></TreeSelect>
        </section>
      </section>
      <Map
        data={statSiteOrigin}
        scope={scope === "global" ? "world" : "china"}
      ></Map>
      <Radio.Group
        onChange={(e) => {
          setType(e.target.value);
        }}
        defaultValue="region"
        style={{ marginTop: 10, width: 600, marginBottom: 20 }}
      >
        <Radio.Button value="region">访问来源区域统计</Radio.Button>
        <Radio.Button value="ip">访问来源IP统计</Radio.Button>
      </Radio.Group>
      <section className="table-title">
        <h4>访问量排名前十名</h4>
        {type === "ip" ? (
          <Button type="primary" onClick={() => setSearchFlag(true)}>
            按IP查询
          </Button>
        ) : (
          statSiteOrigin && (
            // statSiteOrigin.length > 10 && (
            <Button type="primary" onClick={() => setViewAllFlag(true)}>
              查看全部
            </Button>
          )
          // )
        )}
      </section>
      <TableComp
        data={statSiteOrigin}
        type={type}
        loading={loading}
      ></TableComp>
      <SearchDrawer
        visible={searchFlag}
        title="按IP查询"
        onClose={() => setSearchFlag(false)}
        params={params}
        uid={uid}
      ></SearchDrawer>
      {statSiteOrigin && (
        <ViewAllDrawer
          visible={viewAllFlag}
          title="查看全部访问来源区域"
          onClose={() => setViewAllFlag(false)}
          data={statSiteOrigin}
        ></ViewAllDrawer>
      )}
    </div>
  );
};

export default Index;

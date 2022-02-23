import { FC, useMemo } from "react";
import ChartMap from "@/components/charts/map/chartMap";
import { useLoading } from "@/components/loading";
import Loading from "@/components/loading/context";

interface IMap {
  region: string;
  value: number;
}
export interface IDataModule {
  data: IMap[] | null;
  scope: "world" | "china";
  type: "availability" | "responseTime" | "count";
}
export const colorPalette = [
  "#ef8979",
  "#344553",
  "#6F9FA7",
  "#C9866B",
  "#9DC5B0",
  "#7D9E85",
  "#C1883A",
  "#B9A39C",
  "#6F7074",
  "#57656F",
  "#C6CCD2",
];

const Map: FC<IDataModule> = ({ data, scope, type }) => {
  const loading = useLoading();

  const filteredData = useMemo(
    () => data && data.map((i: IMap) => ({ name: i.region, value: i.value })),
    [data]
  );
  console.log(filteredData);

  // const options = useMemo(
  //   () => !isEmptyObj(data),
  //   [data]
  // );

  // if (isEmptyObj(data)) {
  //   return null;
  // }
  // if (!options) {
  //   return null;
  // }
  return (
    <section style={{ position: "relative", minHeight: 300, marginBottom: 20 }}>
      {!loading && filteredData ? (
        <ChartMap
          mapData={filteredData}
          scope={scope}
          formatter={(value: number) => {
            switch (type) {
              case "availability":
                return (value * 100).toFixed(1) + " %";
              case "responseTime":
                return Math.round(value) + "s";
              case "count":
                return value.toString();
            }
          }}
          min={0}
          max={1}
        />
      ) : (
        <Loading display={true} zIndex={0}></Loading>
      )}
    </section>
  );
};

export default Map;

import { FC, useMemo } from "react";
import ChartMap from "@/components/charts/map/chartMap";
import { useLoading } from "@/components/loading";
import Loading from "@/components/loading/context";

interface IMap {
  region: string;
  count: number;
}
export interface IDataModule {
  data: IMap[] | null;
  scope: "world" | "china";
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

const Map: FC<IDataModule> = ({ data, scope }) => {
  const loading = useLoading();
  const filteredData = useMemo(
    () =>
      data instanceof Array &&
      data.map((i: IMap) => ({ name: i.region, value: i.count })),
    [data]
  );

  return (
    <section style={{ position: "relative", minHeight: 300, marginBottom: 20 }}>
      {!loading && filteredData ? (
        <ChartMap
          mapData={filteredData}
          scope={scope}
          formatter={(value: number) => value.toString()}
        />
      ) : (
        <Loading display={true} zIndex={0}></Loading>
      )}
    </section>
  );
};

export default Map;

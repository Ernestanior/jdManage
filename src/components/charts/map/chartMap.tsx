import React from "react";
import EMap from "./eMap";
import { getMapLanguage } from "@/locale";
// import { observer } from "mobx-react";
// import Spinner from "@/common/Spinner";
import Loading from "@/components/loading/context";
interface Data {
  name: string;
  value: number;
  // key: number;
}
interface IProps {
  mapData: Data[];
  scope: "china" | "world";
  formatter?: (value: number) => string;
  isLoading?: boolean;
  min?: number;
  max?: number;
  color?: string[];
}

const ChartMap = (props: IProps) => {
  const { mapData, scope, isLoading } = props;
  const data = mapData.filter((t) => t.value > 0);
  let max = 0,
    min = 0;
  data.map((v) => {
    max = max > v.value ? max : v.value;
    min = min < v.value ? min : v.value;
    return true;
  });
  console.log(isLoading);

  return (
    <div
      style={{
        height: "400px",
        width: "calc(100%)",
        position: "relative",
        left: "-20px",
        display: "block",
        paddingTop: 30,
      }}
    >
      <EMap
        option={{
          tooltip: {
            trigger: "item",
            formatter: (data: any) => {
              if (!isNaN(data.value)) {
                if (props.formatter) {
                  return data.name + ": " + props.formatter(data.value);
                }
                return data.name + ": " + data.value;
              }
            },
          },
          visualMap: {
            min: props.min || min,
            max: props.max || max || 100,
            realtime: false,
            calculable: true,
            inRange: {
              color: props.color || ["#fd4501", "#fdfe00", "#008001"],
            },
            bottom: 20,
            left: 40,
            text: ["high", "low"],
            formatter: props.formatter,
          },
          nameMap: scope,
          series: [
            {
              name: scope,
              type: "map",
              roam: false, // disable mouse zooming
              map: scope,
              itemStyle: {
                areaColor: "#eee",
                borderWidth: 1,
                borderColor: "#bdbdbd",
              },
              emphasis: {
                itemStyle: {
                  areaColor: "#ffffff",
                  label: { show: true },
                },
              },
              nameMap: getMapLanguage(scope),
              data: data.map((d) => {
                if (d.name === "Chinese Mainland")
                  return {
                    ...d,
                    name: "China",
                  };
                return d;
              }),
            },
          ],
        }}
      />
    </div>
  );
};

export default ChartMap;

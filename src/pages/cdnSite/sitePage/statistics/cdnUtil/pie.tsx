import { FC, useMemo } from "react";
import ReactECharts from "echarts-for-react";

import { colorPalette } from "@/components/charts/flow/flow";
interface IProps {
  data: any;
  // data: {[T:string]:{[R:string]:number}};
}

const PieComp: FC<IProps> = ({ data }) => {
  console.log(data);

  const pieData = useMemo(
    () =>
      data &&
      Object.keys(data).map((key, i) => ({
        key: i,
        displayName: key,
        name: key,
        value: data[key].avg,
        label: {
          fontSize: 18,
          color: "#434343",
          padding: [12, 24],
          borderRadius: 6,
        },
        emphasis: {
          itemStyle: {
            color: colorPalette[i] || colorPalette[colorPalette.length - i],
          },
        },
      })),
    [data]
  );
  const options = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}:  {d} %",
      },
      legend: {
        orient: "vertical",
        right: 100,
        top: 60,
        bottom: 20,
        itemWidth: 15,
        itemHeight: 10,
      },
      series: [createLabel("cdnUtil", pieData)],
    }),
    [pieData]
  );

  if (!data) {
    return null;
  }
  return <ReactECharts option={options} />;
};

export default PieComp;
const createLabel = (name: string, data: any[]) => {
  return {
    name,
    type: "pie",
    radius: ["35%", "80%"],
    center: ["45%", "50%"],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
    label: {
      formatter: "{d} %",
    },
    data,
  };
};

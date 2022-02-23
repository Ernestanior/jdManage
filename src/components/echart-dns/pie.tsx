import React, { useEffect, useRef } from "react";
import { EChartsOption } from "echarts";
import { CHART_COLOUR } from "@/common/utils/constants";
import * as echarts from "echarts";
const createOption = (
  data: Array<[string, number]>,
  title: string,
  formatter: (id: string) => string,
  loading: boolean
) => {
  const series = data.map((d) => ({ name: d[0], value: d[1] }));
  const isEmpty = !data.length && !loading;
  return {
    title: {
      text: isEmpty ? formatter("no.related.data.found") : formatter(title),
      x: "left",
      y: isEmpty ? "center" : undefined,
      show: true,
      textStyle: {
        color: "#000",
        fontSize: "17",
        fontWeight: "500",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 10,
      top: 80,
      bottom: 20,
      data: data.map((d) => d[0]),
    },
    color: CHART_COLOUR,
    series: [
      {
        name: formatter("stat.query"),
        type: "pie",
        radius: ["40%", "65%"],
        center: ["30%", "50%"],
        data: series,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
};

type Props = {
  className?: string;
  title: string;
  data: Array<[string, number]>;
  loading?: boolean;
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.loading === nextProps.loading
  );
};

const PieChart: React.FC<Props> = React.memo(
  ({ className, title, data, loading }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const current = ref.current;

      if (ref.current) {
        const echart = echarts.init(ref.current);
        echart.setOption(
          createOption(data, title, (id) => id, !!loading) as EChartsOption
        );
        if (loading)
          echart.showLoading("default", {
            text: "loading",
          });
        else echart.hideLoading();

        if (!data.length && !loading) {
        }
      }

      return () => {
        if (current) echarts.dispose(current);
      };
      // eslint-disable-next-line
    }, [data, loading]);

    return <div ref={ref} className={`${className}`}></div>;
  },
  areEqual
);

export default PieChart;

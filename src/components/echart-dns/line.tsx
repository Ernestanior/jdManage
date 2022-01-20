import React, { useEffect, useRef } from "react";
import { EChartsOption } from "echarts";
import * as echarts from "echarts";
import moment from "moment";

const noDataOption = {
  title: {
    text: "No data to display",
  },
  grid: {
    left: "3%",
    right: "45px",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "time",
    boundaryGap: false,
    splitLine: {
      show: true,
    },
    splitNumber: 20,
  },
  yAxis: {
    type: "value",
  },
  series: [],
};

const createOption = (
  data: any,
  formatter: (id: string) => string,
  options?: Options
) => {
  if (data.length === 0) return noDataOption;
  const { seriesOption, xAxis, yAxis, legend, toolbox, grid, tooltip } =
    options || {};
  return {
    ...noDataOption,
    xAxis: {
      ...noDataOption.xAxis,
      ...xAxis,
    },
    yAxis: {
      ...noDataOption.yAxis,
      ...yAxis,
    },
    title: {
      text: "",
    },
    legend: {
      orient: "horizontal",
      ...legend,
    },
    toolbox: {
      feature: {
        saveAsImage: {
          name: "query chart",
        },
      },
      ...toolbox,
    },
    tooltip: {
      trigger: "axis",
      formatter: (data: any) => {
        const d =
          data[0].data[2] === "d"
            ? moment(data[0].axisValue).format("YYYY-MM-DD")
            : moment(data[0].axisValue).format("YYYY-MM-DD HH:mm");
        let res = d + "<br/>";
        let val: string;
        for (let i = 0; i < data.length; i++) {
          val = data[i].value[1];
          res += data[i].marker + data[i].seriesName + ": " + val + "<br/>";
        }
        return res;
      },
      ...tooltip,
    },
    grid: {
      ...grid,
    },
    series: data.map((d: ChartData) => {
      const _data = Array.isArray(d.data)
        ? d.data.map((item) => {
            if (Array.isArray(item) && item.length === 2) {
              return [item[0], item[1] === 0 ? null : item[1]];
            }
            return item;
          })
        : d.data;
      return {
        name: formatter(d.name),
        type: "line",
        itemStyle: {
          color: "#5d9bd5",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#c4dcfb", // color at 0% position
              },
              {
                offset: 1,
                color: "white", // color at 100% position
              },
            ],
          },
        },
        data: _data,
        smooth: true,
        smoothMonotone: "x",
        ...seriesOption,
      };
    }),
  };
};

type ChartData = {
  data: Array<[string, number, string]> | any;
  name: string;
};

type Options = {
  xAxis?: any;
  yAxis?: any;
  seriesOption?: any;
  legend?: any;
  toolbox?: any;
  grid?: any;
  tooltip?: any;
};

type Props = {
  className?: string;
  data: ChartData[];
  loading?: boolean;
  options?: Options;
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.loading) === JSON.stringify(nextProps.loading)
  );
};

const LineChart: React.FC<Props> = React.memo(
  ({ className, data, loading, options }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const current = ref.current;

      if (ref.current) {
        const echart = echarts.init(ref.current);
        echart.setOption(
          createOption(data, (id) => id, options) as EChartsOption
        );
        if (loading) echart.showLoading("default", { text: "loading" });
        else echart.hideLoading();
      }

      return () => {
        if (current) echarts.dispose(current);
      };
      // eslint-disable-next-line
    }, [data, loading]);

    return <div ref={ref} className={className}></div>;
  },
  areEqual
);

export default LineChart;

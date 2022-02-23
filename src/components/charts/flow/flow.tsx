import { FC, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";
import { Col, Row } from "antd";
import { isEmptyObj } from "@/common/utils/helper";

export interface IDataModule<T = any> {
  data: T | null;
  type?: "availability" | "responseTime";
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

const Flow: FC<IDataModule> = ({ data, type }) => {
  const createOptions = (data: any) => {
    const series = Object.keys(data).map((key, i) => {
      const _data = Array.isArray(data[key])
        ? data[key].map((item: any) => {
            if (Array.isArray(item) && item.length === 2) {
              return [item[0], item[1] === 0 ? null : item[1]];
            }
            return item;
          })
        : data[key];
      return {
        name: key,
        type: "line",
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: `${colorPalette[i]}`,
        },
        lineStyle: {
          width: 1,
        },
        data: _data,
        markLine: {
          lineStyle: {
            type: "dotted",
            color: "#254985",
          },
          label: {
            show: true,
            position: "middle",
            formatter: (param: any) => param * 100 + " %",
          },
        },
      };
    });
    return {
      backgroundColor: "#FFF",
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          let show = "";
          let fms: any;
          if (params instanceof Array) {
            fms = params;
          } else {
            fms = [params];
          }
          let date = new Date(fms[0].data[0]);

          let min: string | number = date.getMinutes();
          if (min < 10) {
            min = "0" + min;
          }
          let hour: string | number = date.getHours();
          if (hour < 10) {
            hour = "0" + hour;
          }
          show +=
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            " " +
            hour +
            ":" +
            min +
            "<br>";

          fms.forEach((item: any) => {
            let vStr: string;
            let marker = item as { marker: string };
            let value = item.value as [number, number];
            vStr =
              type === "responseTime"
                ? Math.round(value[1]) + " ms"
                : (value[1] * 100).toFixed(2) + " %";
            show += marker.marker + "" + item.seriesName + ": " + vStr + "<br>";
          });
          return show;
        },
      },
      grid: {
        left: 30,
        right: 270,
        bottom: 30,
        top: 50,
        containLabel: true,
      },
      legend: {
        show: true,
        top: 60,
        right: 100,
        orient: "vertical",
        formatter: (name: string) => {
          return name;
        },
        tooltip: {
          show: true,
          formatter: ({ name }: { name: string }) => {
            return name;
          },
        },
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLabel: {
          rotate: 0,
        },
        splitNumber: 20,
        splitLine: {
          show: true,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (value: number) =>
            type === "responseTime"
              ? Math.round(value) + " ms"
              : (value * 100).toFixed(2) + " %",
        },
      },
      series: series,
    };
  };
  const options = useMemo(
    () => !isEmptyObj(data) && createOptions(data),
    [data]
  );

  if (isEmptyObj(data)) {
    return null;
  }
  if (!options) {
    return null;
  }
  return (
    <section>
      <ReactECharts
        style={{
          height: 400,
        }}
        option={options}
      />
    </section>
  );
};

export default Flow;

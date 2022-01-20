import React, { useRef } from "react";
import * as echarts from "echarts";

const option = {
  xAxis: {
    type: "category",
    data: [
      "1/11",
      "2/11",
      "3/11",
      "4/11",
      "5/11",
      "6/11",
      "7/11",
      "8/11",
      "9/11",
      "10/11",
      "11/11",
      "12/11",
      "13/11",
      "14/11",
      "15/11",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [
        8000, 11600, 13701, 12000, 14000, 12300, 10090, 17800, 12800, 14700,
        10700, 3200, 18000, 12500, 12300,
      ],
      type: "line",
      smooth: true,
    },
  ],
};
const Index = () => {
  const chartRef = useRef<any>();
  if (chartRef.current) {
    const myChart = echarts.init(chartRef.current);
    myChart.setOption(option);
  }

  return <div style={{ width: 800, height: 290 }} ref={chartRef}></div>;
};

export default Index;

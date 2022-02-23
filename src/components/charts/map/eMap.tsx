import React from "react";
// 引入 ECharts 主模块
import * as echarts from "echarts";
import WorldJson from "./json/world.json";
import ChinaJson from "./json/china.json";
echarts.registerMap("china", ChinaJson as any);
echarts.registerMap("world", WorldJson as any);

interface IEMapGeo {
  option: any;
  style?: React.CSSProperties;
}

class EMapGeo extends React.Component<IEMapGeo> {
  private el = React.createRef<HTMLDivElement>();
  private initedChart: echarts.ECharts = {} as echarts.ECharts;
  public componentDidMount() {
    if (this.el.current) {
      try {
        const myChart = echarts.init(this.el.current);
        myChart.setOption(this.props.option);
        this.initedChart = myChart;
      } catch (e) {
        console.error(e);
        return false;
      }
      return true;
    }
    return true;
  }
  UNSAFE_componentWillReceiveProps(nextProps: IEMapGeo) {
    if (this.initedChart.setOption) {
      this.initedChart.setOption(nextProps.option);
    }
  }
  public render() {
    const style = this.props.style || {};
    return (
      <div
        ref={this.el}
        style={{
          height: "100%",
          background: "#fff",
          marginLeft: "20px",
          ...style,
        }}
      />
    );
  }
}

export default EMapGeo;

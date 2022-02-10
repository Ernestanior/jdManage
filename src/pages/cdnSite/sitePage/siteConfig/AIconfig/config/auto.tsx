import { IAiSetting } from "@/store/network/site/interface";
import { Col, Row, Select } from "antd";
import React, { FC, useEffect, useState } from "react";

const { Option } = Select;
const hourList = [1, 2, 3, 6, 12, 24];
const numberList = [1, 2, 3, 4, 5];
const percentList = [...Array(50)].map((_: any, index: number) => index + 1);
const speedList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const decisionWindowList = [
  { key: 5, value: "5 minutes" },
  { key: 15, value: "15 minutes" },
  { key: 30, value: "30 minutes" },
  { key: 60, value: "1 hour" },
  { key: 180, value: "3 hours" },
  { key: 360, value: "6 hours" },
  { key: 720, value: "12 hours" },
  { key: 1440, value: "24 hours" },
];

interface IProps {
  onSubmit: Function;
  currAiSetting: IAiSetting;
  cancelFlag: boolean;
  testResult: any[];
}
const Auto: FC<IProps> = ({
  onSubmit,
  currAiSetting,
  cancelFlag,
  testResult,
}) => {
  const [mode, setMode] = useState<string>("availability");
  const [adjustmentWindow, setAdjustmentWindow] = useState<number>(12);
  const [adjustmentThreshold, setAdjustmentThreshold] = useState<number>(1);
  const [tolerance, setTolerance] = useState<number>(50);
  const [decisionWindow, setDecisionWindow] = useState<number>(5);
  useEffect(() => {
    if (currAiSetting) {
      setMode(
        currAiSetting.mode === "availability" || currAiSetting.mode === "speed"
          ? currAiSetting.mode
          : "availability"
      );
      setAdjustmentWindow(currAiSetting.adjustmentWindow || 12);
      setAdjustmentThreshold(currAiSetting.adjustmentThreshold || 1);
      setDecisionWindow(currAiSetting.decisionWindow || 5);
      setTolerance(currAiSetting.tolerance || 50);
    }
  }, [currAiSetting, cancelFlag]);
  useEffect(() => {
    onSubmit({
      ...currAiSetting,
      mode,
      adjustmentWindow,
      adjustmentThreshold,
      tolerance,
      decisionWindow,
      supplierUid: "",
    });
  }, [mode, adjustmentWindow, adjustmentThreshold, tolerance, decisionWindow]);
  return (
    <div className="ai-auto">
      <Row align="middle" style={{ marginBottom: "20px" }}>
        <Col span={4}>AI策略选择</Col>
        <Col>
          <Select
            value={mode}
            style={{ width: 120 }}
            onChange={(mode: string) => {
              setMode(mode);
              setTolerance(50);
            }}
          >
            <Option value="availability">availability</Option>
            <Option value="speed">speed</Option>
          </Select>
        </Col>
      </Row>
      <Row align="middle" style={{ marginBottom: "20px" }}>
        1. 自动切换参数控制:
        <Select
          value={adjustmentWindow}
          onChange={(adjustmentWindow: number) =>
            setAdjustmentWindow(adjustmentWindow)
          }
        >
          {hourList.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
        （小时)内，可切换
        <Select
          value={adjustmentThreshold}
          onChange={(adjustmentThreshold: number) =>
            setAdjustmentThreshold(adjustmentThreshold)
          }
        >
          {numberList.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
        次；
      </Row>
      {mode === "speed" ? (
        <Row align="middle" style={{ marginBottom: "20px" }}>
          2. 响应时间差值：小于
          <Select
            value={tolerance}
            style={{ width: 80 }}
            onChange={(tolerance: number) => setTolerance(tolerance)}
          >
            {speedList.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          ms时，不进行切换；
        </Row>
      ) : (
        <Row align="middle" style={{ marginBottom: "20px" }}>
          2. 可用率比较：小于
          <Select
            defaultValue={20}
            value={tolerance}
            style={{ width: 80 }}
            onChange={(tolerance: number) => setTolerance(tolerance)}
          >
            {percentList.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          %时，不进行切换；
        </Row>
      )}

      <Row align="middle" style={{ marginBottom: "20px" }}>
        3. 根据最近
        <Select
          value={decisionWindow}
          style={{ width: 120 }}
          onChange={(decisionWindow: number) =>
            setDecisionWindow(decisionWindow)
          }
        >
          {decisionWindowList.map((item) => (
            <Option value={item.key} key={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        内的平均{mode === "speed" ? "响应速度" : "可用率"}进行判断。
      </Row>
      {!!testResult.length && (
        <Row align="middle" style={{ marginBottom: "20px" }}>
          <Col span={4}>测试结果</Col>
          <Col>
            根据当前配置和数据测试，切换的平台服务为{JSON.stringify(testResult)}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Auto;

// import "./index.less";
import { FC, useEffect, useState } from "react";
import { Drawer, Row, Select } from "antd";
import { Btn } from "@/components/button";

import { useLoading } from "@/components/loading";

import {
  decisionWindowList,
  hourList,
  numberList,
  percentList,
  speedList,
} from "../../../../../../common/data/area_tree";

interface IProps {
  visible: boolean;
  onClose: () => void;
  onOk: (e: any) => void;
  editId: number;
  currData: any;
}
const { Option } = Select;
const EditDrawer: FC<IProps> = ({
  visible,
  onClose,
  onOk,
  editId,
  currData,
}) => {
  const loading = useLoading();
  console.log(currData);
  // console.log(editId);
  const [mode, setMode] = useState<string>("availability");
  const [adjustmentWindow, setAdjustmentWindow] = useState<number>(12);
  const [adjustmentThreshold, setAdjustmentThreshold] = useState<number>(1);
  const [tolerance, setTolerance] = useState<number>(50);
  const [decisionWindow, setDecisionWindow] = useState<number>(5);

  useEffect(() => {
    if (currData && editId !== -1) {
      setMode(
        currData[editId].mode === "availability" ||
          currData[editId].mode === "speed"
          ? currData[editId].mode
          : "availability"
      );
      setAdjustmentWindow(currData[editId].adjustmentWindow || 12);
      setAdjustmentThreshold(currData[editId].adjustmentThreshold || 1);
      setDecisionWindow(currData[editId].decisionWindow || 5);
      setTolerance(currData[editId].tolerance || 50);
    }
  }, [currData, editId, visible]);
  const onConfirm = () => {
    const newData = [...currData];
    newData[editId] = {
      ...newData[editId],
      adjustmentWindow,
      adjustmentThreshold,
      tolerance,
      decisionWindow,
      supplierUid: "",
    };
    onOk(newData);
    onClose();
  };
  return (
    <Drawer
      title={mode === "speed" ? "速度配置" : "可用率配置"}
      width={720}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
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
      <div
        style={{
          width: "150px",
          display: "flex",
          marginTop: "50px",
          justifyContent: "space-between",
        }}
      >
        <Btn type="primary" onClick={onConfirm} boxShadow disabled={loading}>
          确定
        </Btn>
        <Btn boxShadow onClick={() => onClose()} disabled={loading}>
          取消
        </Btn>
      </div>
    </Drawer>
  );
};
export default EditDrawer;

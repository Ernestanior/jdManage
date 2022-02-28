import { Drawer } from "antd";
import { FC } from "react";
import FlowComp from "./flowComp";
import "./index.less";

interface IProps {
  visible: boolean;
  onClose: () => void;
  customerUid: string;
}
export enum IFlowType {
  CURRENT_MONTH = "currentMonth",
  CURRENT_DAY = "currentDay",
  LAST_HOUR = "lastHour",
}
const InterDataDrawer: FC<IProps> = ({ visible, customerUid, onClose }) => {
  return (
    <Drawer
      title="内部数据"
      placement="left"
      onClose={onClose}
      visible={visible}
      width={800}
      closable={false}
      className="customer-management-statistic"
    >
      <FlowComp
        customerUid={customerUid}
        type={IFlowType.CURRENT_MONTH}
        title="当月安全流量"
      ></FlowComp>
      <FlowComp
        customerUid={customerUid}
        type={IFlowType.CURRENT_DAY}
        title="当日安全流量"
      ></FlowComp>
      <FlowComp
        customerUid={customerUid}
        type={IFlowType.LAST_HOUR}
        title="最近一小时安全带宽"
      ></FlowComp>
    </Drawer>
  );
};

export default InterDataDrawer;

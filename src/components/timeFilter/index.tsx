import { FC, useCallback, useState } from "react";
import { Button, Col, DatePicker, Row, Space, Tabs } from "antd";
import moment from "moment";
import "./index.less";

/**
 * 时间筛选
 */
export enum ETimeFilter {
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST7DAY = "last7day",
  LAST30DAY = "last30day",
  CURRENT_MONTH = "currentMonth",
  CUSTOM = "custom",
}

export interface ITimeFilter {
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  reportType: ETimeFilter;
}

export interface ITimeFilterModule {
  timeFilter?: ITimeFilter;
}
export interface IFormComponent<T = any> {
  value?: T;
  onChange?: IChangeModule;
  disable?: boolean;
}
export type IChangeModule = (value: any, totalSelectConfig?: any) => void;

const { RangePicker } = DatePicker;

const { TabPane } = Tabs;

const TimeFilter: FC<IFormComponent<ITimeFilter>> = ({ value, onChange }) => {
  const [displayTime, setDisplayTime] = useState<ETimeFilter | null>(null);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const handleChange = useCallback(
    (e) => {
      if (e === ETimeFilter.CUSTOM) {
        if (displayTime !== ETimeFilter.CUSTOM) {
          setDisplayTime(ETimeFilter.CUSTOM);
        }
        return;
      } else {
        if (value && value.reportType !== e) {
          onChange &&
            onChange({
              reportType: e,
            });
          setDisplayTime(null);
          return;
        }
      }
    },
    [onChange, value, displayTime]
  );

  const submitCustomTime = useCallback(() => {
    onChange &&
      onChange({
        reportType: ETimeFilter.CUSTOM,
        startDate,
        endDate,
      });
  }, [startDate, endDate, onChange]);

  return (
    <section className="time-filter">
      <Row gutter={30} align="middle">
        <Col flex={1}></Col>
        <Col>
          <Tabs
            onChange={handleChange}
            defaultActiveKey={ETimeFilter.CURRENT_MONTH}
            activeKey={displayTime || (value && value.reportType)}
          >
            <TabPane tab="今日" key={ETimeFilter.TODAY} />
            <TabPane tab="昨日" key={ETimeFilter.YESTERDAY} />
            <TabPane tab="最近七天" key={ETimeFilter.LAST7DAY} />
            <TabPane tab="最近30天" key={ETimeFilter.LAST30DAY} />
            <TabPane tab="当月" key={ETimeFilter.CURRENT_MONTH} />
            <TabPane tab="自定义" key={ETimeFilter.CUSTOM} />
          </Tabs>
        </Col>
        <Col hidden={displayTime !== ETimeFilter.CUSTOM}>
          <Space>
            <RangePicker
              value={[startDate, endDate]}
              onChange={(values) => {
                if (Array.isArray(values)) {
                  setStartDate(values[0] || startDate);
                  setEndDate(values[1] || endDate);
                }
              }}
              disabledDate={(time) => time.isAfter(moment())}
            />
            <Button type="primary" onClick={submitCustomTime}>
              提交
            </Button>
          </Space>
        </Col>
      </Row>
    </section>
  );
};

export default TimeFilter;

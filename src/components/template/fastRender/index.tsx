import React from "react";
import { XOR } from "ts-xor";
import { Form, Input, DatePicker, Row, Col } from "antd";
import SelectP from "../select";
import { ISelectItem, ISelectOptionConfig, IMap } from "../interface";
import "./index.less";
// import { AsyncSelect } from "@/common/async/select";
// import IntlDep from "@/common/intl";
// import FormItem from "../form/item";
// import FormCheckBox from "../formComponents/checkbox";

const { RangePicker } = DatePicker;

export const fastRender = (config: IRenderConfig, size?: any) => {
  if (
    ![
      "input",
      "textArea",
      "checkBox",
      "checkButton",
      "select",
      "datepicker",
      "timer",
      "singleTimer",
      "select-async",
    ].includes(config.type)
  ) {
    return null;
  }
  let el = null;
  switch (config.type) {
    case "input":
      el = <Input size={size} placeholder={config.placeholder} />;
      break;
    case "select":
      el = (
        <SelectP
          size={size}
          emptyOption
          placeholder={config.placeholder}
          data={config.data}
          // listCacheID={config.listCacheID}
          config={config.config}
          enableIntl
        />
      );
      break;
    // case "select-async":
    //   el = (
    //     <AsyncSelect
    //       listCacheID={config.listCacheID}
    //       size={size}
    //       emptyOption
    //       placeholder={config.placeholder}
    //       queryConfig={config.queryConfig}
    //       config={config.config}
    //     />
    //   );
    //   break;

    case "timer":
      el = <RangePicker showTime={config.showTime === true} size={size} />;
      break;
    case "singleTimer":
      el = <DatePicker showTime />;
      break;
    case "textArea":
      el = (
        <Input.TextArea
          placeholder={config.placeholder}
          rows={config.rows || 2}
        />
      );
      break;
    case "datepicker":
      el = <DatePicker format="YYYY-MM-DD" />;
      break;
    default:
      el = <Input type="checkbox" />;
  }

  // nodeName 在dom中是一个不可修改属性名
  const name = config.name === "nodeName" ? "nodename" : config.name;

  const result = (
    <Form.Item
      key={name}
      name={name}
      hidden={config.hide}
      className="fast-render-item"
      // label={
      //   !!config.text && <IntlDep id={config.text} values={config.textValue} />
      // }
      label={config.text}
    >
      {el}
    </Form.Item>
  );

  // 精确搜索
  // if (config.exactKey) {
  //   return (
  //     <Row gutter={40} key={config.name} align="middle">
  //       <Col span={16}>{result}</Col>
  //       <Col
  //         span={8}
  //         style={{
  //           paddingTop: 8,
  //         }}
  //       >
  //         <Form.Item noStyle name={config.exactKey}>
  //           <FormCheckBox>
  //             {/* <IntlDep id="PRECISE_SEARCH" /> */}
  //             precise search
  //           </FormCheckBox>
  //         </Form.Item>
  //       </Col>
  //     </Row>
  //   );
  // }
  return result;
};

interface IBasic {
  /** 属性key, 表单提交属性 */
  name: string;
  /** 属性文案 */
  text?: string;
  /** 属性附加 */
  textValue?: IMap;
  /** 默认值 */
  defaultValue?: string | number;
  /** 隐藏域 */
  hide?: boolean;
  /** 精确选择部分 */
  exactKey?: string;
}

/**
 * 输入框
 */
interface IInput {
  type: "input";
  /** 数字 */
  number?: boolean;
  placeholder?: string;
}

interface ITextArea {
  type: "textArea";
  rows?: number;
  placeholder?: string;
}

type IItem1 = XOR<IInput, ITextArea>;

/**
 * checkbox
 */
interface ICheckBox {
  type: "checkBox";
}
/**
 * Datepicker
 */
interface IDatePicker {
  type: "datepicker";
}

type IItem2 = XOR<IItem1, ICheckBox>;

/**
 * 按钮
 */
interface ICheckButton {
  type: "checkButton";
}
type IItem3 = XOR<IItem2, ICheckButton>;

/**
 * 下拉框
 */
interface ISelectorSync {
  type: "select";
  data: ISelectItem[] | string[] | object[];
  // listCacheID: string;
  config?: ISelectOptionConfig;
}

// interface ISelectorAsync {
//   listCacheID: string;
//   type: "select-async";
//   queryConfig: (params: any, body: any) => any;
//   config?: ISelectOptionConfig;
// }

type ISelector = ISelectorSync;
// type ISelector = XOR<ISelectorSync, ISelectorAsync>;

type IItem4 = XOR<IItem3, ISelector>;

interface ITimer {
  type: "timer";
  showTime?: boolean | null;
}

interface ISingleTimer {
  type: "singleTimer";
}

type IItem5 = XOR<IItem4, ITimer>;
type Item6 = XOR<IItem5, ISingleTimer>;
type IItem7 = XOR<Item6, IDatePicker>;

/**
 * 高级搜索配置
 */
export type IRenderConfig = IItem7 & IBasic;

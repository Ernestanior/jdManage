import React, { FC, useMemo } from "react";
import { Select } from "antd";
import { ICallback, ISelectItem, ISelectOptionConfig } from "../interface";
// import { FormattedMessage } from "react-intl";
import { upperCasePlx } from "../utils";
interface IProps {
  data: ISelectItem[] | string[] | number[];
  size?: "small";
  onChange?: ICallback<any>;
  placeholder?: string;
  /** 空白选项 */
  emptyOption?: boolean;
  /** 页面级别缓存数据ID */
  listCacheID?: string;
  /** 下拉列表的展示和提交配置 */
  config?: ISelectOptionConfig;
  /** 默认值 */
  defaultValue?: any;
  /** 样式 */
  style?: React.CSSProperties;
  /** 开启翻译 */
  enableIntl?: boolean;
  /** 禁用 */
  disabled?: boolean;
}

/**
 *
 * @param props
 */
const SelectP: FC<IProps & { value?: any }> = (props) => {
  const { listCacheID, emptyOption, config, enableIntl, ...resProps } = props;
  const idKey = useMemo(() => {
    if (props.config) {
      return props.config.idKey;
    }
    return "uid";
  }, [props]);

  const textKey = useMemo(() => {
    if (props.config) {
      return props.config.textKey;
    }
    return "name";
  }, [props]);

  // 默认值
  let defaultValue;
  if (typeof props.defaultValue === "undefined") {
    if (emptyOption) {
      defaultValue = "";
    }
  }
  const dataList: any = props.data;
  if (!Array.isArray(dataList)) {
    console.error("出现非数组下拉选项渲染");
  }
  return (
    <Select
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      defaultValue={defaultValue}
      {...resProps}
      showSearch={props.data.length > 8}
      optionFilterProp="label"
    >
      {emptyOption && (
        <Select.Option value="" label="">
          ----
        </Select.Option>
      )}
      {dataList.map((item: any) => {
        if (typeof item === "number" || typeof item === "string") {
          return (
            <Select.Option key={item} value={item} label={upperCasePlx(item)}>
              {upperCasePlx(item)}
            </Select.Option>
          );
        }
        // 特殊情况
        let text = item[textKey];
        // let text = !!enableIntl ? <FormattedMessage id={item[textKey]} /> : item[textKey]
        // if(text === "custom"){
        //   text = <FormattedMessage id="OPT_CUSTOM" />
        // }
        return (
          <Select.Option
            key={item[idKey]}
            value={item[idKey]}
            label={item[textKey]}
          >
            {text}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default SelectP;

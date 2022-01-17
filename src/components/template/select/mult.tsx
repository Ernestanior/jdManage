import React, { FC, useCallback, useMemo } from "react";
import { Checkbox, Col, Row } from "antd";
import { FormattedMessage } from "react-intl";
import { IMultSelectProps } from "../interface";
// import IntlDep from "../intl";
import "./mult.less";
// import messageService from "@/store/messages";
// import IconTip from "@/common/icon/tip";

const CheckboxGroup = Checkbox.Group;

/**
 *
 * @param props
 * @param data 默认是id和name
 */
const MultipleSelectP: FC<IMultSelectProps> = (props) => {
  const {
    config,
    onChange,
    value,
    style,
    enableIntl = true,
    data = [],
    tipId,
  } = props;

  const idKey = useMemo(() => {
    if (config) {
      return config.idKey;
    }
    return "id";
  }, [config]);

  const textKey = useMemo(() => {
    if (config) {
      return config.textKey;
    }
    return "name";
  }, [config]);

  const optionList = useMemo(() => {
    const optList: Option[] = [];
    data.forEach((it) => {
      if (typeof it === "string") {
        optList.push({
          label: it.toUpperCase(),
          value: it,
        });
      } else {
        optList.push({
          label: enableIntl ? (
            <FormattedMessage id={it[textKey]} />
          ) : (
            it[textKey]
          ),
          value: it[idKey],
        });
      }
    });
    return optList;
  }, [data, idKey, textKey, enableIntl]);

  const allIds = useMemo(() => {
    return optionList.map((t) => t.value);
  }, [optionList]);

  const selectedIds = useMemo(() => {
    return value || [];
  }, [value]);

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
    },
    [onChange]
  );

  const indeterminate = useMemo(() => {
    return selectedIds.length !== 0 && selectedIds.length < optionList.length;
  }, [optionList, selectedIds]);

  const checkAll = optionList.length === selectedIds.length;

  const onCheckAllChange = useCallback(() => {
    const targetValue = checkAll ? [] : allIds;
    onChange && onChange(targetValue);
  }, [checkAll, allIds, onChange]);

  // const tipEvent = useCallback(() => {
  //     if(!tipId){
  //         return;
  //     }
  //     messageService.sendMessage(tipId);
  // }, [tipId])

  if (props.layout === "horizontal") {
    return (
      <section className="comp-multiple-select" style={style}>
        <Row>
          <Col span={5}>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              {/* <IntlDep id="SELECT_ALL" /> */}
              select all
            </Checkbox>
            {/* {tipId && <IconTip onClick={tipEvent} />} */}
          </Col>
          <Col span={19} style={{ transform: "translate(-20px, 0)" }}>
            <CheckboxGroup
              options={optionList}
              value={selectedIds}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </section>
    );
  }

  return (
    <section className="comp-multiple-select" style={style}>
      <div>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          select all
          {/* <IntlDep id="SELECT_ALL" /> */}
        </Checkbox>
        {/* {tipId && <IconTip onClick={tipEvent} />} */}
      </div>
      <div>
        <CheckboxGroup
          options={optionList}
          value={selectedIds}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default MultipleSelectP;

interface Option {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

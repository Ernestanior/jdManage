import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IFormComponent, ISelectOptionConfig } from "../interface";
import { Checkbox } from "antd";
// import IntlDep from "@/common/intl";
import "./mult.less";

const CheckboxGroup = Checkbox.Group;

/**
 *
 * @param value
 * @param onChange
 * @param config
 * @constructor
 * @valueType Array<{id: number, name: string, checked: boolean}>
 */
const CheckBoxList: FC<IFormComponent & { config?: ISelectOptionConfig }> = ({
  value,
  onChange,
  config,
}) => {
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

  const [optionList, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (optionList.length < 1) {
      const optList: Option[] = [];
      value.forEach((it: any) => {
        optList.push({
          label: it[textKey],
          value: it[idKey],
        });
      });
      setOptions(optList);
    }
  }, [optionList, idKey, textKey, value]);

  const allIds = useMemo(() => {
    return optionList.map((t) => t.value);
  }, [optionList]);

  const selectedIds = useMemo(() => {
    if (!Array.isArray(value)) {
      return [];
    }
    const _selectedIds: number[] = [];
    value.forEach((it: any) => {
      if (it.checked) {
        _selectedIds.push(it.id);
      }
    });
    return _selectedIds;
  }, [value]);

  const handleChange = useCallback(
    (e) => {
      const _targetList: any[] = [];
      optionList.forEach((it: any) => {
        _targetList.push({
          id: it.value,
          name: it.label,
          checked: Array.isArray(e) ? e.includes(it.value) : false,
        });
      });
      onChange && onChange(_targetList);
    },
    [onChange, optionList]
  );

  const indeterminate = useMemo(() => {
    return selectedIds.length !== 0 && selectedIds.length < optionList.length;
  }, [optionList, selectedIds]);

  const checkAll = optionList.length === selectedIds.length;

  const onCheckAllChange = useCallback(() => {
    const targetValue = checkAll ? [] : allIds;
    handleChange(targetValue);
  }, [checkAll, allIds, handleChange]);

  return (
    <section className="comp-multiple-select">
      <div>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          {/* <IntlDep id="SELECT_ALL" /> */}
          select all
        </Checkbox>
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

export default CheckBoxList;

interface Option {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

import useBehaviorSubject from "../../hooks/useBehaviorSubject";
import { useMemo, useRef, useEffect } from "react";
import styleService, { Style, ISizeType } from "./service";

/** 组件的size */
export const useSize = () => {
  const info = useBehaviorSubject(styleService.size$);
  return info ? info : undefined;
};

export const useBtnSize = () => {
  const size = useSize();

  return size === "large" ? "large" : undefined;
};

/** 表格的size */
export const useTableSize = () => {
  const size = useSize();
  if (size === "small") {
    return "small";
  }
  if (size === "large") {
    return undefined;
  }
  return "middle";
};

export interface ITableSize {
  size: ISizeType;
  fixHeight?: number;
}

/**
 * 返回表格相关配置
 */
export const useTableStyleSize = (config?: ITableSize) => {
  const { current: configProps } = useRef(config);

  const _styleService = useMemo(() => {
    if (configProps) {
      return new Style(configProps.size, configProps.fixHeight);
    }
    return styleService;
  }, [configProps]);

  // 释放内存
  useEffect(() => {
    if (configProps) {
      window.addEventListener("resize", _styleService.recompute);
      return () => {
        window.removeEventListener("resize", _styleService.recompute);
      };
    }
  }, [configProps, _styleService]);

  // 字段大小
  const size = useBehaviorSubject(_styleService.size$);

  return [size, size, _styleService.total] as [ISizeType, ISizeType, number];
};

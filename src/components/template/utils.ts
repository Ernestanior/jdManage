import {
  IUserSubType,
  IUserType,
  ETimeFilter,
  IMessageModule,
  IPagePackage,
  ITagEnum,
  IMap,
  IMapT,
  IMenu,
} from "./interface";
import { FC } from "react";
import { dateFomatter } from "./utilsx";
import moment from "moment";

/**
 * 给菜单附加基本路径
 * @param menus
 * @param baseName
 */
export function compilMenu(menus: IMenu[], baseName: string): any[] {
  return menus.map((menu) => {
    if (!menu.childs) {
      return {
        ...menu,
        url: `/${baseName}/${menu.url}`,
      };
    }
    return {
      ...menu,
      childs: compilMenu(menu.childs, baseName),
    };
  });
}

export function filterMenuByAuth(
  menus: IMenu[],
  auth: IUserType,
  subAuth: IUserSubType
): any[] {
  const newMenus: any[] = [];
  menus.forEach((menu) => {
    if (!menu.childs) {
      if (menu.role) {
        // 当前用户出现role中
        if (menu.role.includes(auth)) {
          // 有子帐号类型限制
          if (menu.subRole && !menu.subRole.includes(subAuth)) {
            return;
          }
          newMenus.push(menu);
          return;
        }
        if (!menu.disableAdmin && auth === IUserType.ADMIN) {
          newMenus.push(menu);
          return;
        }
      } else {
        newMenus.push(menu);
      }
    }
    if (menu.childs) {
      const _menu = { ...menu };
      const newChilds = filterMenuByAuth(_menu.childs, auth, subAuth);
      if (newChilds.length > 0) {
        _menu.childs = newChilds;
        newMenus.push(_menu);
      }
    }
  });
  return newMenus;
}

/**
 * 将页面和路由绑定
 * @param JSX 组件元素
 * @param url 路径
 */
export const pagePack = <T extends FC>(JSX: T, url: string) =>
  ({
    JSX,
    url,
  } as IPagePackage);

/**
 * 合并参数
 * @param config 默认条件
 * @param params 当前参数
 */
export const mixConfig = (config: any, params: any) => {
  return { ...config, ...params };
};

/**
 * 运行状态
 * @param value 运行结果
 */
export const getStatusProps = (value: -1 | 0 | 1, map: ITagEnum[]) => {
  const result = map.find((item) => item.id === value);
  return result;
};

/**
 * -修改对象的特定属性名
 * -反向转换时还原属性名
 * @param data 被转换的值
 * @param map 属性转换表
 * @param reverse 反向转换
 * @description 处理非法属性名
 */
export const propertyReplace = (data: any, map: IMap, reverse = false) => {
  let _data: any = { ...data };
  for (const key in map) {
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      const _origin = reverse ? map[key] : key;
      const _target = reverse ? key : map[key];
      // 如果属性名和目标属性名不相同，需要交换
      if (_origin !== _target) {
        _data[_target] = _data[_origin];
        delete _data[_origin];
      }
    }
  }
  return _data;
};

/**
 * -将几个属性合并成一个新属性(删除原属性)
 * -反向转换时将属性值更新到原属性
 * @param data 原有对象
 * @param map 属性合并
 * @param reverse 反向转换
 * @description 为自定义组件新增属性
 * @notice 合并的属性名不能和原有属性名重合
 */
export const propertyMerge = (
  data: any,
  map: IMapT<string[]>,
  reverse = false
) => {
  let _data: any = { ...data };
  const needRemoveKey: any = {};
  for (const key in map) {
    if (!reverse) {
      const target: any = {};
      map[key].forEach((dataKey) => {
        target[dataKey] = data[dataKey];
        needRemoveKey[dataKey] = 1;
      });
      if (map[key].length > 0) {
        _data[key] = target;
      }
    } else {
      // 将属性值还原
      map[key].forEach((dataKey) => {
        _data[dataKey] = !!_data[key] ? _data[key][dataKey] : undefined;
      });
      if (map[key].length > 0) {
        needRemoveKey[key] = 1;
      }
    }
  }
  // 删除原有属性
  Object.keys(needRemoveKey).forEach((key) => {
    delete _data[key];
  });
  return _data;
};

/**
 * 从data中获取key属性
 * @param1 defalutValue
 * @param1 data
 * @param1 key
 * 返回值
 */
export const getProperty = (defalutValue: any, data: any, key?: string) => {
  if (!data || !key) {
    return defalutValue;
  }
  // 防止0被过滤
  const value =
    typeof data[key] === "number" ? data[key] : data[key] || defalutValue;
  return value;
};

/**
 * 复制属性
 * @param data
 * @param keys
 */
export const copyProperty = <T>(data: T, keys: Array<keyof T>) => {
  const t: any = {};
  keys.forEach((key) => {
    t[key] = data[key];
  });
  return t;
};

/**
 * 将下划线的变量名变成小驼峰命名
 * @param str
 */
export const UnderlineBecomeHump = (str: string) => {
  return str.replace(/_(\w)/g, (_: any, letter: string) => {
    return letter.toUpperCase();
  });
};

/**
 * 从data中抽取特定属性，并进行属性名转化
 * data: {a: 1000} + map:{a: "newa"} = {newa: 1000};
 * @param data
 * @param map
 */
export const mapProperty = (data: any, map?: IMapT<string | IMap>) => {
  if (!map || Object.keys(map).length === 0) {
    return data;
  }
  const t: any = {};
  Object.keys(map).forEach((key) => {
    const newKey = map[key];
    if (typeof newKey === "string") {
      t[newKey] = data[key];
    } else if (data[key]) {
      Object.keys(newKey).forEach((key2) => {
        t[newKey[key2]] = data[key][key2];
      });
    }
  });
  return t;
};

/**
 * 从data中获取key属性, 如果data或者key为空，则返回空字符串
 * @param defalutValue = ""
 * @param data
 * @param key
 */
export const getPropertyP = (data: any, key?: string) => {
  if (!data || !key) {
    return "";
  }
  // 防止0被过滤
  const value = typeof data[key] === "number" ? data[key] : data[key] || "";
  return value;
};

/**
 * react.reactElement 深度遍历查找指定元素的props
 * @param data React.ReactElement, 实际类型不验证，应为访问的是私有属性
 * @param elType 元素类型
 */
export const findElementPropsInNode = (data: any, elType: string) => {
  if (data.type === elType || (data.type && data.type.name === elType)) {
    return [data.props];
  }
  let list: any[] = [];
  if (Array.isArray(data.props.children)) {
    data.props.children.map((child: any) => {
      const znode = findElementPropsInNode(child, elType);
      list = list.concat(znode);
      return true;
    });
    return list;
  } else {
    return [];
  }
};

/**
 * 提交数据格式化,
 * @rule1 移除字符串前后空格
 * @rule2 移除string数组中空白元素
 * @param data
 */
export const formatterSubmitValue = (data: any) => {
  if (Array.isArray(data)) {
    const re = data.map(removeEmpty).filter((it) => !!it);
    return re;
  }
  return removeEmpty(data);
};

/**
 * 移除空值
 * @param value
 */
export const removeEmpty = (value: any) => {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number") {
    return value;
  }
  // null， undefined 移除
  return null;
};

/**
 * 加强版split，支持多个符号split,
 * @example splitPlus("a|1,4", ["|", ","]) => ["a", "1", "4"];
 * @param value 如果value为数组，则直接返回
 */
export const splitPlus = (
  value: string | undefined,
  tokenSeparators: string | string[]
) => {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value as string[];
  }
  let text = value;
  if (Array.isArray(tokenSeparators) && tokenSeparators.length > 1) {
    const onlyToken = tokenSeparators[0];
    tokenSeparators.forEach((token, idx) => {
      if (idx === 0) return;
      text = text.split(token).join(onlyToken);
    });
  }
  const splitToken =
    typeof tokenSeparators === "string" ? tokenSeparators : tokenSeparators[0];
  const baseArr = text.split(splitToken);
  return formatterSubmitValue(baseArr) as string[];
};

/**
 * 移除对象值为空的属性
 * @param a 一定不是空值
 */
export const removeEmptyObject = (a: any) => {
  if (!a) {
    return null;
  }
  if (typeof a !== "object") {
    return a;
  }
  let result: any = null;
  const keys = Object.keys(a);
  if (keys.length < 1) {
    return null;
  }
  keys.forEach((key) => {
    const value = removeEmptyObject(a[key]);
    if (value !== null) {
      if (!result) {
        result = {};
      }
      result[key] = value;
    }
  });
  return result;
};

export const xorCompare = (a: any, b: any) => {
  const _a = !!a ? 1 : 0;
  const _b = !!b ? 1 : 0;
  return _a ^ _b;
};

/**
 * 比对两个对象，数组，简单属性
 * @description 判断a中的所有属性都在b中存在，并且相等
 * true 表示两者属性相等,
 * @param a
 * @param b
 * @param properties
 */
export const compareA_B: <T>(
  a: T,
  b: T,
  properties?: Array<keyof T>
) => boolean = <T>(a: T, b: T, properties?: Array<keyof T>) => {
  if (a === b) {
    return true;
  }
  if (typeof a !== "object") {
    return `${a}` === `${b}`;
  }
  // a, b 有一个为空值
  if (xorCompare(a, b)) {
    const onlyOne = removeEmptyObject(a || b);
    return !onlyOne;
  }
  if (!a && !b) {
    return true;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    return a.every((at) => b.some((bt) => compareA_B(at, bt)));
  }
  const aProperties = Object.keys(a) as Array<keyof T>;
  const bProperties = Object.keys(b) as Array<keyof T>;

  // 保证两者至少都有一个属性
  if (aProperties.length * bProperties.length < 1) {
    return false;
  }
  // 普通对象
  const compareProperties: Array<keyof T> =
    properties ||
    (aProperties.length < bProperties.length ? aProperties : bProperties);
  // eslint-disable-next-line eqeqeq
  return compareProperties.every((key) => compareA_B(a[key], b[key]));
};

/**
 * "a,b,c,d" => "[a][b][c]"
 */
export const arrStrToBrackets = (
  str: string,
  tokenSeparators: string | string[] = ","
) => {
  const arr = splitPlus(str, tokenSeparators);
  return arr.map((t) => `[${t}]`).join("");
};

/**
 * "[a][b][c]" => [a, b, c]
 */
export const bracketsToArr = (arr: string[] | string, reverse = false) => {
  if (reverse) {
    if (Array.isArray(arr)) {
      return arr.map((t) => `[${t}]`).join("");
    }
    return "";
  }
  if (!reverse) {
    if (typeof arr === "string") {
      const _arr = arr.slice(1, arr.length - 1);
      return splitPlus(_arr, "][");
    }
    return [];
  }
};

/**
 * arr: [a, null, b] => a/b
 * [null, undefied, 0] => "-"
 * @param arr string[]
 * @param seperator string
 */
export const joinValue = (arr: string[], seperator = "/") => {
  const t = arr.filter((a) => !!a);
  return t.length > 0 ? t.join(seperator) : "-";
};

/**
 * 请求结果解析-
 * @return 仅返回是否成功
 * 支持reqService和reqServicePlx
 */
export const isReqSuccess = (res: any) => {
  // 根据支持reqService和reqServicePlx
  if (res.hasOwnProperty("isSuccess")) {
    return !!res.isSuccess;
  }
  return !!res;
};

/**
 * 请求结果解析-
 * @param 针对一定有返回值接口
 * @return 返回后台传输值
 * 支持reqService和reqServicePlx
 */
export const reqAnalysis = (res: any) => {
  // 根据支持reqService和reqServicePlx
  if (res.hasOwnProperty("isSuccess")) {
    return res.result || null;
  }
  return res;
};

/**
 * 将属性中的"10" -> 10
 */
export const transformStringToNumber = (data: IMapT<string | number>) => {
  const _data = { ...data };
  Object.keys(data).forEach((key) => {
    if (_data[key] === null) {
      delete _data[key];
    }
    let value = _data[key];
    if (typeof value === "string") {
      const zValue = parseInt(value);
      if (!isNaN(zValue)) {
        value = zValue;
      }
    }
    _data[key] = value;
  });
  return _data;
};

/**
 * 检测目标对象A中是否存在属性
 * 不存在则从源对象B中复制属性赋予A的属性
 */
export const checkProperty = (
  target: any,
  source: any,
  propertys: string[]
) => {
  const _target = { ...target };
  propertys.forEach((key) => {
    if (!_target.hasOwnProperty(key)) {
      if (source.hasOwnProperty(key)) {
        _target[key] = source[key];
      } else {
        _target[key] = null;
      }
    }
  });
  return _target;
};

const isMapObject = (obj: any) => {
  const haveClearType = [
    "string",
    "undefined",
    "boolean",
    "number",
    "bigint",
    "symbol",
    "function",
  ].includes(typeof obj);
  return !haveClearType && !Array.isArray(obj) && true;
};

/**
 * 自定义属性合并，处理非{}值
 */
export const mergeObject = (basicObj: any, addObj: any) => {
  const _obj1 = isMapObject(basicObj) ? basicObj : { basicObj };
  const _addObj = isMapObject(addObj) ? addObj : { addObj };
  return { ..._obj1, ..._addObj };
};

/**
 * 快速获取连续数字数组
 */
export const getNumberArray = (count: number, start = 0, step = 1) => {
  const res: number[] = [];
  for (let i = 0; i < count; i = i + step) {
    res.push(start + i);
  }
  return res;
};

/**
 * 字符串转大写
 */
export const upperCasePlx = (value: string | number) =>
  typeof value === "string" ? value.toUpperCase() : value;

/**
 * 时间格式化
 */
export const formatterDate = (value?: string) => {
  if (value) {
    return dateFomatter(value);
  }
  return "-";
};

/**
 * 时间筛选框, 将2010-01转换为后台识别的时间
 */
export const timeFilterFormatter = (value: any) => {
  const config: any = {};
  let reportType, startDate, endDate;
  if (typeof value === "string") {
    reportType = value;
  } else {
    reportType = value.reportType;
    startDate = value.startDate;
    endDate = value.endDate;
  }
  // 后台不识别的年月
  if (
    ![
      ETimeFilter.CURRENTMONTH,
      ETimeFilter.CUSTOM,
      ETimeFilter.LAST30DAY,
      ETimeFilter.LAST7DAY,
      ETimeFilter.TODAY,
      ETimeFilter.YESTERDAY,
    ].includes(reportType)
  ) {
    // 合理格式
    if (/^[0-9]{4}-[0-9]{2}$/.test(reportType)) {
      const [year, month] = reportType.split("-");
      if (year && month) {
        reportType = ETimeFilter.CUSTOM;
        startDate = dateFomatter(
          moment({
            year,
            month: month - 1,
          }).startOf("date")
        );
        // 截止日期
        endDate = dateFomatter(
          moment({
            year,
            month: month - 1,
          }).endOf("month")
        );
      }
    }
  }
  if (reportType) {
    config.reportType = reportType;
  }
  if (startDate) {
    config.startDate = startDate;
  }
  if (endDate) {
    config.endDate = endDate;
  }
  return config;
};

// 对数组进行数据抽象，获取key
export const generateKey = (data: any[], key: string) => {
  try {
    if (data.length > 0) {
      if (data[0] && typeof data[0][key] !== "undefined") {
        throw new Error("数组生成unikey失败");
      }
    }
    return data.map((item, index) => {
      return {
        ...item,
        [key]: index,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 全角转半角
export const ToCDB = (data: any) => {
  try {
    const _dataStr = JSON.stringify(data);
    let tmp = "";
    for (let i = 0; i < _dataStr.length; i++) {
      if (_dataStr.charCodeAt(i) === 12288) {
        tmp += String.fromCharCode(_dataStr.charCodeAt(i) - 12256);
        continue;
      }
      if (_dataStr.charCodeAt(i) > 65280 && _dataStr.charCodeAt(i) < 65375) {
        tmp += String.fromCharCode(_dataStr.charCodeAt(i) - 65248);
      } else {
        tmp += String.fromCharCode(_dataStr.charCodeAt(i));
      }
    }
    const _data = JSON.parse(tmp);
    return _data;
  } catch (error) {
    console.error("全角转换半角失败", error);
    return data;
  }
};

// 设置禁用提醒
export const setReqMessage = (config: any, addOnConfig: IMessageModule) => {
  config.__message = addOnConfig;
};

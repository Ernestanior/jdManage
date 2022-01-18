// 工具jsx版

// import messageService from "./store/messages";
// import EInfoType from "./store/messages/infoType";
// import reqServicePlx from "@/store/req/complex";
// import { AxiosRequestConfig } from "axios";
import moment from "moment";
// import React, {ReactNode} from "react";
// import { FormattedMessage } from "react-intl";
// import { forkJoin, from } from "rxjs";
import EllipsisTooltip from "./ellipsisTooltip";
// import { Tag } from "antd";
// import {
//   ICallback,
//   ISelectItem,
//   ISelectOptionConfig,
//   ITrigger,
// } from "./interface";
// import IntlDep from "./intl";
// import { IColumnsTypeP } from "./template/interface";
// import IconFont from "@/common/icon";

// export const confirmEvent = (event: ITrigger) => {
//   messageService.createMessage({
//     type: EInfoType.confirm_delete,
//   });
// };

// // 将后台需要的枚举值转换为前端展示值
// export const transformOptions = (options: ISelectItem[] | string[]) => {
//   const map: any = {};
//   options.forEach((option: any) => {
//     if (typeof option === "string") {
//       map[option] = option;
//     } else {
//       map[`${option.id}`] = option.name;
//     }
//   });
//   return (value: any) => {
//     if (!value && value !== 0) {
//       return "-";
//     }
//     if (typeof map[value] === "undefined") {
//       console.error("出现未知选项", value);
//       return value;
//     }
//     return <FormattedMessage id={map[`${value}`]} />;
//   };
// };

// /**
//  * 常用流程
//  * 请求接口-刷新列表
//  */
// export const modifyAndRefresh = (
//   config: AxiosRequestConfig,
//   listId: number,
//   cb?: ICallback<any>
// ) => {
//   from(reqServicePlx(config)).subscribe((res) => {
//     if (res.isSuccess) {
//       cb && cb(res.result);
//       messageService.reloadList(listId);
//     }
//   });
// };

// /**
//  * 常用流程
//  * 请求接口成功
//  * 支持多个接口
//  */
// export const reqAndRunCallback = (
//   config: AxiosRequestConfig | AxiosRequestConfig[],
//   cb?: ICallback<any>
// ) => {
//   if (Array.isArray(config)) {
//     forkJoin(config.map((conf) => reqServicePlx(conf))).subscribe((resList) => {
//       if (resList.every((res) => res.isSuccess)) {
//         const results = resList.map((res) => res.result);
//         cb && cb(results);
//       }
//     });
//   } else {
//     from(reqServicePlx(config)).subscribe((res) => {
//       if (res.isSuccess) {
//         cb && cb(res.result);
//       }
//     });
//   }
// };

// /**
//  * 从下拉选项读取相应的值，并根据select的展示规则输出text
//  */
// export const queryValueFromList = (
//   configs: Array<ISelectItem | string>,
//   value: any,
//   keyConfig?: ISelectOptionConfig
// ) => {
//   const idKey = keyConfig ? keyConfig.idKey : "id";
//   const textKey = keyConfig ? keyConfig.textKey : "name";
//   if (value !== "") {
//     const it = configs.find((config) => {
//       if (typeof config === "string") {
//         return config === value;
//       }
//       if (typeof config === "object") {
//         return config[idKey] === value;
//       }
//       return false;
//     });
//     if (typeof it === "string") {
//       return it.toUpperCase();
//     }
//     if (typeof it === "object") {
//       return it[textKey];
//     }
//     return null;
//   }
//   return null;
// };

// export const queryValueFromListRender = (
//   configs: Array<ISelectItem | string>
// ) => (value: any) => {
//   const text = queryValueFromList(configs, value);
//   if (text) {
//     return <FormattedMessage id={text} />;
//   }
//   return "";
// };

// /**
//  * 带宽转换
//  */
// export const transformBindWidth = (value: number) => {
//   if (value < 1000) {
//     return value.toFixed(2) + "bps";
//   }
//   const kb = value / 1000;
//   if (kb < 1000) {
//     return kb.toFixed(2) + "Kbps";
//   }
//   const mb = kb / 1000;
//   if (mb < 1000) {
//     return mb.toFixed(2) + "Mbps";
//   }
//   const gb = mb / 1000;
//   return gb.toFixed(2) + "Gbps";
// };

// export const transformFlow = (value: number) => {
//   if (value < 1000) {
//     return value.toFixed(2) + "B";
//   }
//   const kb = value / 1000;
//   if (kb < 1000) {
//     return kb.toFixed(2) + "KB";
//   }
//   const mb = kb / 1000;
//   if (mb < 1000) {
//     return mb.toFixed(2) + "MB";
//   }
//   const gb = mb / 1000;
//   return gb.toFixed(2) + "GB";
// };

// interface ITreeConfig<T> {
//   parentKeyItem: keyof T;
//   keyItem: keyof T;
//   render: (data: T) => React.ReactText;
// }

// /**
//  * 将list => treeData
//  * T  初始值列表
//  */
// export const transformListToTreeData = <T,>(
//   parentId: any,
//   values: T[],
//   config: ITreeConfig<T>
// ) => {
//   const { keyItem, parentKeyItem, render } = config;
//   const _values = values.filter((value) => value[parentKeyItem] === parentId);
//   return _values.map((value) => {
//     const _value: any = {
//       key: value[keyItem],
//       title: render(value),
//     };
//     const childs = transformListToTreeData(value[keyItem], values, config);
//     if (childs.length > 0) {
//       _value.children = childs;
//     }
//     return _value;
//   });
// };

/**
 *
 * @param time 传入的日期或时间
 * @param format 预期的转换格式,默认修改为YYYY/MM/DD格式
 */
export const dateFomatter = (time: any, format?: string) => {
  if (!time) {
    return "-";
  }
  try {
    const time_m = moment(time);
    if (time_m.isValid()) {
      if (format) {
        return time_m.format(format);
      } else {
        return time_m.format("YYYY/MM/DD");
      }
    } else {
      throw Error("时间格式有误！");
    }
  } catch (error) {
    // console.error(error);
    return `${time}`;
  }
};

// /**
//  *
//  * @param time 传入的日期或时间
//  * @param format 预期的转换格式,默认修改为YYYY/MM/DD格式
//  */
// export const dateFomatterhms = (time: any) => {
//   return dateFomatter(time, "YYYY/MM/DD HH:mm:ss");
// };

// //时间间隔处理子函数
// const ComputingTime = (_time: number) => {
//   const seconds = _time / 1000;
//   if (seconds) {
//     if (seconds > 0 && seconds < 60) {
//       return `${Math.floor(seconds)}秒`;
//     } else if (seconds >= 60 && seconds < 3600) {
//       return `${Math.floor(seconds / 60)}分钟`;
//     } else if (seconds >= 3600 && seconds < 3600 * 24) {
//       return `${Math.floor(seconds / 3600)}小时`;
//     } else if (seconds >= 3600 * 24) {
//       return `${Math.floor(seconds / 3600 / 24)}天`;
//     }
//   }
//   return "0";
// };
// /**
//  * 计算两个时间之差：传入参数可以为字符串、时间对象、时间戳均可
//  * @param startTime 初始时间
//  * @param endTime 结束时间
//  */
// export const TimeDifference = (
//   startTime: string | number,
//   endTime: string | number
// ) => {
//   if (startTime && endTime) {
//     const _start: number = moment(startTime).valueOf();
//     const _end: number = moment(endTime).valueOf();
//     return _end > _start
//       ? ComputingTime(_end - _start)
//       : ComputingTime(_start - _end);
//   }
//   return "0";
// };

/** 表格省略号 */
export const ellopsisOnCell: any = () => {
  return {
    style: {
      whiteSpace: "nowrap",
      maxWidth: 150,
    },
  };
};

export const ellopsisRender = (text: React.ReactNode) => {
  return <EllipsisTooltip title={text}>{text}</EllipsisTooltip>;
};

// export const ellopsisTableConfig = {
//   onCell: ellopsisOnCell,
//   render: ellopsisRender,
// };

// export const checkButtonView = (value: string | number) => {
//   if (typeof value !== "number") return "-";
//   return <IntlDep id={value === 1 ? "OPEN" : "CLOSE"} />;
// };

// export const listView = (data: any[]) => {
//   return (
//     <div>
//       {data.map((item, idx) => (
//         <Tag key={idx}>{item}</Tag>
//       ))}
//     </div>
//   );
// };

// export const tableView = (configs: IColumnsTypeP<any>[]) => (data: any[]) => {
//   const _data = data.map(item => {
//     return configs.map(config => config.dataIndex && item[config.dataIndex]).join(" ")
//   })
//   return <div>
//   {_data.map((item, idx) => (
//     <Tag key={idx}>{item}</Tag>
//   ))}
// </div>;
// };

// interface  IUserAuthCategory{
//   id: number;
//   enableFlag: 1 | 0
// }

// /**
//  * memorized function
//  * @param authList
//  * @param categoryId
//  */
// export const checkAuthConfig = (authList: IUserAuthCategory[] | null, categoryId: number) => {
//   return (el: ReactNode) =>{
//     if(authList && authList.length > 0){
//       const item = authList.find(auth => auth.id === categoryId)
//       if(item){
//         return item.enableFlag ? el : null;
//       }
//     }
//     return el;
//   }
// }

// type IRender = (params1: any, data?: any) => React.ReactNode;

// export const withEmptyRender = (render?: IRender) =>
//     (value: string | number | null | undefined, data?: any) => {
//   if(typeof value === "undefined" || value === null){
//     return "-"
//   }
//   return render ? render(value, data) : value;
// }

// const checkBoxCertType = (value: number) => {
//   return (value === 1 || value === 2) ? <IconFont type="iconbaseline-check_box-px" /> : <IconFont type="iconcheck_box" />
// }

// export const checkBoxCertTypeRender = withEmptyRender(checkBoxCertType)

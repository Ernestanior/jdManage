import moment from "moment";
import EllipsisTooltip from "./ellipsisTooltip";

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
    return `${time}`;
  }
};

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

import { History } from "history";
// import JSZip from "jszip";
import notification from "antd";
import moment from "moment";

const fastCreateArray = (n: number) => {
  return Array.from({ length: n }).map((v, k) => k);
};

const fixTo = (e: string) => (parseInt(e) < 10 ? "0" + e : e);

const greyHistoryPath = () => {
  const w = window as any;
  if (w.GreyHistory) {
    return w.GreyHistory.location.pathname;
  } else {
    return null;
  }
};

const setMerge =
  <T>(originData: T, setData: any) =>
  (data: any) => {
    return setData({
      ...originData,
      ...data,
    });
  };

const getHistoryObj = () => {
  const w = window as any;
  if (w.GreyHistory) {
    return w.GreyHistory as History;
  } else {
    return null;
  }
};

const findNestedObj = (
  entireObj: Record<string, any>,
  keyToFind: string,
  valToFind: any
): any => {
  let foundObj;
  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue;
    }
    return nestedValue;
  });
  return foundObj;
};

const ipRegExp =
  /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

// const downloadCertFile = (data: {
//     fileName: string
//     text: { key: string; crt: string }
//   }) => {
//     const zip = new JSZip()
//     zip.file(data.fileName + '.key', data.text.key)
//     zip.file(data.fileName + '.crt', data.text.crt)
//     zip.generateAsync({ type: 'blob' }).then((blob: Blob) => {
//       const a = document.createElement('a')
//       a.download = data.fileName + '.zip'
//       a.href = URL.createObjectURL(blob)
//       a.style.display = 'none'
//       document.body.appendChild(a)
//       a.click()
//       document.body.removeChild(a)
//       notification.success('cert.download.success')
//       setTimeout(function() {
//         URL.revokeObjectURL(a.href)
//       }, 1500)
//     })
//   }
const transformFlow = (value: number) => {
  if (value < 1000) {
    return value.toFixed(2) + "B";
  }
  const kb = value / 1000;
  if (kb < 1000) {
    return kb.toFixed(2) + "KB";
  }
  const mb = kb / 1000;
  if (mb < 1000) {
    return mb.toFixed(2) + "MB";
  }
  const gb = mb / 1000;
  return gb.toFixed(2) + "GB";
};
/**
 * 带宽转换
 */
const transformBindWidth = (value: number) => {
  if (value < 1000) {
    return value.toFixed(2) + "bps";
  }
  const kb = value / 1000;
  if (kb < 1000) {
    return kb.toFixed(2) + "Kbps";
  }
  const mb = kb / 1000;
  if (mb < 1000) {
    return mb.toFixed(2) + "Mbps";
  }
  const gb = mb / 1000;
  return gb.toFixed(2) + "Gbps";
};
export const xAxisFormatterGenerate = (data: number[][]) => {
  const startDate = moment(data[0][0]);
  const endDate = moment(data[data.length - 1][0]);
  let needYear = false;
  let needHourAndMinute = false;
  if (endDate.diff(startDate, "day") <= 7) {
    needHourAndMinute = true;
  } else {
    needYear = true;
  }
  return function (value: any, a: number) {
    if (a % 2 === 0) {
      return null;
    }
    if (needYear) {
      return (
        moment(value).format("MM-DD") + " \n" + moment(value).format("YYYY")
      );
    }
    if (needHourAndMinute) {
      return (
        moment(value).format("HH:mm") + " \n" + moment(value).format("MM-DD")
      );
    }
    return moment(value).format("MM-DD");
  };
};

export {
  fastCreateArray,
  fixTo,
  greyHistoryPath,
  setMerge,
  getHistoryObj,
  findNestedObj,
  transformFlow,
  transformBindWidth,
  ipRegExp,
  // downloadCertFile,
};

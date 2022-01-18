import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import history from "../routers";

class Tool {
  /** 路由路径 */
  private location$ = new Subject<string>();

  /** log内容 */
  private logData$ = new Subject<any>();

  constructor() {
    // 路由跳转
    this.location$
      .pipe(
        filter((url) => {
          const currentUrl = history.location.pathname;
          return currentUrl !== url;
        })
      )
      .subscribe((url) => {
        history.push(url);
      });

    // 日志
    this.logData$.subscribe((data) => {
      console.log(...data);
    });
  }

  /**
   * 跳转
   * @param url 跳转链接
   */
  public goPage = (url: string) => {
    // 跳转
    this.location$.next(url);
  };

  /**
   * 创建日志
   */
  public createDebug = (flag: boolean, name: string) => (
    message: any,
    ...optionalParams: any[]
  ) => {
    if (flag) {
      let logData = [message, ...optionalParams];
      logData = [`[##${name}模块##日志]:`, ...logData];
      this.logData$.next(logData);
    }
  };
}

/** 工具包 */
const toolService = new Tool();

export default toolService;

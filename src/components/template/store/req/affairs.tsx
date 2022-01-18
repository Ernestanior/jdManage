import { notification } from "antd";
import { BehaviorSubject, of, Observable } from "rxjs";
import { debounceTime, delay, filter, switchMap } from "rxjs/operators";
// import { languagePkg } from "../../hooks/useLanguage";

/**
 * @class 事务
 * @description 对请求进行处理，并更新当前的数据状态
 * @description 只处理对后台资源有效的修改
 */
class Affair {
  /** 上一个有效操作的时间戳 */
  private last_effective_time = Date.now();

  event_pool: any = {};
  // 可供订阅的事件池状态-显示当前有多少事件正在执行
  private pool_event_state$ = new BehaviorSubject<{
    isFinished: boolean;
    isError: boolean;
    url: string;
    type: string;
  }>({
    isFinished: true,
    isError: false,
    url: "",
    type: "",
  });

  // 对外提供事件订阅
  readonly loading$: Observable<boolean>;

  // 事件处理结果
  constructor() {
    this.pool_event_state$
      .pipe(filter((eventState) => !eventState.isError))
      .pipe(
        filter((eventState) => {
          return eventState.isFinished && !!eventState.type;
        })
      )
      // 300ms 后执行，页面更新完毕，会更流畅
      .pipe(debounceTime(500))
      .subscribe((eventState) => {
        let message = "UPDATE_SUCCESS";
        if (eventState.type === "delete") {
          message = "DELETE_SUCCESS";
        }
        if (~eventState.url.indexOf("enable")) {
          message = "ENABLE_SUCCESS";
        }
        if (~eventState.url.indexOf("disable")) {
          message = "DISABLE_SUCCESS";
        }
        notification.success({
          // message: this.info || (!!languagePkg && languagePkg[message]),
          message: this.info,
          duration: 1.5,
        });
      });

    this.loading$ = this.pool_event_state$
      .pipe(
        switchMap((eventState) => {
          if (eventState.isError) {
            return of(false);
          }
          return of(!eventState.isFinished);
        })
      )
      .pipe(delay(200));
  }

  // 清理事件池
  public cleanPools = () => {
    this.event_pool = {};
    this.pool_event_state$.next({
      isFinished: false,
      isError: false,
      url: "",
      type: "",
    });
  };

  /** 提示信息 */
  private info = "";

  // 新建事件
  private newAffair = () => {
    this.refreshAffair();
    this.cleanPools();
    this.info = "";
  };

  // 刷新事件
  private refreshAffair = () => {
    this.last_effective_time = Date.now();
  };

  addEvent = (url: string, type: string, info?: string) => {
    // 上次事件
    if (Math.abs(this.last_effective_time - Date.now()) > 1000) {
      this.newAffair();
    } else {
      // 不需要新建事件，只刷新当前事件有效时间
      this.refreshAffair();
    }
    if (info) {
      this.info = info;
    }
    // 将事件添加到池子里
    this.updatePool(url, type);
  };

  removeEvent = (url: string, type: string) => {
    // 将事件从池子里移除
    this.updatePool(url, type);
  };

  /**
   * 将请求添加到正在执行的池子中
   * 将已在池子中的请求移除掉
   * @param url
   * @param type
   */
  private updatePool = (url: string, type: string) => {
    if (typeof this.event_pool[url] !== "undefined") {
      delete this.event_pool[url];
    } else {
      this.event_pool[url] = type;
    }
    let {
      url: urlValue,
      type: typeValue,
      isError,
    } = this.pool_event_state$.value;
    let isFinished = this.pool_event_state$.value.isFinished;
    // 空白
    isFinished = Object.keys(this.event_pool).length < 1;
    // 未新增, delete 不是主要操作
    // if (!type || (typeValue !== "put" && type === "put")) {
    //   urlValue = url;
    //   typeValue = type;
    // } else {
    urlValue = url;
    typeValue = type;
    // }

    this.pool_event_state$.next({
      isFinished,
      isError,
      url: urlValue,
      type: typeValue,
    });
  };

  public setErrorPool = () => {
    this.pool_event_state$.next({
      ...this.pool_event_state$.value,
      isError: true,
    });
  };
}

const affairService = new Affair();

export default affairService;

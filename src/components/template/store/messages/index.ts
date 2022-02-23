import { ITrigger, IMapT, IUploadModuleConfig } from "../../interface";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import tool from "../tools";
import EInfoType from "./infoType";

interface IInfo {
  type: EInfoType | number;
  value?: any;
}

const log = tool.createDebug(true, "全局消息队列");

class Message {
  private info$ = new Subject<IInfo>();

  constructor() {
    /**
     * 打印消息日志
     */
    this.info$.subscribe((info) => {
      log(info);
    });
  }

  /**
   * 创建消息
   * @param type 创建
   */
  public createMessage = (inf: IInfo) => {
    this.info$.next(inf);
  };

  /**
   * 订阅单个类型消息
   */
  public createSubscibe = (type: EInfoType | number) => {
    return this.info$.pipe(filter((info) => info.type === type));
  };

  /**
   * 打开和关闭窗口
   * @param id 事件id
   */
  public createEvent = (id: number) => {
    this.info$.next({
      type: EInfoType.create_resource,
      value: id,
    });
  };

  // 快捷事件-创建
  public formCreate = (id: number) => {
    this.info$.next({
      type: EInfoType.form_new,
      value: {
        id,
      },
    });
  };

  // 快捷事件-表单载入 - 支持批量载入到多个目标
  public formUpdate = (id: number | number[], data: any) => {
    this.info$.next({
      type: EInfoType.form_load,
      value: {
        id,
        data,
      },
    });
  };

  public formUpdateSuccess = (id: number) => {
    this.info$.next({
      type: EInfoType.form_updated_success,
      value: {
        id,
      },
    });
  };

  // 快捷事件-刷新
  public reloadList = (id: number) => {
    this.info$.next({
      type: EInfoType.list_reload,
      value: {
        id,
      },
    });
  };
  /**
   * 快捷事件-删除
   * id: 表单id
   * data: 被删除的数据
   */
  public formDelete = (id: number, data: any) => {
    this.info$.next({
      type: EInfoType.form_delete,
      value: {
        id,
        data,
      },
    });
  };

  /**
   * 快捷事件-查看
   * id: 表单id
   * data: 查看的数据, 注意格式
   * 可以直接的值，也可以是详细配置
   * @important 直接的值暂不支持动态隐藏域
   */
  public view = (id: number, data: IViewData) => {
    if (typeof data.name !== "undefined" && typeof data.value === "object") {
      this.info$.next({
        type: EInfoType.form_view,
        value: {
          id,
          data,
        },
      });
    } else {
      this.info$.next({
        type: EInfoType.form_view,
        value: {
          id,
          data: {
            name: "",
            value: data,
          },
        },
      });
    }
  };

  public confirm = (text: string, event: ITrigger, okText?: string) => {
    this.info$.next({
      type: EInfoType.confirm_normal,
      value: {
        text,
        event,
        okText,
      },
    });
  };

  public eliminate = (id: number, data: any) => {
    this.info$.next({
      type: EInfoType.clear_cache,
      value: {
        id,
        data,
      },
    });
  };

  /**单条数据刷新或重载 */
  public onceUpadte = (id: number, data: any) => {
    this.info$.next({
      type: EInfoType.once_update,
      value: {
        id,
        data,
      },
    });
  };

  // /**
  //  * 导出文件
  //  * @param title 文件名
  //  * @param data 数据
  //  */
  // public readonly exportFile = (title: string, data: any) => {
  //   const fileName = `${moment().format("YYYY-MM-DD HH-mm")} ${title}`;
  //   const exportContent = "\uFEFF";
  //   const file = new Blob([exportContent + data], {
  //     type: "text/plain;charset=utf-8",
  //   });
  //   saveAs(file, fileName);
  // };

  /**
   * 打开复制弹窗
   */
  public readonly openClipboard = (
    title: string,
    text: string | number | null
  ) => {
    this.info$.next({
      type: EInfoType.copy_to_clipboard,
      value: {
        title,
        text,
      },
    });
  };

  /**
   * 打开服务器文件下载流
   * @param filename 文件名
   */
  public readonly openDownloadStream = (filename: string) => {
    window.open(`https://sitelog.greypanel.com/report/${filename}`, "_blank");
  };

  public readonly uploadFile = (config: IUploadModuleConfig) => {
    this.info$.next({
      type: EInfoType.import_file,
      value: config,
    });
  };

  /**
   * 无需事件类型的消息通知
   * @param id
   * @param data
   */
  public readonly sendMessage = (id: number, data?: any) => {
    this.info$.next({
      type: id,
      value: data || "",
    });
  };
}

const messageService = new Message();

export default messageService;

interface IViewData {
  value: any;
  name: string;
  /** 不展示的部分 */
  hideMap?: IMapT<boolean>;
}

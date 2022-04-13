import { XOR } from "ts-xor";
import React, { ReactElement } from "react";
import { Subject } from "rxjs";
import { SizeType } from "antd/lib/config-provider/SizeContext";
// import { AxiosRequestConfig } from "axios";
import { CSSProperties } from "react";

export type ICallback<T> = (data: T, totalData?: any) => void;

/**
 * 判断函数 -> boolean
 */
export type IAdjustFunc<T> = (data: T) => boolean;

/**
 * 无参数触发事件
 */
export type ITrigger = () => void;

/**
 * 需要翻译的组件基类
 */
export interface IText {
  text: string;
  textValue?: IMap;
}

/**
 * 回调模块
 */
export interface ICallbackModule {
  cb?: ITrigger;
}

/**
 * 提交模块
 */
export interface ISubmitModule {
  submitEvent: ICallback<any>;
}

/**
 * 字典
 */
export interface IMap {
  [key: string]: string;
}

/**
 * 字典T
 */
export interface IMapT<T> {
  [key: string]: T;
}

/**
 * 字典T
 */
export interface IMapArrayT<T> {
  [key: number]: T;
}

/**
 * 字典T
 */
export interface IDict {
  name: string;
  value: string;
}

/**
 * 表格行的配置
 * @url https://ant.design/components/table-cn/#Column
 */
export interface IColumnsTypeP<T = {}> {
  key: string;
  /** 列标题 */
  title: string;
  /** 属性名-不传的话，就是操作列 */
  dataIndex?: keyof T | string[];
  /** 是否支持排序 */
  sorter?: boolean;
  /** 宽度 */
  width?: number;
  /**
   * 自定义渲染
   * text 当前的值
   * data 当前行的值
   * index，第几行
   * modifyEvent 编辑事件
   * - 使用前请检查组件是否拥有此功能
   * - 目前仅formtable拥有此功能
   * */
  render?: (
    text: any,
    data: any,
    index: number,
    modifyEvent?: ICallback<any>
  ) => React.ReactNode;
  fixed?: "left" | "right";
  onCell?: () => {
    style: React.CSSProperties;
  };
}

export type IOperationConfig = Array<IOperation<any> | IOperation<any>[]>;

/**
 * 表格操作下拉框
 */
export interface IOperation<T> {
  icon?: ReactElement;
  text?: string;
  textValue?: IMap;
  event: ICallback<T> | ITrigger;
  /** 拥有权限的角色-admin开启所有操作 */
  role?: IUserType[];
  subRole?: IUserSubType[];
  /** 根据当前数据渲染, 返回true表示隐藏 */
  hide?: IAdjustFunc<T>;
  [x: string]: any;
}

export enum INormalEventActionType {
  CREATE = "CREATE",
  EDIT = "CREATE",
  VIEW = "VIEW",
}

/**
 * 普通按钮，不需要参数
 * 但是需要绑定表单id
 */
export interface INormalEvent extends IText {
  /** 拥有权限的角色-admin开启所有操作 */
  role?: IUserType[];
  actionType?: INormalEventActionType;
  hide?: boolean;
  event: ICallback<any> | ITrigger;
}
export interface INormalBtn {
  text: string;
  icon?: ReactElement;
  loading?: boolean;
}
export interface IBatchBtn extends INormalBtn {
  onClick: any;
}
export interface IBatchEvent extends IText {
  /** 拥有权限的角色-admin开启所有操作 */
  role?: IUserType[];
  actionType?: INormalEventActionType;
  /** 提示文案 */
  description: IText;
  /** 生成事件提交参数 */
  generateParams: (uids: string[], rowDatas?: any[]) => any;
  /** 回调函数(不包括刷新，表格刷新事件自动处理) */
  callback?: ITrigger;
  /** 允许不刷新列表 */
  disableAutoReload?: boolean;
}

export type IBindIDEvent<T> = (id: number) => T;

/** 按钮-绑定id */
export type INormalEventBindId = IBindIDEvent<INormalEvent[]>;

/** 下拉-绑定id */
export type IDropDownBindId<T> = IBindIDEvent<IOperation<T>[]>;

export interface IResetModule {
  reset?: (cb: Function) => () => void;
}

/** 用户类型 */
export enum IUserType {
  CUSTOMER = "customer",
  ADMIN = "admin",
  AGENT = "agent",
  SUPPORT = "supporter",
  SALE = "saler",
}
/** 子账号系统类型 */
export enum IUserSubType {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  EDITOR = "operator",
  VIWER = "viewer",
}
/**
 * 登录信息-应用相关
 * 用户id
 * 客户id列表
 */
export interface IBasicInfo {
  /** 客户id */
  customerIds: number[];
  /** 用户id */
  id: number;
  /** 用户类型 */
  type: IUserType;
  /** 客户类型 */
  subType: IUserSubType;
  /** 密码过期状态
   * 0: 无需更新
   * 1: 30天内更新
   * 2: 强制更新
   */
  pwdStatus: 0 | 1 | 2;
  /**启用2FA校验 */
  authFlag: -1 | 1 | 2;
}

/**
 * 客户类型
 */
export enum ICustomerType {
  NORMAL = "normal",
  CNAME = "cname",
}

/**
 * 客户列表的单个值
 */
export interface ICustomerItem {
  id: number;
  name: string;
  type: ICustomerType;
  email: string;
}

/**
 * 客户信息-套餐相关
 */
export interface ICustomerInfo {
  usedMasterNames: number;
  category: ICustomerCategory;
  dnsIp: string;
  dnsValue: string;
  /** customerId */
  id: number;
  limitBandwidth: number;
  limitCerts: number;
  limitCnames: number;
  limitCustomPorts: number;
  limitDefence: number;
  limitDomains: number;
  limitMasterDomains: number;
  limitPorts: number;
  limitSiteCerts: number;
  limitSiteDomains: number;
  limitSubAccounts: number;
  limitTokens: number;
  mainlandOpt: number;
  name: string;
  noticeEmail: string;
  noticeFlag: number;
  probation: number;
  probationPeriod: number;
  probationStart: string;
  type: ICustomerType;
  uid: string;
  usedBandwidth: number;
  usedCerts: number;
  usedCnames: number;
  usedCustomPorts: number;
  usedMasterDomains: number;
  usedPorts: number;
  usedSubAccounts: number;
  usedTokens: number;
  email: string;
}

/**
 * 用户信息
 * @property 邮箱
 * @property 语言
 * 等等
 */
export interface IUserInfo {
  email: string;
  /** 这是userID, 不是customerID, 不要乱用 */
  id: number;
  lastLoginIp: string;
  lastLoginTime: string;
  locale: string;
  loginId: string;
  name: string;
  phone: string;
  status: number;
  timezone: string;
  type: IUserType;
}

/**
 * 客户类型
 */
export enum ICustomerCategory {
  /** 非内部 */
  NORMAL = "biz",
  /** 内部测试 */
  INTEL_TEST = "test",
  /** 内部客户 */
  INTEL_NORMAL = "internal",
}

export interface IPageResult<IAgentListDto> {
  content: IAgentListDto[];
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ISearchPage {
  desc: number;
  pageNum: number;
  pageSize: number | undefined;
  sort: string;
}

export interface IDisplayText {
  text: IText;
  value: React.ReactText;
}

interface ICacheModule {
  /** 加载缓存机制 */
  cache?: Subject<any>;
}

/**
 * 模块id
 */
export interface IModule extends ICacheModule {
  id: number;
  /** 如果有部分列表需要额外刷新 */
  refreshModuleIds?: number[];
  /** 纯数据模式 */
  dataMode?: boolean;
}

export interface ISelectItem {
  uid: string | number;
  [key: string]: any;
}

// 按钮
export interface IButton {
  text: string;
  event: ITrigger;
}

export interface ISelectOptionConfig {
  /** 提交属性 */
  idKey: string;
  /** 展示属性 */
  textKey: string;
}

/** form表单自定义控件 **/
export interface IFormComponent<T = any> {
  value?: T;
  onChange?: (value: T) => void;
  loader?: (value: string, reverse?: boolean) => any;
  size?: SizeType;
}

export interface IFormListComponent {
  remove?: ITrigger;
}

export interface IMessageModule {
  disable?: boolean;
  success?: boolean;
  successInfo?: string;
}

export interface IPagePackage {
  JSX: React.FC;
  url: string;
}

export interface ITagEnum {
  id: number | string;
  name: string;
  color: string;
}

export interface IRoleAuth {
  /** 用户身份 */
  role?: IUserType[];
  subRole?: IUserSubType[];
  disableAdmin?: boolean;
}

/**
 * 通知消息模块
 */
export interface INotificationModule {
  /** 操作提醒配置 */
  __message?: IMessageModule;
}

export interface IEditModule {
  isEdit?: boolean;
}

export interface IChildLevel {
  haveLeftPadding?: boolean;
}

/** 确认事件 */
export interface IConfirmInfo {
  text: string;
  okText?: string;
  event: ITrigger;
}

/** 删除事件 */
export interface IDeleteInfo {
  text: string;
  event: ITrigger;
}

/**
 * 上传事件
 */
export interface IUploadModule {
  accept?: string;
  multiple?: boolean;
  name: string;
}

export type IUploadModuleConfig = IUploadModule &
  ISubmitModule &
  ICallbackModule &
  IText;

export interface ITimeFilter<T = any> {
  /** 激活月份选择 */
  monthEnable?: boolean;
  /** 月份默认值 */
  monthDefaultValue?: string;
  /**参数*/
  defaultValue?: T;
  /**监听事件*/
  onChange?: (value: T) => void;
  /**size*/
  size?: any;
  /**style*/
  style?: React.CSSProperties;
}

/**
 * 时间筛选
 */
export enum ETimeFilter {
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST7DAY = "last7day",
  LAST30DAY = "last30day",
  CURRENTMONTH = "currentMonth",
  CUSTOM = "custom",
}

export interface IDateRange {
  reportType: ETimeFilter;
  startDate: string;
  endDate: string;
}

export interface IMenuLv1 extends IRoleAuth {
  icon?: string;
  text: string;
  url: string;
}
export interface IMenuLv2 extends IRoleAuth {
  icon?: string;
  text: string;
  url?: string;
  /** 子菜单 */
  childs: IMenuLv1[];
}
export type IMenu = XOR<IMenuLv1, IMenuLv2>;

export interface IResponseBody<T> {
  code: number;
  msg: string;
  data?: T;
}

/**
 * 可展开模块
 */
export interface IExpandableModule {
  /** 展开渲染函数 */
  expandedRowRender?: (record: any) => React.ReactNode;
  /** 是否允许展开此行 */
  rowExpandable?: (record: any) => boolean;
  onExpand?: (expanded: boolean, record: any) => void;
  expandedRowKeys?: readonly React.Key[];
}
/**
 * 搜索条件过滤模块
 */
export interface IFilterModule {
  /** 指定高级过滤id */
  filterId?: number;
  filter?: any[];
  filterInitialValue?: IMapT<string | number>;
  /** 隐藏高级搜索按钮 */
  filterHide?: boolean;
}

// /**
//  * 将queryConfig和queryFunc合并
//  *
//  */
// export interface IQueryConfig {
//   /** 多次调用不建议使用queryData */
//   queryData: (data: any) => AxiosRequestConfig | null;
// }

// export interface IQueryFunction {
//   /** 单次不建议使用queryDataFunction */
//   queryDataFunction: (data: any) => Promise<IPageResult<any> | null>;
// }

// /**
//  * 数据获取模块
//  */
// export type IQueryModule = XOR<IQueryConfig, IQueryFunction>;

export interface IMultSelectProps extends IFormComponent {
  data: Array<ISelectItem | string>;
  onChange?: ICallback<any>;
  /** 下拉列表的展示和提交字段 */
  config?: ISelectOptionConfig;
  /** 样式 */
  style?: CSSProperties;
  /** 开启翻译 */
  enableIntl?: boolean;
  /** layout default value is "vertical" */
  layout?: "vertical" | "horizontal";
  tipId?: number;
}

export interface Role {
  type: string | number;
}

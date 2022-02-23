export interface ISupplierContent {
  uid: string;
  code: string;
  name: string;
  displayName: string;
  option: string;
  apiType: string;
  isConfigurable: boolean;
  isEnabled: boolean;
}
export interface IStatSiteSupplier {
  uid: string;
  reportType: string;
  startDate?: string;
  endDate?: string;
}
export interface IStatSiteBandwidth {
  suppliers: string[];
  reportType: string;
  startDate?: string;
  endDate?: string;
}
export interface IStatSiteFlow {
  suppliers: string[];
  reportType: string;
  startDate?: string;
  endDate?: string;
}
export interface IStatSupplierAvail {
  lines: string[];
  reportType: string;
  scope: string;
  size: number;
  suppliers: string[];
  type: string;
}
export interface IStatSiteAvail extends IStatSiteFlow {
  lines: string[];
  scope: string;
}
export interface IStatSiteOrigin {
  reportType: string;
  startDate?: string;
  endDate?: string;
  keyword?: string;
  size: number;
  type: string;
  lines: string[];
  scope: string;
}

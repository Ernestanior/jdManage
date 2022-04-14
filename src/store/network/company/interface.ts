interface ICompanyList {
  data: ICompanyInfo[];
  size: number;
}
interface ICompanyInfo {
  companyName: string;
  description: string;
  id: number;
  status: number;
}

interface ICompanyList {
  data: ICompanyInfo[];
  size: number;
}
interface INewCompany {
  companyName?: string;
  description?: string;
  staffNum?: string;
}
interface ICompanyInfo extends INewCompany {
  id?: number;
  status?: number;
  logoName?: any;
}

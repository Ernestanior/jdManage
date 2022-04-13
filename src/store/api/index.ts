import Auth from "./auth";
import UserAPI from "./user";
import SiteAPI from "./site";
import DnsAPI from "./dns";
import SupplierAPI from "./supplier";
import CompanyAPI from "./company";
import FirewallAPI from "./firewall";
import CacheAPI from "./cache";
import StatAPI from "./stat";
import SslManageAPI from "./sslManage";
// import DnsConfigAPI from "./dnsConfig";
// import DomainAPI from "./domain";
// import SslAPI from "./ssl";

export const authApi = new Auth();
export const userApi = new UserAPI();
export const siteApi = new SiteAPI();
export const dnsApi = new DnsAPI();
export const supplierApi = new SupplierAPI();
export const companyApi = new CompanyAPI();
export const firewallApi = new FirewallAPI();
export const cacheApi = new CacheAPI();
export const statApi = new StatAPI();
export const sslManageApi = new SslManageAPI();
// export const dnsConfigApi = new DnsConfigAPI();
// export const domainApi = new DomainAPI();
// export const sslApi = new SslAPI();

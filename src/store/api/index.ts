import Auth from "./auth";
import UserAPI from "./user";
import NoteAPI from "./note";
import JdAPI from "./jd";
import AdminAPI from "./admin";
import CompanyAPI from "./company";
import CityAPI from "./city";

// import DnsConfigAPI from "./dnsConfig";
// import DomainAPI from "./domain";
// import SslAPI from "./ssl";
export const companyApi = new CompanyAPI();
export const jdApi = new JdAPI();
export const noteApi = new NoteAPI();
export const cityApi = new CityAPI();

export const authApi = new Auth();
export const userApi = new UserAPI();
export const adminApi = new AdminAPI();

// export const dnsConfigApi = new DnsConfigAPI();
// export const domainApi = new DomainAPI();
// export const sslApi = new SslAPI();

export interface IUploadCert {
  customerUid: string;
  sslCrt: string;
  sslEnable: number;
  sslKey: string;
}
export interface RequestOriginalCert {
  domains: string[];
  privateKeyType?: string;
  privateKey?: string;
  usesOwnPrivateKey: boolean;
  validity: number;
}

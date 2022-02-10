export interface FirewallList {
  isEnabled: boolean;
  addresses?: string[];
  userAgents?: string[];
}

export interface FirewallListSave extends FirewallList {
  siteUid: string;
}

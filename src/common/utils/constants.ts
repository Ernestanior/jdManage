const GBYTES = 1073741824;
const MBYTES = 1048576;
const KBYTES = 1024;

const CHART_COLOUR = [
  "#7bd5fa",
  "#a2a0f5",
  "#d1796a",
  "#ffbe00",
  "#5bba85",
  "#db413c",
  "#9169cb",
  "#ff9a78",
  "#36c5cc",
  "#fcff42",
];

const DNS_TYPES = [
  {
    value: "A",
    displayName: "rrtype.A",
  },
  {
    value: "CNAME",
    displayName: "rrtype.CNAME",
  },
  {
    value: "MX",
    displayName: "rrtype.MX",
  },
  {
    value: "TXT",
    displayName: "rrtype.TXT",
  },
  {
    value: "NS",
    displayName: "rrtype.NS",
  },
  {
    value: "AAAA",
    displayName: "rrtype.AAAA",
  },
  {
    value: "SRV",
    displayName: "rrtype.SRV",
  },
  {
    value: "CAA",
    displayName: "rrtype.CAA",
  },
  {
    value: "Forwarding301",
    displayName: "rrtype.Forwarding301",
  },
  {
    value: "Forwarding302",
    displayName: "rrtype.Forwarding302",
  },
  {
    value: "ForwardingWithMasking",
    displayName: "rrtype.ForwardingWithMasking",
  },
];

const TTL = {
  MAX: 2147483647,
};

const IS_DEV =
  window.location.hostname === "console-ej-stg.infly.xyz" ||
  window.location.hostname === "console-stg.edgejoint.com" ||
  window.location.hostname === "localhost";

const DEFAULT_SEARCHPAGE = {
  desc: 1,
  page: 1,
  pageSize: 20,
  sort: "create_date",
};
export {
  GBYTES,
  MBYTES,
  KBYTES,
  DNS_TYPES,
  TTL,
  CHART_COLOUR,
  IS_DEV,
  DEFAULT_SEARCHPAGE,
};

export const hourList = [1, 2, 3, 6, 12, 24];
export const numberList = [1, 2, 3, 4, 5];
export const percentList = [...Array(50)].map(
  (_: any, index: number) => index + 1
);
export const speedList = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
];
export const decisionWindowList = [
  { key: 5, value: "5 minutes" },
  { key: 15, value: "15 minutes" },
  { key: 30, value: "30 minutes" },
  { key: 60, value: "1 hour" },
  { key: 180, value: "3 hours" },
  { key: 360, value: "6 hours" },
  { key: 720, value: "12 hours" },
  { key: 1440, value: "24 hours" },
];
export interface ITree {
  title: string;
  value: string;
  key: string;
  children?: ITree[];
}
export const treeData: ITree[] = [
  {
    title: "line.default",
    value: "1",
    key: "1",
  },
  {
    title: "line.country.cn",
    value: "10",
    key: "10",
    children: [
      {
        title: "line.china.north",
        value: "21",
        key: "21",
        children: [
          {
            title: "line.beijing",
            value: "1100",
            key: "1100",
            children: [
              {
                title: "line.beijing.telecom",
                value: "1110",
                key: "1110",
              },
              {
                title: "line.beijing.unicom",
                value: "1120",
                key: "1120",
              },
              {
                title: "line.beijing.cmcc",
                value: "1130",
                key: "1130",
              },
            ],
          },
          {
            title: "line.tianjin",
            value: "1200",
            key: "1200",
            children: [
              {
                title: "line.tianjin.telecom",
                value: "1210",
                key: "1210",
              },
              {
                title: "line.tianjin.unicom",
                value: "1220",
                key: "1220",
              },
              {
                title: "line.tianjin.cmcc",
                value: "1230",
                key: "1230",
              },
            ],
          },
          {
            title: "line.hebei",
            value: "1300",
            key: "1300",
            children: [
              {
                title: "line.hebei.telecom",
                value: "1310",
                key: "1310",
              },
              {
                title: "line.hebei.unicom",
                value: "1320",
                key: "1320",
              },
              {
                title: "line.hebei.cmcc",
                value: "1330",
                key: "1330",
              },
            ],
          },
          {
            title: "line.shanxi",
            value: "1400",
            key: "1400",
            children: [
              {
                title: "line.shanxi.telecom",
                value: "1410",
                key: "1410",
              },
              {
                title: "line.shanxi.unicom",
                value: "1420",
                key: "1420",
              },
              {
                title: "line.shanxi.cmcc",
                value: "1430",
                key: "1430",
              },
            ],
          },
          {
            title: "line.innermongolia",
            value: "1500",
            key: "1500",
            children: [
              {
                title: "line.innermongolia.telecom",
                value: "1510",
                key: "1510",
              },
              {
                title: "line.innermongolia.unicom",
                value: "1520",
                key: "1520",
              },
              {
                title: "line.innermongolia.cmcc",
                value: "1530",
                key: "1530",
              },
            ],
          },
          {
            title: "line.liaoning",
            value: "2100",
            key: "2100",
            children: [
              {
                title: "line.liaoning.telecom",
                value: "2110",
                key: "2110",
              },
              {
                title: "line.liaoning.unicom",
                value: "2120",
                key: "2120",
              },
              {
                title: "line.liaoning.cmcc",
                value: "2130",
                key: "2130",
              },
            ],
          },
          {
            title: "line.jilin",
            value: "2200",
            key: "2200",
            children: [
              {
                title: "line.jilin.telecom",
                value: "2210",
                key: "2210",
              },
              {
                title: "line.jilin.unicom",
                value: "2220",
                key: "2220",
              },
              {
                title: "line.jilin.cmcc",
                value: "2230",
                key: "2230",
              },
            ],
          },
          {
            title: "line.heilongjiang",
            value: "2300",
            key: "2300",
            children: [
              {
                title: "line.heilongjiang.telecom",
                value: "2310",
                key: "2310",
              },
              {
                title: "line.heilongjiang.unicom",
                value: "2320",
                key: "2320",
              },
              {
                title: "line.heilongjiang.cmcc",
                value: "2330",
                key: "2330",
              },
            ],
          },
        ],
      },
      {
        title: "line.china.east",
        value: "23",
        key: "23",
        children: [
          {
            title: "line.shanghai",
            value: "3100",
            key: "3100",
            children: [
              {
                title: "line.shanghai.telecom",
                value: "3110",
                key: "3110",
              },
              {
                title: "line.shanghai.unicom",
                value: "3120",
                key: "3120",
              },
              {
                title: "line.shanghai.cmcc",
                value: "3130",
                key: "3130",
              },
            ],
          },
          {
            title: "line.jiangsu",
            value: "3200",
            key: "3200",
            children: [
              {
                title: "line.jiangsu.telecom",
                value: "3210",
                key: "3210",
              },
              {
                title: "line.jiangsu.unicom",
                value: "3220",
                key: "3220",
              },
              {
                title: "line.jiangsu.cmcc",
                value: "3230",
                key: "3230",
              },
            ],
          },
          {
            title: "line.zhejiang",
            value: "3300",
            key: "3300",
            children: [
              {
                title: "line.zhejiang.telecom",
                value: "3310",
                key: "3310",
              },
              {
                title: "line.zhejiang.unicom",
                value: "3320",
                key: "3320",
              },
              {
                title: "line.zhejiang.cmcc",
                value: "3330",
                key: "3330",
              },
            ],
          },
          {
            title: "line.anhui",
            value: "3400",
            key: "3400",
            children: [
              {
                title: "line.anhui.telecom",
                value: "3410",
                key: "3410",
              },
              {
                title: "line.anhui.unicom",
                value: "3420",
                key: "3420",
              },
              {
                title: "line.anhui.cmcc",
                value: "3430",
                key: "3430",
              },
            ],
          },
          {
            title: "line.fujian",
            value: "3500",
            key: "3500",
            children: [
              {
                title: "line.fujian.telecom",
                value: "3510",
                key: "3510",
              },
              {
                title: "line.fujian.unicom",
                value: "3520",
                key: "3520",
              },
              {
                title: "line.fujian.cmcc",
                value: "3530",
                key: "3530",
              },
            ],
          },
          {
            title: "line.jiangxi",
            value: "3600",
            key: "3600",
            children: [
              {
                title: "line.jiangxi.telecom",
                value: "3610",
                key: "3610",
              },
              {
                title: "line.jiangxi.unicom",
                value: "3620",
                key: "3620",
              },
              {
                title: "line.jiangxi.cmcc",
                value: "3630",
                key: "3630",
              },
            ],
          },
          {
            title: "line.shandong",
            value: "3700",
            key: "3700",
            children: [
              {
                title: "line.shandong.telecom",
                value: "3710",
                key: "3710",
              },
              {
                title: "line.shandong.unicom",
                value: "3720",
                key: "3720",
              },
              {
                title: "line.shandong.cmcc",
                value: "3730",
                key: "3730",
              },
            ],
          },
        ],
      },
      {
        title: "line.china.central",
        value: "24",
        key: "24",
        children: [
          {
            title: "line.henan",
            value: "4100",
            key: "4100",
            children: [
              {
                title: "line.henan.telecom",
                value: "4110",
                key: "4110",
              },
              {
                title: "line.henan.unicom",
                value: "4120",
                key: "4120",
              },
              {
                title: "line.henan.cmcc",
                value: "4130",
                key: "4130",
              },
            ],
          },
          {
            title: "line.hubei",
            value: "4200",
            key: "4200",
            children: [
              {
                title: "line.hubei.telecom",
                value: "4210",
                key: "4210",
              },
              {
                title: "line.hubei.unicom",
                value: "4220",
                key: "4220",
              },
              {
                title: "line.hubei.cmcc",
                value: "4230",
                key: "4230",
              },
            ],
          },
          {
            title: "line.hunan",
            value: "4300",
            key: "4300",
            children: [
              {
                title: "line.hunan.telecom",
                value: "4310",
                key: "4310",
              },
              {
                title: "line.hunan.unicom",
                value: "4320",
                key: "4320",
              },
              {
                title: "line.hunan.cmcc",
                value: "4330",
                key: "4330",
              },
            ],
          },
        ],
      },
      {
        title: "line.china.south",
        value: "25",
        key: "25",
        children: [
          {
            title: "line.guangdong",
            value: "4400",
            key: "4400",
            children: [
              {
                title: "line.guangdong.telecom",
                value: "4410",
                key: "4410",
              },
              {
                title: "line.guangdong.unicom",
                value: "4420",
                key: "4420",
              },
              {
                title: "line.guangdong.cmcc",
                value: "4430",
                key: "4430",
              },
            ],
          },
          {
            title: "line.guangxi",
            value: "4500",
            key: "4500",
            children: [
              {
                title: "line.guangxi.telecom",
                value: "4510",
                key: "4510",
              },
              {
                title: "line.guangxi.unicom",
                value: "4520",
                key: "4520",
              },
              {
                title: "line.guangxi.cmcc",
                value: "4530",
                key: "4530",
              },
            ],
          },
          {
            title: "line.hainan",
            value: "4600",
            key: "4600",
            children: [
              {
                title: "line.hainan.telecom",
                value: "4610",
                key: "4610",
              },
              {
                title: "line.hainan.unicom",
                value: "4620",
                key: "4620",
              },
              {
                title: "line.hainan.cmcc",
                value: "4630",
                key: "4630",
              },
            ],
          },
        ],
      },
      {
        title: "line.china.southwest",
        value: "26",
        key: "26",
        children: [
          {
            title: "line.chongqing",
            value: "5001",
            key: "5001",
            children: [
              {
                title: "line.chongqing.telecom",
                value: "5010",
                key: "5010",
              },
              {
                title: "line.chongqing.unicom",
                value: "5020",
                key: "5020",
              },
              {
                title: "line.chongqing.cmcc",
                value: "5030",
                key: "5030",
              },
            ],
          },
          {
            title: "line.sichuan",
            value: "5100",
            key: "5100",
            children: [
              {
                title: "line.sichuan.telecom",
                value: "5110",
                key: "5110",
              },
              {
                title: "line.sichuan.unicom",
                value: "5120",
                key: "5120",
              },
              {
                title: "line.sichuan.cmcc",
                value: "5130",
                key: "5130",
              },
            ],
          },
          {
            title: "line.guizhou",
            value: "5200",
            key: "5200",
            children: [
              {
                title: "line.guizhou.telecom",
                value: "5210",
                key: "5210",
              },
              {
                title: "line.guizhou.unicom",
                value: "5220",
                key: "5220",
              },
              {
                title: "line.guizhou.cmcc",
                value: "5230",
                key: "5230",
              },
            ],
          },
          {
            title: "line.yunnan",
            value: "5300",
            key: "5300",
            children: [
              {
                title: "line.yunnan.telecom",
                value: "5310",
                key: "5310",
              },
              {
                title: "line.yunnan.unicom",
                value: "5320",
                key: "5320",
              },
              {
                title: "line.yunnan.cmcc",
                value: "5330",
                key: "5330",
              },
            ],
          },
          {
            title: "line.tibet",
            value: "5400",
            key: "5400",
            children: [
              {
                title: "line.tibet.telecom",
                value: "5410",
                key: "5410",
              },
              {
                title: "line.tibet.unicom",
                value: "5420",
                key: "5420",
              },
              {
                title: "line.tibet.cmcc",
                value: "5430",
                key: "5430",
              },
            ],
          },
        ],
      },
      {
        title: "line.china.northwest",
        value: "27",
        key: "27",
        children: [
          {
            title: "line.shaanxi",
            value: "6100",
            key: "6100",
            children: [
              {
                title: "line.shaanxi.telecom",
                value: "6110",
                key: "6110",
              },
              {
                title: "line.shaanxi.unicom",
                value: "6120",
                key: "6120",
              },
              {
                title: "line.shaanxi.cmcc",
                value: "6130",
                key: "6130",
              },
            ],
          },
          {
            title: "line.gansu",
            value: "6200",
            key: "6200",
            children: [
              {
                title: "line.gansu.telecom",
                value: "6210",
                key: "6210",
              },
              {
                title: "line.gansu.unicom",
                value: "6220",
                key: "6220",
              },
              {
                title: "line.gansu.cmcc",
                value: "6230",
                key: "6230",
              },
            ],
          },
          {
            title: "line.qinghai",
            value: "6300",
            key: "6300",
            children: [
              {
                title: "line.qinghai.telecom",
                value: "6310",
                key: "6310",
              },
              {
                title: "line.qinghai.unicom",
                value: "6320",
                key: "6320",
              },
              {
                title: "line.qinghai.cmcc",
                value: "6330",
                key: "6330",
              },
            ],
          },
          {
            title: "line.ningxia",
            value: "6400",
            key: "6400",
            children: [
              {
                title: "line.ningxia.telecom",
                value: "6410",
                key: "6410",
              },
              {
                title: "line.ningxia.unicom",
                value: "6420",
                key: "6420",
              },
              {
                title: "line.ningxia.cmcc",
                value: "6430",
                key: "6430",
              },
            ],
          },
          {
            title: "line.xinjiang",
            value: "6500",
            key: "6500",
            children: [
              {
                title: "line.xinjiang.telecom",
                value: "6510",
                key: "6510",
              },
              {
                title: "line.xinjiang.unicom",
                value: "6520",
                key: "6520",
              },
              {
                title: "line.xinjiang.cmcc",
                value: "6530",
                key: "6530",
              },
            ],
          },
        ],
      },
      {
        title: "line.telecom",
        value: "100",
        key: "100",
      },
      {
        title: "line.unicom",
        value: "200",
        key: "200",
      },
      {
        title: "line.cmcc",
        value: "300",
        key: "300",
      },
      {
        title: "line.tietong",
        value: "400",
        key: "400",
      },
      {
        title: "line.cernet",
        value: "500",
        key: "500",
      },
    ],
  },
  {
    title: "line.overseas",
    value: "11",
    key: "11",
    children: [
      {
        title: "line.continent.asia",
        value: "81",
        key: "81",
        children: [
          {
            title: "line.continent.asia.east",
            value: "811",
            key: "811",
            children: [
              {
                title: "line.country.hk",
                value: "7100",
                key: "7100",
              },
              {
                title: "line.country.mo",
                value: "7200",
                key: "7200",
              },
              {
                title: "line.country.tw",
                value: "8100",
                key: "8100",
              },
              {
                title: "line.country.jp",
                value: "9415",
                key: "9415",
              },
              {
                title: "line.country.kp",
                value: "9565",
                key: "9565",
              },
              {
                title: "line.country.kr",
                value: "9688",
                key: "9688",
              },
              {
                title: "line.country.mn",
                value: "9514",
                key: "9514",
              },
            ],
          },
          {
            title: "line.continent.asia.southeast",
            value: "812",
            key: "812",
            children: [
              {
                title: "line.country.tl",
                value: "9727",
                key: "9727",
              },
              {
                title: "line.country.id",
                value: "9391",
                key: "9391",
              },
              {
                title: "line.country.bn",
                value: "9196",
                key: "9196",
              },
              {
                title: "line.country.sg",
                value: "9667",
                key: "9667",
              },
              {
                title: "line.country.kh",
                value: "9211",
                key: "9211",
              },
              {
                title: "line.country.th",
                value: "9724",
                key: "9724",
              },
              {
                title: "line.country.mm",
                value: "9529",
                key: "9529",
              },
              {
                title: "line.country.la",
                value: "9439",
                key: "9439",
              },
              {
                title: "line.country.ph",
                value: "9598",
                key: "9598",
              },
              {
                title: "line.country.vn",
                value: "9784",
                key: "9784",
              },
              {
                title: "line.country.my",
                value: "9475",
                key: "9475",
              },
            ],
          },
          {
            title: "line.continent.asia.central",
            value: "813",
            key: "813",
            children: [
              {
                title: "line.country.uz",
                value: "9775",
                key: "9775",
              },
              {
                title: "line.country.kg",
                value: "9436",
                key: "9436",
              },
              {
                title: "line.country.kz",
                value: "9424",
                key: "9424",
              },
              {
                title: "line.country.tm",
                value: "9748",
                key: "9748",
              },
              {
                title: "line.country.tj",
                value: "9718",
                key: "9718",
              },
            ],
          },
          {
            title: "line.continent.asia.south",
            value: "814",
            key: "814",
            children: [
              {
                title: "line.country.bt",
                value: "9175",
                key: "9175",
              },
              {
                title: "line.country.ir",
                value: "9394",
                key: "9394",
              },
              {
                title: "line.country.in",
                value: "9388",
                key: "9388",
              },
              {
                title: "line.country.bd",
                value: "9154",
                key: "9154",
              },
              {
                title: "line.country.np",
                value: "9538",
                key: "9538",
              },
              {
                title: "line.country.pk",
                value: "9577",
                key: "9577",
              },
              {
                title: "line.country.lk",
                value: "9697",
                key: "9697",
              },
              {
                title: "line.country.io",
                value: "9193",
                key: "9193",
              },
              {
                title: "line.country.af",
                value: "9100",
                key: "9100",
              },
              {
                title: "line.country.mv",
                value: "9478",
                key: "9478",
              },
            ],
          },
          {
            title: "line.continent.asia.west",
            value: "815",
            key: "815",
            children: [
              {
                title: "line.country.ye",
                value: "9796",
                key: "9796",
              },
              {
                title: "line.country.am",
                value: "9133",
                key: "9133",
              },
              {
                title: "line.country.il",
                value: "9406",
                key: "9406",
              },
              {
                title: "line.country.iq",
                value: "9397",
                key: "9397",
              },
              {
                title: "line.country.qa",
                value: "9610",
                key: "9610",
              },
              {
                title: "line.country.sy",
                value: "9715",
                key: "9715",
              },
              {
                title: "line.country.tr",
                value: "9745",
                key: "9745",
              },
              {
                title: "line.country.cy",
                value: "9265",
                key: "9265",
              },
              {
                title: "line.country.ps",
                value: "9583",
                key: "9583",
              },
              {
                title: "line.country.bh",
                value: "9151",
                key: "9151",
              },
              {
                title: "line.country.ge",
                value: "9331",
                key: "9331",
              },
              {
                title: "line.country.sa",
                value: "9652",
                key: "9652",
              },
              {
                title: "line.country.kw",
                value: "9433",
                key: "9433",
              },
              {
                title: "line.country.jo",
                value: "9421",
                key: "9421",
              },
              {
                title: "line.country.az",
                value: "9145",
                key: "9145",
              },
              {
                title: "line.country.om",
                value: "9574",
                key: "9574",
              },
              {
                title: "line.country.ae",
                value: "9763",
                key: "9763",
              },
              {
                title: "line.country.lb",
                value: "9445",
                key: "9445",
              },
            ],
          },
        ],
      },
      {
        title: "line.continent.aq",
        value: "9124",
        key: "9124",
      },
      {
        title: "line.continent.oceania",
        value: "84",
        key: "84",
        children: [
          {
            title: "line.country.gu",
            value: "9355",
            key: "9355",
          },
          {
            title: "line.country.mp",
            value: "9568",
            key: "9568",
          },
          {
            title: "line.country.ki",
            value: "9430",
            key: "9430",
          },
          {
            title: "line.country.fm",
            value: "9505",
            key: "9505",
          },
          {
            title: "line.country.pw",
            value: "9580",
            key: "9580",
          },
          {
            title: "line.country.nr",
            value: "9535",
            key: "9535",
          },
          {
            title: "line.country.mh",
            value: "9487",
            key: "9487",
          },
          {
            title: "line.country.tv",
            value: "9754",
            key: "9754",
          },
          {
            title: "line.country.ck",
            value: "9247",
            key: "9247",
          },
          {
            title: "line.country.tk",
            value: "9733",
            key: "9733",
          },
          {
            title: "line.country.to",
            value: "9736",
            key: "9736",
          },
          {
            title: "line.country.pf",
            value: "9322",
            key: "9322",
          },
          {
            title: "line.country.nu",
            value: "9559",
            key: "9559",
          },
          {
            title: "line.country.as",
            value: "9112",
            key: "9112",
          },
          {
            title: "line.country.ws",
            value: "9643",
            key: "9643",
          },
          {
            title: "line.country.nz",
            value: "9547",
            key: "9547",
          },
          {
            title: "line.country.au",
            value: "9139",
            key: "9139",
          },
          {
            title: "line.country.nf",
            value: "9562",
            key: "9562",
          },
          {
            title: "line.country.pg",
            value: "9589",
            key: "9589",
          },
          {
            title: "line.country.sb",
            value: "9679",
            key: "9679",
          },
          {
            title: "line.country.nc",
            value: "9544",
            key: "9544",
          },
          {
            title: "line.country.vu",
            value: "9778",
            key: "9778",
          },
          {
            title: "line.country.cx",
            value: "9232",
            key: "9232",
          },
          {
            title: "line.country.fj",
            value: "9310",
            key: "9310",
          },
          {
            title: "line.country.wf",
            value: "9793",
            key: "9793",
          },
        ],
      },
      {
        title: "line.continent.europe",
        value: "82",
        key: "82",
        children: [
          {
            title: "line.continent.europe.east",
            value: "821",
            key: "821",
            children: [
              {
                title: "line.country.ua",
                value: "9760",
                key: "9760",
              },
              {
                title: "line.country.ru",
                value: "9619",
                key: "9619",
              },
              {
                title: "line.country.bg",
                value: "9199",
                key: "9199",
              },
              {
                title: "line.country.hu",
                value: "9382",
                key: "9382",
              },
              {
                title: "line.country.cz",
                value: "9268",
                key: "9268",
              },
              {
                title: "line.country.md",
                value: "9508",
                key: "9508",
              },
              {
                title: "line.country.sk",
                value: "9673",
                key: "9673",
              },
              {
                title: "line.country.pl",
                value: "9601",
                key: "9601",
              },
              {
                title: "line.country.ba",
                value: "9184",
                key: "9184",
              },
              {
                title: "line.country.by",
                value: "9160",
                key: "9160",
              },
              {
                title: "line.country.ro",
                value: "9616",
                key: "9616",
              },
            ],
          },
          {
            title: "line.continent.europe.north",
            value: "822",
            key: "822",
            children: [
              {
                title: "line.country.dk",
                value: "9271",
                key: "9271",
              },
              {
                title: "line.country.is",
                value: "9385",
                key: "9385",
              },
              {
                title: "line.country.ax",
                value: "9103",
                key: "9103",
              },
              {
                title: "line.country.lv",
                value: "9442",
                key: "9442",
              },
              {
                title: "line.country.no",
                value: "9571",
                key: "9571",
              },
              {
                title: "line.country.fo",
                value: "9307",
                key: "9307",
              },
              {
                title: "line.country.ie",
                value: "9400",
                key: "9400",
              },
              {
                title: "line.country.ee",
                value: "9298",
                key: "9298",
              },
              {
                title: "line.country.se",
                value: "9709",
                key: "9709",
              },
              {
                title: "line.country.lt",
                value: "9460",
                key: "9460",
              },
              {
                title: "line.country.fi",
                value: "9313",
                key: "9313",
              },
              {
                title: "line.country.gb",
                value: "9766",
                key: "9766",
              },
              {
                title: "line.country.im",
                value: "9403",
                key: "9403",
              },
            ],
          },
          {
            title: "line.continent.europe.south",
            value: "823",
            key: "823",
            children: [
              {
                title: "line.country.hr",
                value: "9256",
                key: "9256",
              },
              {
                title: "line.country.sm",
                value: "9646",
                key: "9646",
              },
              {
                title: "line.country.rs",
                value: "9658",
                key: "9658",
              },
              {
                title: "line.country.ad",
                value: "9115",
                key: "9115",
              },
              {
                title: "line.country.gr",
                value: "9343",
                key: "9343",
              },
              {
                title: "line.country.it",
                value: "9409",
                key: "9409",
              },
              {
                title: "line.country.si",
                value: "9676",
                key: "9676",
              },
              {
                title: "line.country.gg",
                value: "9361",
                key: "9361",
              },
              {
                title: "line.country.va",
                value: "9376",
                key: "9376",
              },
              {
                title: "line.country.je",
                value: "9418",
                key: "9418",
              },
              {
                title: "line.country.gi",
                value: "9340",
                key: "9340",
              },
              {
                title: "line.country.pt",
                value: "9604",
                key: "9604",
              },
              {
                title: "line.country.es",
                value: "9694",
                key: "9694",
              },
              {
                title: "line.country.al",
                value: "9106",
                key: "9106",
              },
              {
                title: "line.country.mk",
                value: "9466",
                key: "9466",
              },
              {
                title: "line.country.mt",
                value: "9484",
                key: "9484",
              },
              {
                title: "line.country.me",
                value: "9517",
                key: "9517",
              },
            ],
          },
          {
            title: "line.continent.europe.west",
            value: "824",
            key: "824",
            children: [
              {
                title: "line.country.li",
                value: "9457",
                key: "9457",
              },
              {
                title: "line.country.lu",
                value: "9463",
                key: "9463",
              },
              {
                title: "line.country.at",
                value: "9142",
                key: "9142",
              },
              {
                title: "line.country.de",
                value: "9334",
                key: "9334",
              },
              {
                title: "line.country.mc",
                value: "9511",
                key: "9511",
              },
              {
                title: "line.country.be",
                value: "9163",
                key: "9163",
              },
              {
                title: "line.country.fr",
                value: "9316",
                key: "9316",
              },
              {
                title: "line.country.ch",
                value: "9712",
                key: "9712",
              },
              {
                title: "line.country.nl",
                value: "9541",
                key: "9541",
              },
            ],
          },
        ],
      },
      {
        title: "line.continent.america",
        value: "85",
        key: "85",
        children: [
          {
            title: "line.continent.america.central",
            key: "851",
            value: "851",
            children: [
              {
                title: "line.country.bz",
                value: "9166",
                key: "9166",
              },
              {
                title: "line.country.gt",
                value: "9358",
                key: "9358",
              },
              {
                title: "line.country.cr",
                value: "9250",
                key: "9250",
              },
              {
                title: "line.country.ni",
                value: "9550",
                key: "9550",
              },
              {
                title: "line.country.pa",
                value: "9586",
                key: "9586",
              },
              {
                title: "line.country.hn",
                value: "9379",
                key: "9379",
              },
              {
                title: "line.country.sv",
                value: "9289",
                key: "9289",
              },
              {
                title: "line.country.mx",
                value: "9502",
                key: "9502",
              },
            ],
          },
          {
            title: "line.continent.america.caribbean",
            value: "852",
            key: "852",
            children: [
              {
                title: "line.country.cu",
                value: "9259",
                key: "9259",
              },
              {
                title: "line.country.lc",
                value: "9631",
                key: "9631",
              },
              {
                title: "line.country.kn",
                value: "9628",
                key: "9628",
              },
              {
                title: "line.country.bl",
                value: "9625",
                key: "9625",
              },
              {
                title: "line.country.vc",
                value: "9640",
                key: "9640",
              },
              {
                title: "line.country.pm",
                value: "9637",
                key: "9637",
              },
              {
                title: "line.country.dm",
                value: "9277",
                key: "9277",
              },
              {
                title: "line.country.do",
                value: "9280",
                key: "9280",
              },
              {
                title: "line.country.ai",
                value: "9121",
                key: "9121",
              },
              {
                title: "line.country.ag",
                value: "9127",
                key: "9127",
              },
              {
                title: "line.country.bs",
                value: "9148",
                key: "9148",
              },
              {
                title: "line.country.bb",
                value: "9157",
                key: "9157",
              },
              {
                title: "line.country.cw",
                value: "9262",
                key: "9262",
              },
              {
                title: "line.country.ky",
                value: "9220",
                key: "9220",
              },
              {
                title: "line.country.gd",
                value: "9349",
                key: "9349",
              },
              {
                title: "line.country.mf",
                value: "9634",
                key: "9634",
              },
              {
                title: "line.country.pr",
                value: "9607",
                key: "9607",
              },
              {
                title: "line.country.ht",
                value: "9373",
                key: "9373",
              },
              {
                title: "line.country.jm",
                value: "9412",
                key: "9412",
              },
              {
                title: "line.country.tc",
                value: "9751",
                key: "9751",
              },
              {
                title: "line.country.tt",
                value: "9739",
                key: "9739",
              },
              {
                title: "line.country.gp",
                value: "9352",
                key: "9352",
              },
              {
                title: "line.country.vi",
                value: "9790",
                key: "9790",
              },
              {
                title: "line.country.vg",
                value: "9787",
                key: "9787",
              },
              {
                title: "line.country.sx",
                value: "9670",
                key: "9670",
              },
              {
                title: "line.country.ms",
                value: "9520",
                key: "9520",
              },
              {
                title: "line.country.aw",
                value: "9136",
                key: "9136",
              },
              {
                title: "line.country.mq",
                value: "9490",
                key: "9490",
              },
            ],
          },
          {
            title: "line.continent.america.north",
            value: "853",
            key: "853",
            children: [
              {
                title: "line.country.ca",
                value: "9217",
                key: "9217",
              },
              {
                title: "line.country.gl",
                value: "9346",
                key: "9346",
              },
              {
                title: "line.country.bm",
                value: "9172",
                key: "9172",
              },
              {
                title: "line.country.us",
                value: "9769",
                key: "9769",
              },
            ],
          },
          {
            title: "line.continent.america.south",
            value: "854",
            key: "854",
            children: [
              {
                title: "line.country.uy",
                value: "9772",
                key: "9772",
              },
              {
                title: "line.country.ec",
                value: "9283",
                key: "9283",
              },
              {
                title: "line.country.co",
                value: "9235",
                key: "9235",
              },
              {
                title: "line.country.gy",
                value: "9370",
                key: "9370",
              },
              {
                title: "line.country.ve",
                value: "9781",
                key: "9781",
              },
              {
                title: "line.country.py",
                value: "9592",
                key: "9592",
              },
              {
                title: "line.country.br",
                value: "9190",
                key: "9190",
              },
              {
                title: "line.country.cl",
                value: "9229",
                key: "9229",
              },
              {
                title: "line.country.gf",
                value: "9319",
                key: "9319",
              },
              {
                title: "line.country.bo",
                value: "9178",
                key: "9178",
              },
              {
                title: "line.country.fk",
                value: "9304",
                key: "9304",
              },
              {
                title: "line.country.pe",
                value: "9595",
                key: "9595",
              },
              {
                title: "line.country.sr",
                value: "9703",
                key: "9703",
              },
              {
                title: "line.country.bq",
                value: "9181",
                key: "9181",
              },
              {
                title: "line.country.ar",
                value: "9130",
                key: "9130",
              },
            ],
          },
        ],
      },
      {
        title: "line.continent.africa",
        value: "83",
        key: "83",
        children: [
          {
            title: "line.continent.africa.east",
            value: "831",
            key: "831",
            children: [
              {
                title: "line.country.ug",
                value: "9757",
                key: "9757",
              },
              {
                title: "line.country.ss",
                value: "9691",
                key: "9691",
              },
              {
                title: "line.country.rw",
                value: "9622",
                key: "9622",
              },
              {
                title: "line.country.er",
                value: "9295",
                key: "9295",
              },
              {
                title: "line.country.dj",
                value: "9274",
                key: "9274",
              },
              {
                title: "line.country.tz",
                value: "9721",
                key: "9721",
              },
              {
                title: "line.country.et",
                value: "9301",
                key: "9301",
              },
              {
                title: "line.country.sc",
                value: "9661",
                key: "9661",
              },
              {
                title: "line.country.bi",
                value: "9205",
                key: "9205",
              },
              {
                title: "line.country.mu",
                value: "9496",
                key: "9496",
              },
              {
                title: "line.country.zw",
                value: "9802",
                key: "9802",
              },
              {
                title: "line.country.km",
                value: "9238",
                key: "9238",
              },
              {
                title: "line.country.so",
                value: "9682",
                key: "9682",
              },
              {
                title: "line.country.ke",
                value: "9427",
                key: "9427",
              },
              {
                title: "line.country.mz",
                value: "9526",
                key: "9526",
              },
              {
                title: "line.country.zm",
                value: "9799",
                key: "9799",
              },
              {
                title: "line.country.mw",
                value: "9472",
                key: "9472",
              },
              {
                title: "line.country.yt",
                value: "9499",
                key: "9499",
              },
              {
                title: "line.country.mg",
                value: "9469",
                key: "9469",
              },
            ],
          },
          {
            title: "line.continent.africa.central",
            value: "832",
            key: "832",
            children: [
              {
                title: "line.country.cf",
                value: "9223",
                key: "9223",
              },
              {
                title: "line.country.td",
                value: "9226",
                key: "9226",
              },
              {
                title: "line.country.cg",
                value: "9241",
                key: "9241",
              },
              {
                title: "line.country.cd",
                value: "9244",
                key: "9244",
              },
              {
                title: "line.country.ga",
                value: "9325",
                key: "9325",
              },
              {
                title: "line.country.cm",
                value: "9214",
                key: "9214",
              },
              {
                title: "line.country.ao",
                value: "9118",
                key: "9118",
              },
              {
                title: "line.country.gq",
                value: "9292",
                key: "9292",
              },
            ],
          },
          {
            title: "line.continent.africa.north",
            value: "833",
            key: "833",
            children: [
              {
                title: "line.country.ly",
                value: "9454",
                key: "9454",
              },
              {
                title: "line.country.eg",
                value: "9286",
                key: "9286",
              },
              {
                title: "line.country.ma",
                value: "9523",
                key: "9523",
              },
              {
                title: "line.country.tn",
                value: "9742",
                key: "9742",
              },
              {
                title: "line.country.sd",
                value: "9700",
                key: "9700",
              },
              {
                title: "line.country.dz",
                value: "9109",
                key: "9109",
              },
            ],
          },
          {
            title: "line.continent.africa.south",
            value: "834",
            key: "834",
            children: [
              {
                title: "line.country.za",
                value: "9685",
                key: "9685",
              },
              {
                title: "line.country.bw",
                value: "9187",
                key: "9187",
              },
              {
                title: "line.country.sz",
                value: "9706",
                key: "9706",
              },
              {
                title: "line.country.na",
                value: "9532",
                key: "9532",
              },
              {
                title: "line.country.ls",
                value: "9448",
                key: "9448",
              },
            ],
          },
          {
            title: "line.continent.africa.west",
            value: "835",
            key: "835",
            children: [
              {
                title: "line.country.cv",
                value: "9208",
                key: "9208",
              },
              {
                title: "line.country.gm",
                value: "9328",
                key: "9328",
              },
              {
                title: "line.country.gn",
                value: "9364",
                key: "9364",
              },
              {
                title: "line.country.gw",
                value: "9367",
                key: "9367",
              },
              {
                title: "line.country.lr",
                value: "9451",
                key: "9451",
              },
              {
                title: "line.country.gh",
                value: "9337",
                key: "9337",
              },
              {
                title: "line.country.sn",
                value: "9655",
                key: "9655",
              },
              {
                title: "line.country.sl",
                value: "9664",
                key: "9664",
              },
              {
                title: "line.country.tg",
                value: "9730",
                key: "9730",
              },
              {
                title: "line.country.ng",
                value: "9556",
                key: "9556",
              },
              {
                title: "line.country.ne",
                value: "9553",
                key: "9553",
              },
              {
                title: "line.country.bf",
                value: "9202",
                key: "9202",
              },
              {
                title: "line.country.mr",
                value: "9493",
                key: "9493",
              },
              {
                title: "line.country.bj",
                value: "9169",
                key: "9169",
              },
              {
                title: "line.country.ml",
                value: "9481",
                key: "9481",
              },
              {
                title: "line.country.ci",
                value: "9253",
                key: "9253",
              },
              {
                title: "line.country.st",
                value: "9649",
                key: "9649",
              },
              {
                title: "line.country.re",
                value: "9613",
                key: "9613",
              },
            ],
          },
        ],
      },
    ],
  },
];

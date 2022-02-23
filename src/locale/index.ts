import { useState, useEffect } from "react";
import { from, BehaviorSubject } from "rxjs";
import WorldMap from "./world";
import ChinaMap from "./china";
import useBehaviorSubject from "../hooks/useBehaviorSubject";
// import zh_CN from "@/locale/zh_CN";

const locale$ = new BehaviorSubject<string | null>(null);

export const useLanguage = () => {
  const [localePackage, setLocalePackage] = useState(null);
  const lang = useBehaviorSubject(locale$);
  useEffect(() => {
    const sub = from(loadLanPkg(lang)).subscribe((pkg: any) => {
      if (pkg) {
        setLocalePackage(pkg);
      }
    });
    return () => sub.unsubscribe();
  }, [lang]);
  return localePackage;
};

export const setLanguage = (type: string) => {
  locale$.next(type);
};
export const getMapLanguage = (mapType: "world" | "china") => {
  const mapCollection: any = mapType === "world" ? WorldMap : ChinaMap;
  return mapCollection["en_US"];
};
const loadLanPkg = (lan: any) => {
  switch (lan) {
    case "zh_CN":
      return import("@/locale/zh_CN");
    case "zh_TW":
      return import("@/locale/zh_TW");
    default:
      return import("@/locale/en_US");
  }
};

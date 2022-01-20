import { useState, useEffect } from "react";
import { from, BehaviorSubject } from "rxjs";
import useBehaviorSubject from "../hooks/useBehaviorSubject";

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

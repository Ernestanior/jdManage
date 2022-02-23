import React from "react";
import { TreeSelect } from "antd";
import _ from "underscore";
// import Language from '@/locale'
import { ITree } from "@/common/data/area_tree";
import { ISupplierContent } from "@/store/network/stat/interface";

export const removeDuplicates = (arr: any, key: string = "key") =>
  arr.reduce((acc: any, current: any) => {
    const found = acc.find((item: any) => item[key] === current[key]);
    if (!found) return acc.concat([current]);
    else return acc;
  }, []);

export const createTreeNode = (data: ITree[] | ITree) => {
  if (Array.isArray(data)) {
    const els: any[] = [];
    for (const t of data) {
      els.push(createTreeNode(t) as React.ReactNode);
    }
    return els;
  }
  return (
    <TreeSelect.TreeNode value={data.value} key={data.key} title={data.title}>
      {data.children && createTreeNode(data.children)}
    </TreeSelect.TreeNode>
  );
};

export const deepSearch = (data: any, search: any, n = 0): any => {
  if (!Array.isArray(data)) data = new Array(data);
  let res = _.findWhere(data, search),
    children: any;
  if (res) return res;
  children = _.filter(data, (d: any) => d.hasOwnProperty("children"));
  if (children.length) n = children.length - 1;
  else return false;
  while (!res) {
    res = deepSearch(children[n]["children"], search, n);
    if (res) return res;
    if (n > 0) n--;
    else return false;
  }
};

export const mapToObj = (treeData: any, data: any) =>
  data.map((item: any) => {
    const { title, key } = deepSearch(treeData, { key: item });
    return { title, key: parseInt(key) };
  });

export const mapToKey = (treeData: any, data: any) =>
  data.map((item: any) => parseInt(deepSearch(treeData, { key: item })["key"]));

export const excludeCustomSupplier = (suppliers: ISupplierContent[]) => {
  return suppliers.filter(
    (s: ISupplierContent) => s.name.toLowerCase().indexOf("cname") === -1
  );
};

export const isEmptyObj = (obj: any) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

// eslint-disable-next-line
// export const emailRegex =
//   /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const isArrayEqual = (_arr1: any, _arr2: any): boolean => {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  )
    return false;
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

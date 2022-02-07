import { Template } from "@/components/template";
import useUid from "@/hooks/useUid";
import { useSiteSupplierList$ } from "@/store/network/supplier";
import SupplierService from "@/store/network/supplier/service";
import React, { FC, ReactElement, useEffect, useState } from "react";

const Index: FC = (): ReactElement => {
  const uid = useUid();
  const supplierList = useSiteSupplierList$();
  const [chooseFlag, setChooseFlag] = useState<boolean>(false);
  console.log(supplierList);

  const TempConfig = {
    optList: [
      {
        text: "修改",
        event: (data: any) => {},
      },
      {
        text: "编辑",
        event: (data: any) => {
          // setEditRow(data);
          // setEditFlag(true);
        },
      },
    ],
    onSearch: (params: any) => {
      const { searchPage } = params;
      SupplierService.findSiteSupplierList({
        searchPage,
        uid,
      });
    },
    normalBtns: [
      {
        text: "选择平台",
        onClick: () => setChooseFlag(true),
      },
    ],
    rowId: "uid",
    data: supplierList,
    config: [
      {
        title: "名称",
        dataIndex: "displayName",
        key: "displayName",
      },
      {
        title: "服务源",
        dataIndex: "option",
        key: "option",
      },
    ],
  };
  return (
    <div>
      <Template closeFilter primarySearch="name" {...TempConfig} />
    </div>
  );
};

export default Index;

import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import { usePlatformManage, useSupplierInfo } from "@/store/network/platformMange";
import platformManage from "@/store/network/platformMange/service";
import { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {
  const [params, setParams] = useState<any>();
  const supplierList = usePlatformManage();
  const supplierInfo = useSupplierInfo();
  const [option, setOption] = useState<Object[]>([]);

  useEffect(() => {
    if (props.type === "ddos-global") {
      platformManage?.SupplierInfo("ddos-global");
    }
  }, [props.type]);
  useEffect(() => {
    if (supplierInfo) {
      let platformOption: object[] = [];
      Object.entries(supplierInfo).map((item: any) => {
        let a = item[1];
        platformOption.push({ uid: a.code, name: a.displayName });
      });
      console.log(platformOption);

      setOption(platformOption);
    }
  }, [supplierInfo]);

  useEffect(() => {
    if (props.type === "ddos-global") {
      if (params) {
        if (params.filters !== undefined) {
          platformManage?.SupplierAccountList({
            keyword: params.filters.keyword,
            searchPage: params.searchPage,
            type: props.type,
            supplier: params.filters.supplier,
            name: params.filters.name,
          });
        } else {
          platformManage?.SupplierAccountList({
            searchPage: { desc: 0, page: 1, pageSize: 25, sort: "name" },
            keyword: "",
            name: "",
            supplier: "",
          });
        }
      }
  
    }
     }, [params, props.type]);

  const TempConfig = {
    normalBtns: [
      {
        text: "新增站点",
        onClick: () => true,
      },
    ],
    onSearch: (params: any) => {
      setParams(params);
    },
    rowId: "uid",
    data: supplierList,
    config: [
      {
        title: "平台账号",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "平台",
        dataIndex: "supplier",
        key: "supplier",
        render: (key: any) => <div>{key.displayName}</div>,
      },
      {
        title: "使用客户量",
        dataIndex: "customerCount",
        key: "customerCount",
      },
      {
        title: "域名額度",
        dataIndex: "quota",
        key: "quota",
        render: (key: any) => {
          return (
            <div>
              {key !== null
                ? `${key.domain.allocated}/${key.domain.capacity}`
                : "-"}
            </div>
          );
        },
      },
    ],
  };

  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "平台账号",
            name: "name",
            type: "input",
          },
          {
            text: "平台",
            name: "supplier",
            data: option,
            type: "select",
          },
        ]}
        {...TempConfig}
      ></Template>
    </div>
  );
};

export default Index;

import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import { useDnsCertList, useDnsCustomerList } from "@/store/network/dnsManage";
import dnsManage from "@/store/network/dnsManage/service";
import {
  useSslManageCerList,
  useSslManageCustomerList,
  useSslManageOriginCertList,
} from "@/store/network/sslMange";
import sslManage from "@/store/network/sslMange/service";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {

  useEffect(() => {
    setParams([]);
    setConfig([]);
    setOption([]);
    setfilterOption([]);
    setBatchBtns([]);
    setNormalBtns([]);
    setData([]);
    setKey("");
  }, [props.type])
  
  const [params, setParams] = useState<any>();
  const [config, setConfig] = useState<any>();
  const [option, setOption] = useState<any>();
  const [filterOption, setfilterOption] = useState<any>();
  const [batchBtns, setBatchBtns] = useState<any>();
  const [normalBtns, setNormalBtns] = useState<any>();
  const [data, setData] = useState<any>();
  const [key, setKey] = useState<string>("key");
  const [newCertList, setNewCertList] = useState<any>();
  // const [dropDownFunction, setDropdownFunction] = useState<VoidFunction>();
  //const customerList = useSslManageCustomerList();
  const certList = useSslManageCerList();
  const originCertList = useSslManageOriginCertList();
  const dnsCunstomerList = useDnsCustomerList();
  const dnsCertList = useDnsCertList();

  // useEffect(() => {
  //   sslManage.customerList({ page: 1, pageSize: 1000000 });
  // }, []);

  // const x= ()=>{
  //   return
  // }

  useEffect(() => {
    if (props.type === 1) {
      cusSsl();
      // setDropdownFunction(x)
    } else if (props.type === 2) {
      Ssl();
    } else if (props.type === 3) {
      SslDownload();
    }
  }, [props.type]);

  const cusSsl = () => {
    if (params !== undefined) {
      if (params.filters !== undefined) {
        sslManage?.certList({
          sslDomains: params.filters.sslDomains,
          searchPage: params.searchPage,
          keyword: params.filters.keyword,
          //   type: props.type,
          site: { name: params.filters.site },
          customer: { name: params.filters.customer },
        });
      }
    }
  };
  const Ssl = () => {
    if (params !== undefined) {
      if (params.filters !== undefined) {
        sslManage?.originCertList({
          sslDomains: params.filters.sslDomains,
          searchPage: params.searchPage,
          keyword: params.filters.keyword,
          customer: { name: params.filters.customer },
        });
        dnsManage?.customerList({ page: 1, pageSize: 99999 });
      }
    }
  };
  const SslDownload = () => {
    if (params !== undefined) {
      if (params.filters !== undefined) {
        dnsManage?.certList({
          sslDomains: params.filters.sslDomains,
          customerUid: params.filters.customerUid,
          searchPage: params.searchPage,
          keyword: params.filters.keyword,
        });
      }
    }
  };

  useEffect(() => {
    if (props.type === 1) {
      const arr = certList?.content.map((item: any, key: number) => ({
        ...item,
        key: key,
      }));
      const obj: object = {
        content: arr,
        number: certList?.number,
        numberOfElements: certList?.numberOfElements,
        size: certList?.size,
        sort: certList?.sort,
        totalElements: certList?.totalElements,
        totalPages: certList?.totalPages,
      };
      setNewCertList(obj);
    } else if (props.type === 2) {
      if (dnsCunstomerList) {
        let filterOption: object[] = [];
        Object.entries(dnsCunstomerList?.content).map((item: any) => {
          let a = item[1];
          filterOption.push({ uid: a.uid, name: a.name });
        });
        setfilterOption(filterOption);
      }
    }
  }, [props.type]);

  useEffect(() => {
    if (props.type === 1) {
      setOption(option1);
      setConfig(config1);
      setBatchBtns(batchBtns1);
      setNormalBtns(normalBtns1);
      setData(newCertList);
      setKey("key");
      // setDropdownFunction(x)
    } else if (props.type === 2) {
      setOption(option2);
      setConfig(config2);
      setBatchBtns(batchBtns2);
      setNormalBtns(normalBtns2);
      setData(originCertList);
      setKey("uid");
    } else if (props.type === 3) {
      setOption(option3);
      setConfig(config3);
      setBatchBtns([]);
      setNormalBtns([]);
      setData(dnsCertList);
      setKey("uid");
    }
  }, [props.type]);

  let config1 = [
    {
      title: "证书",
      dataIndex: "sslDomains",
      key: "sslDomains",
    },
    {
      title: "相关域名",
      dataIndex: "domains",
      key: "domains",
      render: (key: any) => {
        return <div>{key !== null ? `${key}` : `-`}</div>;
      },
    },
    {
      title: "网站",
      dataIndex: "site",
      key: "site",
      render: (key: any) => {
        if (key !== null) {
          return <div>{key.name}</div>;
        } else {
          return <div>-</div>;
        }
      },
    },
    {
      title: "过期时间",
      dataIndex: "sslExpire",
      key: "sslExpire",
    },
    {
      title: "类型",
      dataIndex: "sslAuto",
      key: "sslAuto",
    },
  ];

  let config2 = [
    {
      title: "证书",
      dataIndex: "sslDomains",
      key: "sslDomains",
    },
    {
      title: "相关域名",
      dataIndex: "domains",
      key: "domains",
    },
    {
      title: "网站",
      dataIndex: "site",
      key: "site",
      render: (key: any) => {
        if (key !== null) {
          return <div>{key.name}</div>;
        } else {
          return <div>-</div>;
        }
      },
    },
    {
      title: "过期时间",
      dataIndex: "sslExpire",
      key: "sslExpire",
    },
    {
      title: "客户",
      dataIndex: "customer",
      key: "customer",
      render: (key: any) => {
        if (key !== null) {
          return <div>{key.name}</div>;
        }
      },
    },
  ];

  let config3 = [
    {
      title: "证书",
      dataIndex: "sslDomains",
      key: "sslDomains",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "到期时间",
      dataIndex: "",
      key: "",
      render: () => {
        return <div>-</div>;
      },
    },
    {
      title: "申请时间",
      dataIndex: "operateTime",
      key: "operateTime",
      render: (key: any) => {
        if (key !== null) {
          const x = moment(key).format("YYYY-MM-DD h:mm:ss");
          return <div>{x}</div>;
        } else return <div>-</div>;
      },
    },
    {
      title: "客户",
      dataIndex: "customer",
      key: "customer",
      render: (key: any) => {
        if (key !== null) {
          return <div>{key.name}</div>;
        } else return <div>-</div>;
      },
    },
  ];

  let option1 = [
    {
      text: "证书",
      name: "sslDomains",
      type: "input",
    },
    {
      text: "网站",
      name: "site",
      type: "input",
    },
    {
      text: "客户",
      name: "customer",
      type: "input",
    },
  ];
  let option2 = [
    {
      text: "证书",
      name: "sslDomains",
      type: "input",
    },
    {
      text: "客户",
      name: "customer",
      type: "input",
    },
  ];

  let option3 = [
    {
      text: "证书",
      name: "sslDomains",
      type: "input",
    },
    {
      text: "客户",
      name: "customerUid",
      data: filterOption,
      type: "select",
    },
  ];

  const batchBtns1 = [
    {
      text: "大量删除",
      onClick: (value: any) => {
        // setEnableFlag(true);
        // setSelectedKey(value);
      },
    },
  ];
  const batchBtns2 = [
    {
      text: "大量删除",
      onClick: (value: any) => {
        // setEnableFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  const normalBtns1 = [
    {
      text: "上传证书",
      onClick: (value: any) => {
        // setDeleteFlag(true);
        // setSelectedKey(value);
      },
    },
  ];
  const normalBtns2 = [
    {
      text: "申请证书",
      onClick: (value: any) => {
        // setDeleteFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  const TempConfig = {
    batchBtns: batchBtns ? batchBtns : [],
    onSearch: (params: any) => setParams(params),
    rowId: key,
    data: data,
    config: config ? config : [],
    normalBtns: normalBtns,
  };

  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={option}
        {...TempConfig}
      ></Template>
    </div>
  );
};

export default Index;

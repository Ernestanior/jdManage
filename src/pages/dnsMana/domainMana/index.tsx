import { Template } from "@/components/template";
import { dnsManageApi } from "@/store/api";
import DnsManageAPI from "@/store/api/dnsManage";
import { useDomainList } from "@/store/network/dnsManage";
import { useDnsCustomerList } from "@/store/network/dnsManage";
import dnsManage from "@/store/network/dnsManage/service";
import request from "@/store/request";
import { Form, Drawer, Input, Select, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useEffect, useState } from "react";
import { from } from "rxjs";

const Index: FC = () => {
  const [AddForm] = Form.useForm();
  const [CloneForm] = Form.useForm();
  const domainList = useDomainList();
  const customerList = useDnsCustomerList();
  const [params, setParams] = useState<any>();
  const [option, setOption] = useState<Object[]>([]);
  const [addDomainOption, setAddDomainOption] = useState<Object[]>([]);
  const [addDrawer, setAddDrawer] = useState<boolean>(false);
  const [cloneDrawer, setCloneDrawer] = useState<boolean>(false);
  const [cloneData, setCloneData] = useState<any>(false);
  useEffect(() => {
    if (params) {
      if (params.filters !== undefined) {
        dnsManage?.domainList({
          keyword: params.filters.keyword,
          searchPage: params.searchPage,
          customerUid: params.filters.customerUid,
          status: params.filters.status,
        });
      } else {
        dnsManage?.domainList({
          searchPage: { desc: 0, page: 1, pageSize: 25, sort: "name" },
        });
      }
    }
  }, [params]);

  const showAddDrawer = () => {
    setAddDrawer(true);
  };

  const closeAddDrawer = () => {
    setAddDrawer(false);
  };

  const showCloneDrawer = () => {
    setCloneDrawer(true);
  };

  const closeCLoneDrawer = () => {
    setCloneDrawer(false);
  };

  useEffect(() => {
    dnsManage?.customerList({
      searchPage: { page: 1, pageSize: 99999 },
      type: "customer",
    });
  }, []);

  useEffect(() => {
    if (customerList) {
      let dnsOption: object[] = [];
      let adddomainOption: object[] = [];
      Object.entries(customerList?.content).forEach((item: any) => {
        let a = item[1];
        dnsOption.push({ uid: a.uid, name: a.name });
        adddomainOption.push({ value: a.uid, label: a.name });
      });
      setAddDomainOption(adddomainOption);
      setOption(dnsOption);
    }
  }, [customerList]);

  const TempConfig = {
    optList: [
      {
        text: "记录管理",
        event: (data: any) => {},
      },
      {
        text: "申请证书",
        event: (data: any) => {
          console.log(data.uid);
          let uid = { domainUid: data.uid, records: [data.name] };
          from(request(dnsManageApi.CertRequest(uid))).subscribe((data) => {
            console.log(data);
          });
        },
      },
      {
        text: "克隆",
        event: (data: any) => {
          console.log(data);

          setCloneData(data);
          showCloneDrawer();
        },
      },
      {
        text: "状态",
        event: (data: any) => {
          console.log(data);
          let uid = [data.uid];
          if (data.status === "enabled") {
            from(request(dnsManageApi.Disable(uid))).subscribe((data) => {
              if (data) {
              }
            });
          } else {
            from(request(dnsManageApi.Enable(uid))).subscribe((data) => {
              if (data) {
              }
            });
          }
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          let uid = [data.uid];
          from(request(dnsManageApi.DomainDelete(uid))).subscribe((data) => {
            if (data) {
            }
          });
        },
      },
    ],
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          from(request(dnsManageApi.DomainDelete(value))).subscribe((data) => {
            if (data) {
            }
          });
        },
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          from(request(dnsManageApi.Enable(value))).subscribe((data) => {
            if (data) {
            }
          });
        }
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          from(request(dnsManageApi.Disable(value))).subscribe((data) => {
            if (data) {
            }
          });
        },
      },
    ],
    normalBtns: [
      {
        text: "新增站点",
        onClick: () => {
          showAddDrawer();
        },
      },
    ],
    onSearch: (params: any) => {
      setParams(params);
    },
    rowId: "uid",
    data: domainList,
    config: [
      {
        title: "功能变数名称",
        dataIndex: "displayName",
        key: "displayName",
      },
      {
        title: "域名状态",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
      },
      {
        title: "客户",
        dataIndex: "customer",
        key: "customer",
        render: (key: any) => {
          return <div>{key.name}</div>;
        },
      },
    ],
  };

  const AddNewDomain = (key: string[]) => {
    from(request(dnsManageApi.CreateDomain(key))).subscribe((data) => {
      if (data) {
      }
    });
  };

  const clone = (data: any) => {
    console.log(data.names.replace(/\n/g, ",").split(","));
    let cloneNameArr = data.names.replace(/\n/g, ",").split(",");
    let cloneValue = { names: cloneNameArr, uid: data.uid };
    from(request(dnsManageApi.CloneDomain(cloneValue))).subscribe((data) => {
      if (data) {
      }
    });
  };

  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "功能变数名称",
            name: "name",
            type: "input",
          },
          {
            text: "域名状态",
            name: "status",
            data: [
              { uid: "enabled", name: "已启用" },
              { uid: "disabled", name: "未启用" },
            ],
            type: "select",
          },
          {
            text: "客户",
            name: "customerUid",
            data: option,
            type: "select",
          },
        ]}
        {...TempConfig}
      ></Template>
      <Drawer
        title="添加"
        placement="left"
        onClose={closeAddDrawer}
        visible={addDrawer}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={AddForm}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          onFinish={AddNewDomain}
        >
          <Form.Item label="域名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="选择用户" name="customerUid">
            <Select options={addDomainOption}></Select>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <TextArea />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="添加"
        placement="left"
        onClose={closeCLoneDrawer}
        visible={cloneDrawer}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={CloneForm}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          onFinish={clone}
        >
          <Form.Item label="已选域名" name="uid" initialValue={cloneData?.uid}>
            <label>{cloneData?.name}</label>
          </Form.Item>
          <Form.Item label="新域名" name="names">
            <TextArea />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">确认</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Index;

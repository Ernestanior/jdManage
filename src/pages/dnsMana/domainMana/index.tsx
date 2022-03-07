import { Template } from "@/components/template";
import { dnsApi } from "@/store/api";
import request from "@/store/request";
import { Form, Drawer, Input, Select, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useEffect, useState } from "react";
import { from } from "rxjs";

const Index: FC = () => {
  const [AddForm] = Form.useForm();
  const [CloneForm] = Form.useForm();
  const [domainList, setdomainList] = useState();
  const [params, setParams] = useState<any>();
  const [option, setOption] = useState<Object[]>([]);
  const [addDomainOption, setAddDomainOption] = useState<Object[]>([]);
  const [addDrawer, setAddDrawer] = useState<boolean>(false);
  const [cloneDrawer, setCloneDrawer] = useState<boolean>(false);
  const [cloneData, setCloneData] = useState<any>(false);
  useEffect(() => {
    if (params) {
      if (params.filters !== undefined) {
        const data = {
          keyword: params.filters.keyword,
          searchPage: params.searchPage,
          customerUid: params.filters.customerUid,
          status: params.filters.status,
        };
        from(request(dnsApi.FindDnsDomain(data))).subscribe((data) => {
          if (data) {
            setdomainList(data);
          }
        });
      } else {
        from(
          request(
            dnsApi.FindDnsDomain({
              searchPage: { desc: 0, page: 1, pageSize: 25, sort: "name" },
            })
          )
        ).subscribe((data) => {
          if (data) {
            setdomainList(data);
          }
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
    const handleDnsCustomerList = async () => {
      const result = await request(
        dnsApi.FindCustomerList({
          searchPage: { page: 1, pageSize: 99999 },
          uid: "",
        })
      );
      if (result) {
        let dnsOption: object[] = [];
        Object.entries(result.content).forEach((item: any) => {
          let a = item[1];
          dnsOption.push({ uid: a.uid, name: a.name });
        });
        setOption(dnsOption);
      }
    };
    handleDnsCustomerList();
  }, []);

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
          from(request(dnsApi.CertRequest(uid))).subscribe((data) => {
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
            from(request(dnsApi.Disable(uid))).subscribe((data) => {
              if (data) {
              }
            });
          } else {
            from(request(dnsApi.Enable(uid))).subscribe((data) => {
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
          from(request(dnsApi.DomainDelete(uid))).subscribe((data) => {
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
          from(request(dnsApi.DomainDelete(value))).subscribe((data) => {
            if (data) {
            }
          });
        },
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          from(request(dnsApi.Enable(value))).subscribe((data) => {
            if (data) {
            }
          });
        },
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          from(request(dnsApi.Disable(value))).subscribe((data) => {
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
    from(request(dnsApi.CreateDomain(key))).subscribe((data) => {
      if (data) {
      }
    });
  };

  const clone = (data: any) => {
    console.log(data.names.replace(/\n/g, ",").split(","));
    let cloneNameArr = data.names.replace(/\n/g, ",").split(",");
    let cloneValue = { names: cloneNameArr, uid: data.uid };
    from(request(dnsApi.CloneDomain(cloneValue))).subscribe((data) => {
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

import { Template } from "@/components/template";
import { dnsApi } from "@/store/api";
import request from "@/store/request";
import { Form, Drawer, Input, Select, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useEffect, useMemo, useState } from "react";
import { from } from "rxjs";

const Index: FC = () => {
  const [AddForm] = Form.useForm();
  const [CloneForm] = Form.useForm();
  const [domainList, setdomainList] = useState();
  const [option, setOption] = useState<Object[]>([]);
  const [addDrawer, setAddDrawer] = useState<boolean>(false);
  const [cloneDrawer, setCloneDrawer] = useState<boolean>(false);
  const [cloneData, setCloneData] = useState<any>(false);

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
    const result = from(
      request(
        dnsApi.FindCustomerList({
          searchPage: { page: 1, pageSize: 99999 },
          uid: "",
        })
      )
    ).subscribe((data) => {
      setOption(
        data.content.map(({ uid, name }: any) => {
          return { uid, name };
        })
      );
    });

    return () => result.unsubscribe();
    // const option = result.content.map((item: any) => {
    //   return { uid: item.uid, name: item.name };
    // });
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
          let uid = { domainUid: data.uid, records: [data.name] };
          const obs = from(request(dnsApi.CertRequest(uid))).subscribe(
            (data) => {
              console.log(data);
            }
          );
          return () => obs.unsubscribe();
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
        text: "启用",
        hide: (data: any) => data.status === "enabled",
        event: (data: any) => {
          const res = request(dnsApi.Enable(data.uid));
        },
      },
      {
        text: "禁用",
        hide: (data: any) => data.status === "disabled",
        event: (data: any) => {
          const res = request(dnsApi.Disable(data.uid));
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          let uid = [data.uid];
          const obs = from(request(dnsApi.DomainDelete(uid))).subscribe(
            (data) => {
              if (data) {
              }
            }
          );

          return () => obs.unsubscribe();
        },
      },
    ],
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          const obs = from(request(dnsApi.DomainDelete(value))).subscribe(
            (data) => {
              if (data) {
              }
            }
          );
          return () => obs.unsubscribe();
        },
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          const obs = from(request(dnsApi.Enable(value))).subscribe((data) => {
            if (data) {
            }
          });
          return () => obs.unsubscribe();
        },
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          const obs = from(request(dnsApi.Disable(value))).subscribe((data) => {
            if (data) {
            }
          });
          return () => obs.unsubscribe();
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
      const { searchPage, filters } = params;
      const data = {
        ...filters,
        searchPage,
      };
      from(request(dnsApi.FindDnsDomain(data))).subscribe((data) => {
        data && setdomainList(data);
      });
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
        render: ({ name }: any) => {
          return <div>{name}</div>;
        },
      },
    ],
  };

  const AddNewDomain = (key: string[]) => {
    const obs = from(request(dnsApi.CreateDomain(key))).subscribe((data) => {});
    return () => obs.unsubscribe();
  };

  const clone = (data: any) => {
    const { names, uid } = data;
    let cloneNameArr = names.replace(/\n/g, ",").split(",");

    let cloneValue = { names: cloneNameArr, uid };
    const obs = from(request(dnsApi.CloneDomain(cloneValue))).subscribe(
      (data) => {
        if (data) {
        }
      }
    );
    return () => obs.unsubscribe();
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
            <Select
              options={
                option
                  ? option.map((item: any) => {
                      return { value: item.uid, label: item.name };
                    })
                  : [{ value: "", label: "" }]
              }
            ></Select>
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

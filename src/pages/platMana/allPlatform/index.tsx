import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import { supplierApi } from "@/store/api";
import { IAccountUpdate } from "@/store/api/supplier";
import {
  useSupplierAccountList,
  useSupplierAccountView,
  useSupplierInfo,
} from "@/store/network/supplier";
import SupplierService from "@/store/network/supplier/service";
import request from "@/store/request";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Spin,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useEffect, useState } from "react";
import { from } from "rxjs";
const Index: FC = () => {
  const [params, setParams] = useState<any>();
  const supplierAccountList = useSupplierAccountList();
  const supplierInfo = useSupplierInfo();
  const supplierDetail = useSupplierAccountView();
  const [option, setOption] = useState<Object[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [supplierAccount, setSupplierAccount] = useState<any>(null);
  const [modifyDrawer, setModifyDrawer] = useState<boolean>(false);
  const [domainDrawer, setDomainDrawer] = useState<boolean>(false);
  const [fieldData, setFieldData] = useState<any>();
  const [validateButton, setValidateButton] = useState<boolean>(true);
  const [createButton, setCreateButton] = useState<boolean>(true);
  const [tokenValue, setTokenValue] = useState<any>();
  const [approve, setApprove] = useState<boolean>();
  const [validNotification, setValidNotification] = useState<boolean>(true);
  const [form] = Form.useForm();
  const [modifyForm] = Form.useForm();
  const [createDomainDetail, setCreateDomainDetail] = useState<any | null>(
    null
  );
  const [drawerOption, setDrawerOption] = useState<Object[]>([]);
  useEffect(() => {
    SupplierService.supplierInfo("");
  }, []);

  useEffect(() => {
    params && params.filters
      ? SupplierService?.supplierAccountList({
          keyword: params.filters.keyword,
          searchPage: params.searchPage,
          type: "",
          supplier: params.filters.supplier,
          name: params.filters.name,
        })
      : SupplierService?.supplierAccountList({
          searchPage: { desc: 0, page: 1, pageSize: 25, sort: "name" },
          keyword: "",
          name: "",
          supplier: "",
          type: "",
        });
  }, [params]);

  useEffect(() => {
    setSupplierAccount(supplierDetail);
  }, [supplierDetail]);

  useEffect(() => {
    let tokenValue = supplierAccount?.supplier?.tokenValue;
    let name = supplierAccount?.name;
    let remark = supplierAccount?.remark;
    let code = supplierAccount?.supplier?.code;
    let tokenFields = supplierAccount?.supplier?.tokenFields;
    let defaultValue1 = { ...tokenValue, name, remark, code };
    let defaultValue2 = { name, remark, code };
    let fieldData = supplierInfo?.find((item: any) => item.code === code);
    console.log(fieldData, "91");
    setFieldData(fieldData);
    tokenValue
      ? modifyForm.setFieldsValue(defaultValue1)
      : modifyForm.setFieldsValue(defaultValue2);
  }, [modifyForm, supplierAccount, supplierInfo]);

  useEffect(() => {
    if (supplierInfo) {
      //搜索的选项
      let platformOption: object[] = [];
      //新增的选项
      let drawerOption: object[] = [];
      Object.entries(supplierInfo).forEach((item: any) => {
        let a = item[1];
        platformOption.push({ uid: a.code, name: a.displayName });
        drawerOption.push({ value: a.code, label: a.displayName });
      });
      setDrawerOption(drawerOption);
      setOption(platformOption);
    }
  }, [supplierInfo]);

  useEffect(() => {
    if (domainDrawer === true) {
      SupplierService?.supplierInfo("");
    } else if (modifyDrawer === true) {
      SupplierService?.supplierInfo("");
    }
  }, [domainDrawer, modifyDrawer]);

  const handleOnclick = (key: any) => {
    SupplierService.supplierAccountView(key);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const showDomainDrawer = () => {
    setDomainDrawer(true);
  };

  const onClose = () => {
    form.setFieldsValue({});
    modifyForm.setFieldsValue({});
    setVisible(false);
    setDomainDrawer(false);
    setModifyDrawer(false);
  };

  const handleTokenValue = (e: any) => {
    let value = e.target.value;
    setTokenValue({ ...tokenValue, [e.target.id]: value });
  };

  const validateNewDomain = async (data: any) => {
    let obj = { supplier: { code: data.code, tokenValue: tokenValue } };
    let domainDetail = {
      name: data.name,
      remark: data.remark,
      supplier: {
        code: data.code,
        tokenValue: tokenValue,
      },
      status: "enabled",
      quota: {
        domain: {
          capacity: data.capacity === undefined ? 0 : data.capacity,
        },
      },
    };

    const result = await request(
      supplierApi.SupplierAccountValidate(obj),
      true
    );
    console.log(result, "response");

    if (result.response === "success") {
      setApprove(true);
      setCreateButton(false);

      console.log(domainDetail);
      setCreateDomainDetail(domainDetail);
    } else {
      setApprove(false);
    }
  };

  //新增站点请求
  const handleCreateDomain = async () => {
    if (createDomainDetail !== null) {
      const result = await request(
        supplierApi.CreateAccount(createDomainDetail)
      );
      console.log(result);
    }
  };

  const showModifyDrawer = () => {
    setModifyDrawer(true);
  };

  const ModifyDomain = async (data: any) => {
    console.log(data);
    let modifyValue: IAccountUpdate;
    let name = data.name;
    let remark = data.remark;
    let code = data.code;
    let uid = supplierDetail?.uid;
    const tokenValue = Object.keys(data).reduce((tokenValue: any, key) => {
      // Copy all except emoji
      if (key !== "name" && key !== "code" && key !== "remark") {
        tokenValue[key] = data[key];
      }
      return tokenValue;
    }, {});
    console.log(tokenValue);
    modifyValue = {
      name,
      remark,
      uid,
      status: "enabled",
      supplier: { code, tokenValue: { ...tokenValue } },
    };
    console.log(modifyValue);
    const sumbitUpdate = await request(supplierApi.UpdateAccount(modifyValue));
    console.log(sumbitUpdate);
  };

  const OptionOnchage = (selectedOption: string) => {
    if (selectedOption !== undefined || selectedOption !== null) {
      let fieldData = supplierInfo?.find(
        (item: any) => item.code === selectedOption
      );
      setFieldData(fieldData);
    }
  };

  const TempConfig = {
    optList: [
      {
        text: "查看",
        event: (data: any) => {
          handleOnclick(data.uid);
          showDrawer();
        },
      },
      {
        text: "修改",
        event: (data: any) => {
          handleOnclick(data.uid);

          showModifyDrawer();
        },
      },
      {
        text: "状态",
        event: async (data: any) => {
          console.log(data);

          const uid = data.uid;
          if (data.status === "disabled") {
            const result = await request(supplierApi.EnableAccount(uid));
            console.log(result);
          } else {
            const result = await request(supplierApi.DisableAccount(uid));
            console.log(result);
          }
        },
      },
      {
        text: "删除",
        event: async (data: any) => {
          const uid = data.uid;
          const result = await request(supplierApi.DeleteAccount(uid));
          console.log(result);
        },
      },
    ],
    normalBtns: [
      {
        text: "新增站点",
        onClick: () => {
          showDomainDrawer();
        },
      },
    ],
    onSearch: (params: any) => {
      setParams(params);
    },
    rowId: "uid",
    data: supplierAccountList,
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
      <Drawer
        title="查看"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Row>
          <Col span={7}>平台账号</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.name}
          </Col>
          <Divider />
          <Col span={7}>平台</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.supplier?.displayName}
          </Col>
          <Divider />
          <Col span={7}>API 金钥</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.supplier?.tokenValue?.apiKey
              ? supplierAccount?.supplier?.tokenValue?.apiKey
              : "-"}
          </Col>
          <Divider />
          <Col span={7}>状态</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.status ? supplierAccount?.status : "-"}
          </Col>
          <Divider />
          <Col span={7}>备注</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.remark === "" ? "-" : supplierAccount?.remark}
          </Col>
          <Divider />
        </Row>
      </Drawer>

      <Drawer
        title="新增账号"
        placement="left"
        onClose={onClose}
        visible={domainDrawer}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="horizontal"
          labelAlign={"left"}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={validateNewDomain}
          initialValues={{ capacity: 1 }}
        >
          <Form.Item label="平台配置名称" name={"name"} key={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="平台选择" name={"code"} key={"code"}>
            <Select
              options={drawerOption}
              onChange={(selectedOption) => {
                setValidateButton(false);
                setValidNotification(true);
                setTokenValue({});
                OptionOnchage(selectedOption);
              }}
            ></Select>
          </Form.Item>

          {fieldData !== undefined ? (
            fieldData.supportsMultiAccount === true ? (
              <Form.Item label="总域名额度" name="capacity">
                <Input />
              </Form.Item>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {fieldData !== undefined ? (
            fieldData.description !== "" ? (
              <div>{fieldData.description}</div>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {fieldData !== undefined
            ? fieldData.tokenFields.map((item: any, key: number) => {
                return (
                  <Form.Item
                    label={item.displayName}
                    name={item.name}
                    key={item.name}
                  >
                    <Input onChange={(e) => handleTokenValue(e)} required />
                  </Form.Item>
                );
              })
            : ""}
          <Form.Item name="remark" label="备注">
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              hidden={validateButton}
              onClick={() => setValidNotification(false)}
            >
              验证账户
            </Button>
          </Form.Item>
          <Form.Item hidden={validNotification}>
            {approve === undefined || approve === null ? (
              <Spin />
            ) : approve === true ? (
              <div>账号凭证验证已通过</div>
            ) : (
              <div>账号凭证验证未通过</div>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleCreateDomain}
              disabled={createButton}
            >
              确认
            </Button>
            <Button type="primary">取消</Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title="修改账号"
        placement="left"
        onClose={onClose}
        visible={modifyDrawer}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {supplierAccount !== null ? (
          <Form
            form={modifyForm}
            layout="horizontal"
            labelAlign={"left"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={ModifyDomain}
          >
            <Form.Item>
              <div>
                提示: 请谨慎修改API Token,错误的API Token将导致服务故障。
              </div>
            </Form.Item>
            <Form.Item label="平台配置名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="平台选择" name="code">
              <Select
                options={drawerOption}
                onChange={(selectedOption) => {
                  setTokenValue({});
                  OptionOnchage(selectedOption);
                }}
              ></Select>
            </Form.Item>
            {fieldData?.description && (
              <Form.Item>
                <div>{fieldData.description}</div>
              </Form.Item>
            )}

            {fieldData !== undefined
              ? fieldData.tokenFields.map((item: any, key: number) => {
                  return (
                    <Form.Item
                      label={item.displayName}
                      name={item.name}
                      key={item.name}
                    >
                      <Input onChange={(e) => handleTokenValue(e)} required />
                    </Form.Item>
                  );
                })
              : ""}

            <Form.Item label="备注" name="remark">
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">确认</Button>
            </Form.Item>
          </Form>
        ) : (
          <Spin />
        )}
      </Drawer>
    </div>
  );
};

export default Index;

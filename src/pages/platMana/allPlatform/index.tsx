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
import { FC, useEffect, useMemo, useState } from "react";
import { from } from "rxjs";
const Index: FC = () => {
  const [params, setParams] = useState<any>();
  const supplierAccountList = useSupplierAccountList();
  const supplierInfo = useSupplierInfo();
  const supplierDetail = useSupplierAccountView();
  //const [option, setOption] = useState<Object[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [modifyDrawer, setModifyDrawer] = useState<boolean>(false);
  const [domainDrawer, setDomainDrawer] = useState<boolean>(false);
  const [fieldData, setFieldData] = useState<any>();
  const [validateButton, setValidateButton] = useState<boolean>(true);
  const [button, setButton] = useState<boolean>(true);
  const [tokenValue, setTokenValue] = useState<any>();
  const [approve, setApprove] = useState<boolean | null>();
  const [validNotification, setValidNotification] = useState<boolean>(true);
  const [form] = Form.useForm();
  const [modifyForm] = Form.useForm();
  const [createDomainDetail, setCreateDomainDetail] = useState<any | null>(
    null
  );
  const [drawerOption, setDrawerOption] = useState<Object[]>([]);
  const [mVButton, setMVButton] = useState<boolean>(true);
  const [mCButton, setMCButton] = useState<boolean>(false);
  useEffect(() => {
    SupplierService.supplierInfo("");
  }, []);

  // useEffect(() => {
  //   params && params.filters
  //     ? SupplierService?.supplierAccountList({
  //         keyword: params.filters.keyword,
  //         searchPage: params.searchPage,
  //         type: "",
  //         supplier: params.filters.supplier,
  //         name: params.filters.name,
  //       })
  //     : SupplierService?.supplierAccountList({
  //         searchPage: { desc: 0, page: 1, pageSize: 25, sort: "name" },
  //         keyword: "",
  //         name: "",
  //         supplier: "",
  //         type: "",
  //       });
  // }, [params]);

  // useEffect(() => {
  //   if (supplierInfo) {
  //     //搜索的选项
  //     let platformOption: object[] = [];
  //     //新增的选项
  //     let drawerOption: object[] = [];
  //     Object.entries(supplierInfo).forEach((item: any) => {
  //       let a = item[1];
  //       platformOption.push({ uid: a.code, name: a.displayName });
  //       drawerOption.push({ value: a.code, label: a.displayName });
  //     });
  //     setDrawerOption(drawerOption);
  //     // setOption(platformOption);
  //   }
  // }, [supplierInfo]);

  const option = useMemo(() => {
    return supplierInfo instanceof Array
      ? supplierInfo?.map((item: any) => ({ uid: item.uid, name: item.name }))
      : [];
  }, [supplierInfo]);

  console.log(option);

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
    setMCButton(false);
    setMVButton(true);
  };

  const validateNewDomain = async (data: any) => {
    const { code, name, remark, capacity } = data;
    let obj = { supplier: { code, tokenValue: tokenValue } };
    let domainDetail = {
      name,
      remark,
      supplier: {
        code,
        tokenValue: tokenValue,
      },
      status: "enabled",
      quota: {
        domain: {
          capacity: capacity === undefined ? 0 : capacity,
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
      setButton(false);

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
  useEffect(() => {
    if (supplierDetail) {
      const {name,remark}=supplierDetail
      const{ tokenValue, code } = supplierDetail?.supplier;
      let defaultValue1 = { ...tokenValue, name, remark, code };
      let defaultValue2 = { name, remark, code };
      let fieldData = supplierInfo?.find((item: any) => item.code === code);
      console.log(fieldData, "91");
      setFieldData(fieldData);
      tokenValue
        ? modifyForm.setFieldsValue(defaultValue1)
        : modifyForm.setFieldsValue(defaultValue2);
    }

  }, [modifyForm, supplierDetail, supplierInfo]);

  const showModifyDrawer = () => {
    setModifyDrawer(true);
  };

  const ModifyDomain = async (data: any) => {
    const { name, code, remark, ...tokenValue } = data;
    console.log(tokenValue, "rest");
    const validateValue = { supplier: { code, tokenValue } };
    console.log(validateValue);

    const validDate = await request(
      supplierApi.SupplierAccountValidate(validateValue),
      true
    );
    if (validDate.response === "success") {
      setApprove(true);
      setMCButton(false);
    } else {
      setApprove(false);
    }
  };

  const handleModifyDomain = () => {
    // const { name, code, remark, ...tokenValue } = data;
    // console.log(tokenValue, "rest");
    // const modifyValue: IAccountUpdate = {
    //   name: data.name,
    //   remark: data.remark,
    //   uid: supplierDetail?.uid,
    //   status: "enabled",
    //   supplier: { code, tokenValue: { ...tokenValue } },
    // };
    // console.log(modifyValue);
    // const sumbitUpdate = await request(supplierApi.UpdateAccount(modifyValue));
    // console.log(sumbitUpdate);
  };

  const OptionOnchage = (selectedOption: string) => {
    console.log(selectedOption, "1");
    console.log(supplierDetail);
    let code = supplierDetail?.supplier?.code;
    console.log(code);
    setValidNotification(true);
    setApprove(null);
    if (selectedOption !== undefined || selectedOption !== null) {
      let fieldData = supplierInfo?.find(
        (item: any) => item.code === selectedOption
      );
      console.log(fieldData?.tokenFields);

      setFieldData(fieldData);
      if (selectedOption !== code) {
        console.log(modifyForm, "aaa");
        fieldData?.tokenFields.map((item: any) => {
          let name = item.name;
          modifyForm.setFieldsValue({ [name]: "" });
        });
        modifyForm.setFieldsValue({ remark: "a" });

        //显示验证按钮

        setMCButton(true);
        setMVButton(false);
      }
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
      const { keyword, supplier, name } = params.filters;
      SupplierService?.supplierAccountList({
        keyword,
        supplier,
        name,
        searchPage: params.searchPage,
        type: "",
      });
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
            {supplierDetail?.name}
          </Col>
          <Divider />
          <Col span={7}>平台</Col>
          <Col span={15} offset={2}>
            {supplierDetail?.supplier?.displayName}
          </Col>
          <Divider />
          <Col span={7}>API 金钥</Col>
          <Col span={15} offset={2}>
            {supplierDetail?.supplier?.tokenValue?.apiKey
              ? supplierDetail?.supplier?.tokenValue?.apiKey
              : "-"}
          </Col>
          <Divider />
          <Col span={7}>状态</Col>
          <Col span={15} offset={2}>
            {supplierDetail?.status ? supplierDetail?.status : "-"}
          </Col>
          <Divider />
          <Col span={7}>备注</Col>
          <Col span={15} offset={2}>
            {supplierDetail?.remark === "" ? "-" : supplierDetail?.remark}
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
              options={
                option
                  ? option.map((item: any) => ({
                      value: item.code,
                      label: item.displayName,
                    }))
                  : []
              }
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
                    <Input
                      onChange={(e) =>
                        setTokenValue({
                          ...tokenValue,
                          [e.target.id]: e.target.value,
                        })
                      }
                      required
                    />
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
              disabled={button}
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
        {supplierDetail !== null ? (
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
                options={
                  option
                    ? option.map((item: any) => ({
                        value: item.code,
                        label: item.displayName,
                      }))
                    : []
                }
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
                      <Input
                        onChange={(e) =>
                          setTokenValue({
                            ...tokenValue,
                            [e.target.id]: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Item>
                  );
                })
              : ""}

            <Form.Item label="备注" name="remark">
              <TextArea />
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
                hidden={mVButton}
                htmlType="submit"
                onClick={() => setValidNotification(false)}
              >
                验证
              </Button>
              <Button disabled={mCButton}>确认</Button>
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

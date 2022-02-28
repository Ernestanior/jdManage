import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import {
  usePlatformManage,
  useSupplierInfo,
  useViewSupplierAccount,
} from "@/store/network/platformMange";
import platformManage from "@/store/network/platformMange/service";
import { DownOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Drawer,
  Dropdown,
  Menu,
  Row,
  Form,
  Input,
  Button,
  Select,
} from "antd";
import { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {
  const [form] = Form.useForm();
  const [params, setParams] = useState<any>();
  const supplierList = usePlatformManage();
  const supplierInfo = useSupplierInfo();
  const [option, setOption] = useState<Object[]>([]);
  const [addAccountOption, setAddAccountOption] = useState<Object[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [domainDrawer, setDomainDrawer] = useState<boolean>(false);
  const [supplierAccount, setSupplierAccount] = useState<any>();
  const supplierDetail = useViewSupplierAccount();
  const [selectedOption, setSelectedOption] = useState<string>();
  const [fieldData, setFieldData] = useState<any>();
  useEffect(() => {
    if (props.type === "") {
      platformManage?.SupplierInfo("");
    }
  }, [props.type]);

  useEffect(() => {
    if (selectedOption !== undefined || selectedOption !== null) {
      let fieldData = supplierInfo?.find(
        (item: any) => item.code === selectedOption
      );
      console.log(fieldData, "aaaaaa");
      setFieldData(fieldData);
    }
  }, [selectedOption]);

  useEffect(() => {
    console.log(supplierInfo);

    if (supplierInfo) {
      let platformOption: object[] = [];
      let addAccountOption: object[] = [];
      Object.entries(supplierInfo).forEach((item: any) => {
        let a = item[1];
        platformOption.push({ uid: a.code, name: a.displayName });
        addAccountOption.push({ value: a.code, label: a.displayName });
      });
      setAddAccountOption(addAccountOption);
      setOption(platformOption);
    }
  }, [supplierInfo]);

  useEffect(() => {
    if (props.type === "") {
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

  useEffect(() => {
    setSupplierAccount(supplierDetail);
    console.log(supplierDetail);
  }, [supplierDetail]);

  const handleOnclick = (uid: string) => {
    platformManage.viewSupplierAccount(uid);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const shoDomainDrawer = () => {
    setDomainDrawer(true);
  };

  const onClose = () => {
    setVisible(false);
    setDomainDrawer(false);
    setSupplierAccount({});
  };

  const submintNewDomain = (data: any)=>{
    console.log(data);
    
  }

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
        event: (data: any) => {},
      },
      {
        text: "禁用",
        event: (data: any) => {},
      },
      {
        text: "删除",
        event: (data: any) => {},
      },
    ],
    normalBtns: [
      {
        text: "新增站点",
        onClick: () => {
          shoDomainDrawer();
        },
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
      <Drawer
        title="查看证书"
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
          <Col span={7}>电邮地址</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.supplier?.tokenValue?.email
              ? supplierAccount?.supplier?.tokenValue?.email
              : "-"}
          </Col>
          <Divider />
          <Col span={7}>API 密钥 （API KEY）</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.supplier?.tokenValue?.apiKey
              ? supplierAccount?.supplier?.tokenValue?.apiKey
              : "-"}
          </Col>
          <Divider />
          <Col span={7}>账户ID (Account ID)</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.supplier?.tokenValue?.accountId
              ? supplierAccount?.supplier?.tokenValue?.accountId
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
          wrapperCol={{ span: 24}}
           onFinish={submintNewDomain}
        >
          <Form.Item label="平台配置名称" name="a">
            <Input />
          </Form.Item>
          <Form.Item label="使用者名" name="code">
            <Select
              options={addAccountOption}
              onChange={(e) => setSelectedOption(e)}
            ></Select>
          </Form.Item>
          {fieldData !== undefined ? (
            fieldData.supportsMultiAccount === true ? (
              <Form.Item label="总域名额度" name="">
                <Input defaultValue={1} />
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
            ? fieldData.tokenFields.map((item: any) => {
                return (
                  <Form.Item
                    label={item.displayName}
                    name={item.name}
                    key={item.name}
                  >
                    <Input />
                  </Form.Item>
                );
              })
            : ""}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Index;

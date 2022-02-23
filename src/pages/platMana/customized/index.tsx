import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import {
  usePlatformManage,
  useSupplierInfo,
  useViewSupplierAccount,
} from "@/store/network/platformMange";
import platformManage from "@/store/network/platformMange/service";
import { DownOutlined } from "@ant-design/icons";
import { Col, Divider, Drawer, Dropdown, Menu, Row } from "antd";
import { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {
  const [params, setParams] = useState<any>();
  const supplierList = usePlatformManage();
  const supplierInfo = useSupplierInfo();
  const [option, setOption] = useState<Object[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [supplierAccount, setSupplierAccount] = useState<any>();
  const supplierDetail = useViewSupplierAccount();

  useEffect(() => {
    if (props.type === "customized") {
      platformManage?.SupplierInfo("customized");
    }
  }, [props.type]);

  useEffect(() => {
    if (supplierInfo) {
      let platformOption: object[] = [];
      Object.entries(supplierInfo).forEach((item: any) => {
        let a = item[1];
        platformOption.push({ uid: a.code, name: a.displayName });
      });
      setOption(platformOption);
    }
  }, [supplierInfo]);

  useEffect(() => {
    if (props.type === "customized") {
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

  const handleOnclick = (key: any) => {
    platformManage.viewSupplierAccount(key);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSupplierAccount({});
  };

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
      {
        title: "操作",
        dataIndex: "uid",
        key: "uid",
        render: (key: any) => {
          const menu = (
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  handleOnclick(key);
                  showDrawer();
                }}
              >
                查看
              </Menu.Item>
              <Menu.Item key="2">删除账户</Menu.Item>
            </Menu>
          );
          return (
            <div>
              <Dropdown overlay={menu}>
                <DownOutlined />
              </Dropdown>
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
          <Divider/>
          <Col span={7}>平台</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.supplier?.displayName}
          </Col>
          <Divider/>
          <Col span={7}>API 金钥</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.supplier?.tokenValue?.apiKey?supplierAccount?.supplier?.tokenValue?.apiKey:"-"}
          </Col>
          <Divider/>
          <Col span={7}>状态</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.status?supplierAccount?.status:"-"}
          </Col>
          <Divider/>
          <Col span={7}>备注</Col>
          <Col span={15} offset={2}>
            {supplierAccount?.remark === "" ? "-" : supplierAccount?.remark}
          </Col>
          <Divider/>
        </Row>
      </Drawer>
    </div>
  );
};

export default Index;

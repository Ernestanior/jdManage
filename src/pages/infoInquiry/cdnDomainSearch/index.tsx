import { Template } from "@/components/template";
import {
  useInfoInquiryCustomerList,
  useInfoInquiryDomainList,
  useSite,
} from "@/store/network/infoInquiry";
import {} from "@/store/network/infoInquiry";
import infoInquiry from "@/store/network/infoInquiry/service";
import { DownOutlined } from "@ant-design/icons";
import { Col, Divider, Drawer, Dropdown, Menu, Row } from "antd";
import { FC, useEffect, useState } from "react";

const Index: FC = () => {
  const [params, setParams] = useState<any>();
  const customerList = useInfoInquiryCustomerList();
  const [visible, setVisible] = useState<boolean>(false);
  const site = useSite();
  const domainList = useInfoInquiryDomainList();
  const [siteOption, setSiteOption] = useState<Object[]>([]);
  const [cusNameOption, setCusNameOption] = useState<Object[]>([]);
  const [drawerDetail, setDrawerDetail] = useState<any>();

  useEffect(() => {
    infoInquiry.customerList({
      searchPage: { page: 1, pageSize: 99999 },
      uid: "",
    });
    infoInquiry.site();
  }, []);
  useEffect(() => {
    if (params) {
      if (params.filters !== undefined) {
        infoInquiry.domainList({
          customerUid: params.filters.customerUid,
          searchPage: params.searchPage,
          displayName: params.filters.displayName,
          keyword: params.filters.keyword,
          masterName: params.filters.masterName,
          siteUid: params.filters.siteUid,
          sslEnable: params.filters.sslEnable,
        });
      } else {
        infoInquiry.domainList({
          searchPage: { desc: 0, page: 1, pageSize: 25, sort: "name" },
        });
      }
    }
  }, [params]);
  const handleOnclick = (key: any) => {
    setDrawerDetail(key);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setDrawerDetail({});
  };

  useEffect(() => {
    let siteOption: object[] = [];
    let cusNameOption: object[] = [];
    site &&
      Object.entries(site).map((item: any) => {
        let a = item[1];
        siteOption.push({ uid: a.uid, name: a.name });
      });
    customerList?.content &&
      Object.entries(customerList?.content).map((item: any) => {
        let a = item[1];
        cusNameOption.push({ uid: a.uid, name: a.name });
      });
    setSiteOption(siteOption);
    setCusNameOption(cusNameOption);
  }, [site, customerList?.content]);

  const TempConfig = {
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
        title: "顶级域名",
        dataIndex: "masterName",
        key: "masterName",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "SSL状态",
        dataIndex: "sslEnable",
        key: "sslEnable",
      },
      {
        title: "网站",
        dataIndex: "site",
        key: "site",
        render: (key: any) => {
          return <div>{key.name}</div>;
        },
      },
      {
        title: "客户名称",
        dataIndex: "customer",
        key: "customer",
        render: (key: any) => {
          return <div>{key.name}</div>;
        },
      },
      {
        title: "操作",
        dataIndex: "customer",
        key: "customer",
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
      {" "}
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "功能变数名称",
            name: "displayName",
            type: "input",
          },
          {
            text: "顶级域名",
            name: "masterName",
            type: "input",
          },
          {
            text: "SSL状态",
            name: "sslEnable",
            data: [
              { uid: "1", name: "已启用" },
              { uid: "0", name: "未启用" },
            ],
            type: "select",
          },
          {
            text: "网站",
            name: "siteUid",
            data: siteOption,
            type: "select",
          },
          {
            text: "客户名称",
            name: "customerUid",
            data: cusNameOption,
            type: "select",
          },
        ]}
        {...TempConfig}
      ></Template>
      <Drawer
        title="查看客户"
        placement="left"
        onClose={onClose}
        visible={visible}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Row>
          <Col span={4}>登入邮箱</Col>
          <Col span={16} offset={4}>
            {drawerDetail?.email}
          </Col>
          <Divider/>
          <Col span={4}>使用者名称</Col>
          <Col span={16} offset={4}>
            {drawerDetail?.name}
          </Col>
          <Divider/>
          <Col span={4}>账户类型</Col>
          <Col span={16} offset={4}>
            {drawerDetail?.supportsSupplier === true ? "企业版" : "-"}
          </Col>
          <Divider/>
          <Col span={4}>域名额度</Col>
          <Col span={16} offset={4}>
            {drawerDetail?.domainQuota !== null
              ? drawerDetail?.domainQuota
              : "-"}
          </Col>
          <Divider/>
          <Col span={4}>流量套餐</Col>
          <Col span={16} offset={4}>
            {drawerDetail?.dataAllowance !== null
              ? drawerDetail?.dataAllowance + " GB"
              : "-"}
          </Col>
          <Divider/>
          <Col span={4}>防御（GB）</Col>
          <Col span={16} offset={4}>
            {drawerDetail?.defenceQuota !== null
              ? drawerDetail?.defenceQuota + " GB"
              : "-"}
          </Col>
          <Divider/>
        </Row>
      </Drawer>
    </div>
  );
};

export default Index;

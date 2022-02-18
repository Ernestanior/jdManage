import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";

import {
  useSslManageOriginCertList,
  useViewOriginCert,
} from "@/store/network/sslMange";
import sslManage from "@/store/network/sslMange/service";
import { DownOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Drawer, Dropdown, Input, Menu, Row } from "antd";
import moment from "moment";

import { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {
  const { TextArea } = Input;
  const [params, setParams] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [newOriginCertDetail, setNewOriginCertDetail] = useState<any>();
  const originCertList = useSslManageOriginCertList();
  const originCertDetail = useViewOriginCert();
  
  useEffect(() => {
    if (props.type === 2) {
      if (params !== undefined) {
        if (params.filters !== undefined) {
          sslManage?.originCertList({
            sslDomains: params.filters.sslDomains,
            searchPage: params.searchPage,
            keyword: params.filters.keyword,
            customer: { name: params.filters.customer },
          });
        }
      }
    }
  }, [params, props.type]);

  useEffect(() => {
    setNewOriginCertDetail(originCertDetail);
  }, [originCertDetail]);

  const handleOnclick = (key: any) => {
    sslManage.viewOriginCert(key);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setNewOriginCertDetail({});
  };

  const config = [
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
  ];

  const batchBtns = [
    {
      text: "大量删除",
      onClick: (value: any) => {
        // setEnableFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  const normalBtns = [
    {
      text: "申请证书",
      onClick: (value: any) => {
        // setDeleteFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  const TempConfig = {
    batchBtns: batchBtns,
    onSearch: (params: any) => setParams(params),
    rowId: "uid",
    data: originCertList,
    config: config,
    normalBtns: normalBtns,
  };

  return (
    <div>
      <Template
        primarySearch={"sslDomains"}
        searchList={[
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
        {newOriginCertDetail !== {} ? (
          <div>
            <Row>
              <h3>證書信息</h3>
            </Row>
            <Row gutter={[16, 18]}>
              <Col span={5}>證書使用者</Col>
              <Col span={19}>{newOriginCertDetail?.details?.subject}</Col>
              <Col span={5}>證書頒發者</Col>
              <Col span={19}>{newOriginCertDetail?.details?.issuer}</Col>
              <Col span={5}>有效期</Col>
              <Col span={19}>
                {newOriginCertDetail?.details?.notBefore
                  ? moment(newOriginCertDetail?.details?.notBefore).format(
                      "YYYY/MM/DD"
                    ) + " 到"
                  : ""}{" "}
                {newOriginCertDetail?.details?.notAfter
                  ? moment(newOriginCertDetail?.details?.notAfter).format(
                      "YYYY/MM/DD"
                    )
                  : ""}
              </Col>
              <Col span={5}>匹配域名</Col>
              <Col span={19}>
                {newOriginCertDetail?.details?.subjectAlternativeNames}
              </Col>
              <Col span={5}>簽名算法</Col>
              <Col span={19}>
                {newOriginCertDetail?.details?.signatureAlgorithm}
              </Col>
              <Col span={5}>公鑰長度</Col>
              <Col span={19}>
                {newOriginCertDetail?.details?.publicKeyLength
                  ? newOriginCertDetail?.details?.publicKeyLength + " Bit"
                  : ""}
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={12}>
                <h3>證書文件</h3>
              </Col>
              <Col span={5} offset={7}>
                <Button>下载证书</Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>私鑰</Col>
              <Col span={24}>
                <TextArea
                  showCount
                  style={{ height: 160 }}
                  allowClear={false}
                  value={newOriginCertDetail?.sslKey}
                />
              </Col>
              <Col span={24}>證書</Col>
              <Col span={24}>
                <TextArea
                  showCount
                  style={{ height: 160 }}
                  allowClear={false}
                  value={newOriginCertDetail?.sslCrt}
                />
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </Drawer>
    </div>
  );
};

export default Index;

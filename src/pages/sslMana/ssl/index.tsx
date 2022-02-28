import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import { sslManageApi } from "@/store/api";
import { RequestOriginalCert } from "@/store/api/sslManage";
import request from "@/store/request";
import {
  useSslManageOriginCertList,
  useViewOriginCert,
} from "@/store/network/sslMange";
import sslManage from "@/store/network/sslMange/service";
import { DownOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  Select,
} from "antd";
import moment from "moment";

import { FC, useEffect, useState } from "react";
import { from } from "rxjs";
import Dragger from "antd/lib/upload/Dragger";

type Option = [{ value: string | number; label: string | number }];
const Index: FC<Role> = (props: Role) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [params, setParams] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [newOriginCertDetail, setNewOriginCertDetail] = useState<any>();
  const originCertList = useSslManageOriginCertList();
  const originCertDetail = useViewOriginCert();
  const [option, setOption] = useState<Option>();
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedPrivateKey, setCheckedPrivateKey] = useState<boolean>(true);
  const [checkeddomain, setCheckedDomain] = useState<boolean>(false);
  const [domain, setDomain] = useState<[]>([]);
  const [displayDomain, setDisplayDomain] = useState<string[]>();
  const [hidden, setHidden] = useState<boolean>(true);
  const [validityOption, setValidityOoption] = useState<Option>();
  const [ownPrivateKey, setOwnPrivateKey] = useState<boolean>(false);

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

  useEffect(() => {
    from(request(sslManageApi.originalCertOption())).subscribe((data) => {
      let Option: Option = [{ value: "", label: "" }];
      Object.entries(data.privateKeyTypes).forEach((item: any) => {
        let a = item[1];
        Option.push({ value: a.key, label: a.displayName });
      });
      setOption(Option);
      //  setOption
    });
    let validityoption: Option = [{ value: "", label: "" }];
    for (let i = 1; i < 16; i++) {
      validityoption?.push({ value: i * 365, label: i });
    }
    console.log(validityoption);
    setValidityOoption(validityoption);
  }, []);

  const handleOnclick = (key: any) => {
    sslManage.viewOriginCert(key);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const showRegisterDrawer = () => {
    setRegister(true);
  };

  const onClose = () => {
    setVisible(false);
    setRegister(false);
    setNewOriginCertDetail({});
  };

  const onFinish = (e: any) => {
    console.log(e);

    console.log(e.priprivateKeyType);

    let domainWithDot = domain.map((item) => {
      return `*.${item}`;
    });

    let o: string[] = [];

    let oppa = o.concat(e.domains, domainWithDot);
    console.log(oppa);

    let x = { ...e, usesOwnPrivateKey: ownPrivateKey };

    //这个privatekey 需要用户上传的

    let y: RequestOriginalCert = {
      domains: oppa,
      privateKeyType: e.priprivateKeyType,
      usesOwnPrivateKey: ownPrivateKey,
      validity: e.validity,
    };

    console.log(x);
    console.log(y);

    if (!checkeddomain) {
      from(request(sslManageApi.requestOriginalCert(x))).subscribe((data) => {
        if (data) {
        }
      });
    } else {
      from(request(sslManageApi.requestOriginalCert(y))).subscribe((data) => {
        if (data) {
        }
      });
    }
  };

  const handleTagChange = (e: []) => {
    console.log(e.length);
    if (e.length >= 1) {
      setHidden(false);
      setDomain(e);
      setDisplayDomain(e);
    } else {
      setHidden(true);
    }
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
        console.log(value);
        from(request(sslManageApi.certDelete(value))).subscribe((data) => {
          if (data) {
          }
        });
        // setEnableFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  const normalBtns = [
    {
      text: "申请证书",
      onClick: (value: any) => {
        showRegisterDrawer();
      },
    },
  ];

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
        text: "删除",
        event: (data:any) => {
          let deleteId = [data.uid]
          from(request(sslManageApi.certDelete(deleteId))).subscribe((data) => {
            if (data) {
            }
          });
        },
      },
    ],
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
      <Drawer
        title="申请证书"
        placement="left"
        onClose={onClose}
        visible={register}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Row gutter={[23, 23]}>
            <Col span={24}>
              <Checkbox
                checked={checkedPrivateKey}
                onChange={() => {
                  setOwnPrivateKey(false);
                  setCheckedPrivateKey(true);
                  setChecked(false);
                }}
              >
                <div> 使用Edgejoint生成私钥</div>
              </Checkbox>
            </Col>
            <Col span={24}>
              <Form.Item name="priprivateKeyType" hidden={checked}>
                <Select options={option}></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Checkbox
                checked={checked}
                onChange={() => {
                  setOwnPrivateKey(true);
                  setCheckedPrivateKey(false);
                  setChecked(true);
                }}
              >
                <div> 使用自己的私钥</div>
              </Checkbox>
            </Col>
            <Divider />
            <Col span={24}>
              <Form.Item name="priprivateKeyType" hidden={checkedPrivateKey}>
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="选择域名（单次只能选择同一顶级域名下的记录）"
                name="domains"
              >
                <Select
                  mode="tags"
                  onChange={(e: []) => {
                    console.log(e);
                    handleTagChange(e);
                  }}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Checkbox
                checked={checkeddomain}
                onChange={() => {
                  setCheckedDomain(!checkeddomain);
                }}
              >
                <div> 是否申请通配符证书</div>
              </Checkbox>
            </Col>
            <Col span={24}>
              <div>
                {displayDomain === undefined ? (
                  ""
                ) : (
                  <div hidden={hidden}>
                    即将为
                    {displayDomain.map((item, key) => {
                      return <div key={key}>{item}</div>;
                    })}
                    {checkeddomain === true
                      ? displayDomain.map((item, key) => {
                          return <div key={key}>*.{item}</div>;
                        })
                      : ""}
                    <div>域名申请证书</div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Form.Item name="validity" label="请选择证书有效期">
                <Select options={validityOption}></Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <div>默认证书有效期为15年,可选择您的证书有效期</div>
            </Col>
          </Row>
          <Row>
            <Form.Item>
              <Button htmlType="submit">确认</Button>
              <Button onClick={onClose}>取消</Button>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Index;

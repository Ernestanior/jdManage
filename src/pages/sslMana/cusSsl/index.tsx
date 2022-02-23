import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import {
  useSslManageCerList,
  useSslManageCustomerList,
  useViewCert,
} from "@/store/network/sslMange";
import sslManage from "@/store/network/sslMange/service";
import { DownOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Drawer,
  Dropdown,
  Input,
  Menu,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import moment from "moment";

import { FC, useEffect, useState } from "react";
const { Dragger } = Upload;
const { TextArea } = Input;
const Index: FC<Role> = (props: Role) => {
  const [params, setParams] = useState<any>();
  const [certDrawer, setCertDrawer] = useState<boolean>(false);
  const [uploadDrawer, setUploadDrawer] = useState<boolean>(false);
  const [newCertList, setNewCertList] = useState<any>();
  const [newCertDetail, setNewCertDetail] = useState<any>();
  const [options, setOption] = useState<object[]>();
  const customerList = useSslManageCustomerList();
  const certList = useSslManageCerList();
  const certDetail = useViewCert();

  //Table data
  useEffect(() => {
    if (props.type === 1) {
      if (params !== undefined) {
        if (params.filters !== undefined) {
          sslManage?.certList({
            sslDomains: params.filters.sslDomains,
            searchPage: params.searchPage,
            keyword: params.filters.keyword,
            //   type: props.type,
            site: { name: params.filters.site },
            customer: { name: params.filters.customer },
          });
        }
      }
    }
  }, [params, props.type]);

  //Cert Detail
  useEffect(() => {
    setNewCertDetail(certDetail);
  }, [certDetail]);

  //CustomerList for select option
  useEffect(() => {
    sslManage.customerList({
      page: 1,
      pageSize: 1000000,
    });
  }, []);

  useEffect(() => {
    let Option: object[] = [];
    customerList?.content &&
      Object.entries(customerList?.content).forEach((item: any) => {
        let a = item[1];
        Option.push({ value: a.uid, label: a.name });
      });
    setOption(Option);
  }, [customerList?.content]);

  //use uid request certDetial
  const passUid = (key: any) => {
    sslManage.viewCert(key);
  };

  //Open Cert Detail Drawer
  const showCertDrawer = () => {
    setCertDrawer(true);
  };

  //Close and reset Cert Detail Drawer
  const onCertClose = () => {
    setCertDrawer(false);
    setNewCertDetail({});
  };
  // Open Upload Drawer
  const showUploadDrawer = () => {
    setUploadDrawer(true);
  };
  // Close Upload Drawer
  const onUploadClose = () => {
    setUploadDrawer(false);
  };

  //Add new Key for the list due to no uniqueKey
  useEffect(() => {
    if (props.type === 1) {
      if (certList?.content !== undefined) {
        const arr = certList?.content.map((item: any, key: number) => ({
          ...item,
          key: key,
        }));
        const obj: object = {
          content: arr,
          number: certList?.number,
          numberOfElements: certList?.numberOfElements,
          size: certList?.size,
          sort: certList?.sort,
          totalElements: certList?.totalElements,
          totalPages: certList?.totalPages,
        };
        setNewCertList(obj);
      }
    }
  }, [
    certList?.content,
    certList?.number,
    certList?.numberOfElements,
    certList?.size,
    certList?.sort,
    certList?.totalElements,
    certList?.totalPages,
    props.type,
  ]);

  //TableColumn
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
      render: (key: any) => {
        return <div>{key !== null ? `${key}` : `-`}</div>;
      },
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
      title: "类型",
      dataIndex: "sslAuto",
      key: "sslAuto",
    },
    {
      title: "客户",
      dataIndex: "customer",
      key: "customer",
      render: (key: any) => {
        if (key !== "") {
          return <div>{key.name}</div>;
        } else return <div>-</div>;
      },
    },
  ];

  //Checkbox
  const batchBtns = [
    {
      text: "大量删除",
      onClick: (value: any) => {
        // setEnableFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  //button
  const normalBtns = [
    {
      text: "上传证书",
      onClick: () => {
        showUploadDrawer();
      },
    },
  ];

  //TemplateConfig
  const TempConfig = {
    optList: [
      {
        text: "查看",
        event: (data: any) => {
          passUid(data.uid);
          showCertDrawer();
        },
      },
      {
        text: "更新",
        event: (data: any) => {},
      },
    ],
    batchBtns: batchBtns,
    onSearch: (params: any) => setParams(params),
    rowId: "key",
    data: newCertList,
    config: config,
    normalBtns: normalBtns,
  };
  const pro = {
    name: "file",
    multiple: true,
    action: "",
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files, "eeeeeee", e);
    },
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
            text: "网站",
            name: "site",
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
        onClose={onCertClose}
        visible={certDrawer}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {newCertDetail !== {} ? (
          <div>
            <Row>
              <h3>證書信息</h3>
            </Row>

            <Row gutter={[16, 18]}>
              <Col span={5}>證書使用者</Col>
              <Col span={19}>{newCertDetail?.details?.subject}</Col>
              <Col span={5}>證書頒發者</Col>
              <Col span={19}>{newCertDetail?.details?.issuer}</Col>
              <Col span={5}>有效期</Col>
              <Col span={19}>
                {newCertDetail?.details?.notBefore
                  ? moment(newCertDetail?.details?.notBefore).format(
                      "YYYY/MM/DD"
                    ) + " 到"
                  : ""}{" "}
                {newCertDetail?.details?.notAfter
                  ? moment(newCertDetail?.details?.notAfter).format(
                      "YYYY/MM/DD"
                    )
                  : ""}
              </Col>
              <Col span={5}>匹配域名</Col>
              <Col span={19}>
                {newCertDetail?.details?.subjectAlternativeNames}
              </Col>
              <Col span={5}>簽名算法</Col>
              <Col span={19}>{newCertDetail?.details?.signatureAlgorithm}</Col>
              <Col span={5}>公鑰長度</Col>
              <Col span={19}>
                {newCertDetail?.details?.publicKeyLength
                  ? newCertDetail?.details?.publicKeyLength + " Bit"
                  : ""}
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col span={24}>
                <h3>證書文件</h3>
              </Col>
            </Row>
            <Row>
              <Col span={24}>私鑰</Col>
              <Col span={24}>
                <TextArea
                  showCount
                  style={{ height: 160 }}
                  allowClear={false}
                  value={newCertDetail?.sslKey}
                />
              </Col>
              <Col span={24}>證書</Col>
              <Col span={24}>
                <TextArea
                  showCount
                  style={{ height: 160 }}
                  allowClear={false}
                  value={newCertDetail?.sslCrt}
                />
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </Drawer>
      <Drawer
        title="查看证书"
        placement="left"
        onClose={onUploadClose}
        visible={uploadDrawer}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <div>
          <Row>
            <Col span={24}>使用者</Col>
            <Col span={24}>
              <Select
                options={options}
                onChange={(e: any) => console.log(e, "asda")}
                style={{ width: 250 }}
              />
            </Col>
            <Col>私鑰（KEY文件）</Col>
            <Divider />
            <Col>
              <Dragger {...pro}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            </Col>
            <Divider />
            <Col>證書（證書文件，PEM/CERT）</Col>
            <Divider />
            <Col></Col>
          </Row>
        </div>
      </Drawer>
    </div>
  );
};

export default Index;

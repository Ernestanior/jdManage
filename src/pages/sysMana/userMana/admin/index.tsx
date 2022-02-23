import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import CustomerService from "@/store/network/customer/service";
import { useUserManage } from "@/store/network/userManage";
import userManage from "@/store/network/userManage/service";
import { DownOutlined } from "@ant-design/icons";
import { Drawer, Form, Input, Button, Menu, Dropdown, Row, Col } from "antd";
import { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {
  const [Updateform] = Form.useForm();
  const [form] = Form.useForm();
  const [params, setParams] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [editDrawervisible, setEditDrawerVisible] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const customerList = useUserManage();

  useEffect(() => {
    if (props.type === "admin") {
      if (params !== undefined) {
        if (params.filters !== undefined) {
          userManage?.CustomerList({
            keyword: params.filters.keyword,
            searchPage: params.searchPage,
            type: "admin",
            status: params.filters.status,
            name: params.filters.name,
          });
        } else {
          userManage?.CustomerList({
            type: "admin",
            searchPage: { desc: 1, page: 1, pageSize: 25, sort: "create_Date" },
          });
        }
      }
    }
  }, [params, props.type, visible]);

  const showDrawer = () => {
    setVisible(true);
  };

  const showEditDrawer = () => {
    setEditDrawerVisible(true);
  };
  const onClose = () => {
    setVisible(false);
    setEditDrawerVisible(false);

    // setSupplierAccount({});
  };

  const submitNewAccount = (key: string[]) => {
    let obj = { ...key, type: "admin" };
    CustomerService.createCustomer(obj);
  };

  const updateDetail = (key: string[]) => {
    let obj = { ...key, uid: selectedCustomer.uid };
    CustomerService.modifyCustomer(obj);
  };

  const handleOnclick = (data: any) => {
    setSelectedCustomer(data);
  };

  useEffect(() => {
    console.log(selectedCustomer);
    if (selectedCustomer !== null) {
      Updateform.setFieldsValue({
        email: selectedCustomer.email,
        name: selectedCustomer.name,
      });
    }
  }, [Updateform, selectedCustomer]);

  const config = [
    {
      title: "使用者名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
  ];

  const TempConfig = {
    optList: [
      {
        text: "编辑",
        event: (data: any) => {
          handleOnclick(data);
          showEditDrawer();
        },
      },
      {
        text: "重置密码",
        event: (data: any) => {},
      },
      {
        text: "启用｜｜ 禁用",
        event: (data: any) => {},
      },
      {
        text: "删除",
        event: (data: any) => {},
      },
    ],
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          // setDeleteFlag(true);
          // setSelectedKey(value);
        },
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          // setEnableFlag(true);
          // setSelectedKey(value);
        },
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          // setDisableFlag(true);
          // setSelectedKey(value);
        },
      },
    ],
    normalBtns: [
      {
        text: "新增站点",
        onClick: showDrawer,
      },
    ],
    onSearch: (params: any) => {
      setParams(params);
    },
    rowId: "uid",
    data: customerList,
    config: config,
  };

  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "使用者名称",
            name: "name",
            type: "input",
          },
          {
            text: "状态",
            name: "status",
            data: [
              { uid: 0, name: "未启用" },
              { uid: 1, name: "正常" },
            ],
            type: "select",
          },
        ]}
        {...TempConfig}
      ></Template>
      <Drawer
        title="查看"
        placement="left"
        onClose={onClose}
        visible={visible}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          onFinish={submitNewAccount}
        >
          <Form.Item label="登入邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="使用者名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="编辑"
        placement="left"
        onClose={onClose}
        visible={editDrawervisible}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={Updateform}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17, offset: 2 }}
          onFinish={updateDetail}
        >
          <Form.Item label="登入邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="用户名" name="name">
            <Input />
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={6} offset={7}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Col>
              <Col span={6} offset={1}>
                <Button type="primary" onClick={onClose}>
                  取消
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Index;

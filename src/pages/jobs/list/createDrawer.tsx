import { FC, useEffect, useMemo } from "react";
import { jdApi } from "@/store/api";
import request from "@/store/request";
import { Button, Drawer, Form, Input, notification, Select } from "antd";
import { useCompanyList } from "@/store/network/company";
import companyService from "@/store/network/company/service";

interface IProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  loading: boolean;
  type: string | null;
}
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const { Option } = Select;
const CreateDrawer: FC<IProps> = ({
  visible,
  onClose,
  reload,
  loading,
  type,
}) => {
  const company = useCompanyList();
  const [form] = Form.useForm();

  useEffect(() => {
    !company && companyService.findCompany(1, 49);
  }, [company]);
  const companyList = useMemo(() => {
    return company && company.data;
  }, [company]);

  const onFinish = async (e: any) => {
    console.log(e);
    const res = await request(jdApi.CreateJd({ ...e }));
    if (res) {
      form.resetFields();
      onClose();
      reload();
      notification.success({ message: "success" });
    }
  };
  return (
    <Drawer
      title="新增职位"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={700}
      closable={false}
    >
      <Form
        onFinish={onFinish}
        initialValues={{ protocol: "HTTPS", websocket: false }}
      >
        <Form.Item
          {...formItemLayout}
          name="location"
          label="城市"
          rules={[
            {
              required: true,
              message: "City cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input city" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="companyId"
          label="公司"
          rules={[
            {
              required: true,
              message: "Company id cannot be empty!",
            },
          ]}
        >
          <Select>
            {companyList &&
              companyList.map((item: ICompanyInfo) => (
                <Option key={item.id} value={item.id}>
                  {item.companyName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="role"
          label="岗位名称"
          rules={[
            {
              required: true,
              message: "Role name cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input role name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="type"
          label="岗位类型"
          initialValue={"社招"}
          rules={[
            {
              required: true,
              message: "Type cannot be empty!",
            },
          ]}
        >
          <Select>
            <Option value={"社招"}>社招</Option>
            <Option value={"实习"}>实习</Option>
            <Option value={"校招"}>校招</Option>
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="ind"
          label="岗位所属行业类型"
          rules={[
            {
              required: true,
              message: "Ind cannot be empty!",
            },
          ]}
        >
          <Input placeholder="IT/旅游业/大数据/金融..." />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="salaryRange"
          label="工资"
          rules={[
            {
              required: true,
              message: "Salary cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Input Salary" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="eduReq" label="学历要求">
          <Input placeholder="Input Education" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="email" label="邮箱">
          <Input placeholder="Input Email" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="tags" label="标签">
          <Input placeholder="多个标签用英文逗号连接" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="wechat" label="hr微信">
          <Input placeholder="Input Wechat" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="desc"
          label="职位详情"
          rules={[
            {
              required: true,
              message: "Description cannot be empty!",
            },
          ]}
        >
          <Input.TextArea rows={20} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
          <Button className="default-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateDrawer;

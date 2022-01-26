// import "./index.less";
import { FC, useEffect, useMemo, useState } from "react";
import { Form, Drawer, Input, Select, Switch, notification } from "antd";
import Tip from "@/components/tip";
import { FormattedMessage } from "react-intl";
import IconFont, { tipIcon } from "@/components/icon";
import { ICustomerList } from "@/store/network/customer/interface";
import { Btn } from "@/components/button";
import CheckboxGroup from "@/components/checkboxGroup";
import SupplierService from "@/store/network/supplier/service";
import siteService from "@/store/network/site/service";
import { useSiteSupplierList, useSupplierList } from "@/store/network/supplier";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { siteApi } from "@/store/api";
import { json } from "stream/consumers";
import { Base64 } from "js-base64";
interface IProps {
  title: string;
  visible: boolean;
  editRow: any;
  onClose: () => void;
}
enum Status {
  故障 = "故障",
  正常 = "正常",
}

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const { Option } = Select;

const CreateDrawer: FC<IProps> = ({ title, editRow, visible, onClose }) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    if (editRow) {
      SupplierService.findSiteSupplier(editRow.uid);
      SupplierService.findSupplier(editRow.customer.uid);
    }
  }, [editRow]);

  const siteSupplierList = useSiteSupplierList();
  const defaultList = useMemo(
    () =>
      (siteSupplierList &&
        siteSupplierList.content &&
        siteSupplierList.content.map((item: any) =>
          JSON.stringify({
            uid: item.code,
            name: item.displayName,
          })
        )) ||
      [],
    [siteSupplierList]
  );

  const supplierList = useSupplierList();
  const optionList = useMemo(
    () =>
      (supplierList &&
        supplierList.map((item: any) =>
          JSON.stringify({
            uid: item.code,
            name: item.displayName,
          })
        )) ||
      [],
    [supplierList]
  );
  // console.log(optionList);

  const onFinish = (value: any) => {
    const submitData = {
      uid: editRow.uid,
      ...value,
      siteSuppliers: supplierList.map((item: any) => ({
        apiType: item.customerSupplier.tokenType,
        code: item.code,
        displayName: item.displayName,
        isConfigurable: item.customerSupplier.isConfigurable,
        isEnabled: checkedList
          .map((item) => JSON.parse(item).uid)
          .includes(item.code),
        name: item.name,
        option: checkedList
          .map((item) => JSON.parse(item).uid)
          .includes(item.code)
          ? "api"
          : "disabled",
        uid: item.customerSupplier.uid,
      })),
    };
    // console.log(submitData);

    from(request(siteApi.EditSite(submitData))).subscribe((data) => {
      console.log(data);
      notification.success({
        message: "Edit Success",
      });
      onClose();
    });
  };
  // const supplierList = useSupplierList();

  const loading = useLoading();

  return (
    <Drawer
      title={title}
      width={520}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-edit-drawer"
    >
      <Loading display={loading}></Loading>
      <Form
        onFinish={onFinish}
        initialValues={{
          name: editRow.name,
          remark: editRow.remark,
        }}
        requiredMark={false}
      >
        <Form.Item
          {...formItemLayout}
          name="name"
          label="站点名称"
          rules={[
            {
              required: true,
              message: "站点名称不能为空!",
            },
          ]}
        >
          <Input placeholder="请输入IP或IP网段，如123.123.123.123" />
        </Form.Item>

        <Form.Item {...formItemLayout} label="平台选择">
          <CheckboxGroup
            optionList={optionList}
            showCheckAll={optionList && optionList.length >= 2}
            checkedOptions={(list: any) => setCheckedList(list)}
            defaultList={defaultList}
          ></CheckboxGroup>
        </Form.Item>

        <Form.Item labelCol={{ span: 24 }} name="remark" label="备注">
          <Input.TextArea />
        </Form.Item>
        <div
          style={{
            width: "150px",
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-between",
          }}
        >
          <Btn type="primary" htmlType="submit" boxShadow>
            确定
          </Btn>
          <Btn htmlType="reset" boxShadow onClick={() => onClose()}>
            取消
          </Btn>
        </div>
      </Form>
    </Drawer>
  );
};
export default CreateDrawer;

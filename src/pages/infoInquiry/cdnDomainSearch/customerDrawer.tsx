import { Btn } from "@/components/button";
import accountService from "@/store/network/account/service";
import userService from "@/store/network/user/service";
import { Col, Divider, Drawer, Row } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  visible: boolean;
  onClose: () => void;
  drawerDetail: any;
}

const CustomerDrawer: FC<IProps> = ({ visible, onClose, drawerDetail }) => {
  return (
    <Drawer
      title="提示"
      placement="left"
      onClose={onClose}
      visible={visible}
      width={500}
      closable={false}
    >
      <Row>
        <Col span={4}>登入邮箱</Col>
        <Col span={16} offset={4}>
          {drawerDetail?.email}
        </Col>
        <Divider />
        <Col span={4}>使用者名称</Col>
        <Col span={16} offset={4}>
          {drawerDetail?.name}
        </Col>
        <Divider />
        <Col span={4}>账户类型</Col>
        <Col span={16} offset={4}>
          {drawerDetail?.supportsSupplier === true ? "企业版" : "-"}
        </Col>
        <Divider />
        <Col span={4}>域名额度</Col>
        <Col span={16} offset={4}>
          {drawerDetail?.domainQuota !== null ? drawerDetail?.domainQuota : "-"}
        </Col>
        <Divider />
        <Col span={4}>流量套餐</Col>
        <Col span={16} offset={4}>
          {drawerDetail?.dataAllowance !== null
            ? drawerDetail?.dataAllowance + " GB"
            : "-"}
        </Col>
        <Divider />
        <Col span={4}>防御（GB）</Col>
        <Col span={16} offset={4}>
          {drawerDetail?.defenceQuota !== null
            ? drawerDetail?.defenceQuota + " GB"
            : "-"}
        </Col>
        <Divider />
      </Row>
    </Drawer>
  );
};

export default CustomerDrawer;

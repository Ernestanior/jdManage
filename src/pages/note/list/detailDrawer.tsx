import { FC } from "react";
import { Col, Divider, Drawer, Row } from "antd";

interface IProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  data: any;
  title: string;
}

const DetailDrawer: FC<IProps> = ({ visible, onClose, data, title }) => {
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={700}
      closable={false}
      getContainer={false}
    ></Drawer>
  );
};

export default DetailDrawer;

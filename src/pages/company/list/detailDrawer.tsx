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
    >
      {Object.keys(data).map((item: string) => {
        if (item === "logoName") {
          return (
            <Row key={item}>
              <Col span={8}>{item}</Col>
              <Col span={15} offset={1}>
                <img
                  alt=""
                  src={`https://api.reviewonclass.com/static/image/${data[item]}`}
                  style={{ width: 100 }}
                />
              </Col>
              <Divider />
            </Row>
          );
        }
        return (
          <Row key={item}>
            <Col span={8}>{item}</Col>
            <Col span={15} offset={1}>
              {data[item]}
            </Col>
            <Divider />
          </Row>
        );
      })}
    </Drawer>
  );
};

export default DetailDrawer;

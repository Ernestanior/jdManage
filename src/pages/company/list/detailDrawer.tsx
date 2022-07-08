import { FC } from "react";
import { Col, Divider, Drawer, Row } from "antd";
import { img_url } from "@/store/request";

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
                  src={`${img_url}/${data[item]}`}
                  style={{ width: 100 }}
                />
              </Col>
              <Divider />
            </Row>
          );
        }
        if (item === "description") {
          return (
            <Row key={item}>
              <Col span={8}>{item}</Col>
              <Col span={15} offset={1}>
                <pre style={{ whiteSpace: "pre-wrap" }}>{data[item]}</pre>
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

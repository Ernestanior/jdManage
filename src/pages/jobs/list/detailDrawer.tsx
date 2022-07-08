import { FC } from "react";
import { Col, Divider, Drawer, Row } from "antd";
import Loading from "@/components/loading/context";
import { img_url } from "@/store/request";

interface IProps {
  visible: boolean;
  onClose: () => void;
  reload: () => void;
  data: any;
  title: string;
  loading: boolean;
}

const DetailDrawer: FC<IProps> = ({
  visible,
  onClose,
  data,
  title,
  loading,
}) => {
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
      <Loading display={loading}></Loading>
      {data &&
        Object.keys(data).map((item: string) => {
          if (item === "compLogo") {
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
          if (item === "desc") {
            return (
              <Row key={item}>
                <Col span={8}>{item}</Col>
                <Col span={15} offset={1}>
                  <pre>{data[item]}</pre>
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

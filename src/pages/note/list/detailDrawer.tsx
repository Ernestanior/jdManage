import { FC } from "react";
import { Col, Divider, Drawer, Row } from "antd";
import Loading from "@/components/loading/context";
import { convertTime } from "@/common/utils/util";
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
      width={1000}
      closable={false}
      getContainer={false}
    >
      <Loading display={loading}></Loading>
      {data &&
        Object.keys(data).map((item: string) => {
          if (item === "pics") {
            return (
              <Row key={item}>
                <Col span={4}>{item}</Col>
                <Col span={19} offset={1}>
                  {data[item].length
                    ? data[item].map((i: string) => (
                        <img
                          key={i}
                          alt=""
                          src={`${img_url}/${i}`}
                          style={{
                            width: 100,
                            display: "block",
                            marginTop: 10,
                          }}
                        />
                      ))
                    : "该笔记没图片"}
                </Col>
                <Divider />
              </Row>
            );
          }
          if (item === "content") {
            return (
              <Row key={item}>
                <Col span={4}>{item}</Col>
                <Col span={19} offset={1}>
                  <pre>{data[item]}</pre>
                </Col>
                <Divider />
              </Row>
            );
          }
          if (item === "likedByCurUser" || item === "favedByCurUser") {
            return (
              <Row key={item}>
                <Col span={4}>{item}</Col>
                <Col span={19} offset={1}>
                  {data[item] ? "true" : "false"}
                </Col>
                <Divider />
              </Row>
            );
          }
          if (item === "publishTime") {
            return (
              <Row key={item}>
                <Col span={4}>{item}</Col>
                <Col span={19} offset={1}>
                  {convertTime(data[item])}
                </Col>
                <Divider />
              </Row>
            );
          }
          return (
            <Row key={item}>
              <Col span={4}>{item}</Col>
              <Col span={19} offset={1}>
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

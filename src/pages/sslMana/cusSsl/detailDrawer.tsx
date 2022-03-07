import { Col, Divider, Drawer, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { FC } from "react";
interface IProps {
  visible: boolean;
  onClose: () => void;
  certData: any;
}
const CreateDrawer: FC<IProps> = ({ visible, onClose, certData }) => {
  return (
    <Drawer
      title="查看证书"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={540}
      closable={false}
      getContainer={false}
    >
      {certData !== {} ? (
        <div>
          <Row>
            <h3>證書信息</h3>
          </Row>
          <Row gutter={[16, 18]}>
            <Col span={5}>證書使用者</Col>
            <Col span={19}>{certData?.details?.subject}</Col>
            <Col span={5}>證書頒發者</Col>
            <Col span={19}>{certData?.details?.issuer}</Col>
            <Col span={5}>有效期</Col>
            <Col span={19}>
              {certData?.details?.notBefore
                ? moment(certData?.details?.notBefore).format("YYYY/MM/DD") +
                  " 到"
                : ""}{" "}
              {certData?.details?.notAfter
                ? moment(certData?.details?.notAfter).format("YYYY/MM/DD")
                : ""}
            </Col>
            <Col span={5}>匹配域名</Col>
            <Col span={19}>{certData?.details?.subjectAlternativeNames}</Col>
            <Col span={5}>簽名算法</Col>
            <Col span={19}>{certData?.details?.signatureAlgorithm}</Col>
            <Col span={5}>公鑰長度</Col>
            <Col span={19}>
              {certData?.details?.publicKeyLength
                ? certData?.details?.publicKeyLength + " Bit"
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
                value={certData?.sslKey}
                readOnly={true}
              />
            </Col>
            <Col span={24}>證書</Col>
            <Col span={24}>
              <TextArea
                showCount
                style={{ height: 160 }}
                value={certData?.sslCrt}
                readOnly={true}
              />
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
    </Drawer>
  );
};

export default CreateDrawer;

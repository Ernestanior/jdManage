import { Btn } from "@/components/button";
import { PlusOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import "./index.less";

const Index = () => {
  return (
    <div>
      <Row>
        <Col span={5}>
         
 
        </Col>
        <Col span={3} offset={16}>
          <Btn>
            <PlusOutlined style={{ fontSize: 13 }} />
            新增工单
          </Btn>
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
};

export default Index;

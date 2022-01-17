import { Form, Row, Col, Input } from "antd";
import { useCallback, useState } from "react";
import { fastRender, IRenderConfig } from "../fastRender";
import { SearchOutlined,SlidersOutlined } from "@ant-design/icons";
import { Btn } from "../button";
import {EdgeModal} from "@/components/modal"
interface IProps {
  searchList?: IRenderConfig[];
  disable:boolean;
  onSearch: (value: {}) => void;
  primarySearch:string;
}

export const Filter = ({ searchList, onSearch,disable,primarySearch }: IProps) => {
  const [showMal, setModal] = useState(false);
  const [inputValue,setInputValue]= useState('')
  const onFinish = (value: any) => {    
    onSearch(value);
  };
  return (
    <div>
      <Input 
        style={{borderRadius:"15px",width:"250px",fontSize:"18px"}} 
        onChange={e=>setInputValue(e.currentTarget.value)}
        onPressEnter={()=>onSearch({[primarySearch]:inputValue })}
        // onPressEnter={e=>onSearch({[primarySearch]:e.currentTarget.value })}
        prefix={<SearchOutlined onClick={()=>onSearch({[primarySearch]:inputValue})}/>} 
        suffix={<SlidersOutlined 
          style={{backgroundColor:"#fde5ce",padding:"5px 7px",borderRadius:"10px",color:"orange"}}
          onClick={()=>setModal(true)}
          />}>
      </Input>
      <EdgeModal visible={showMal} onCancel={()=>setModal(false)} onOk={()=>setModal(false)}>
        <Form
          style={{
            padding: "20px 20px 0 0",
            marginBottom: "10px",
            backgroundColor: "#fff",
          }}
          onFinish={onFinish}
        >
          {searchList && (
            <Row gutter={20}>
              {searchList.map((config, index) => (
                <Col span={16} key={index}>
                  {fastRender(config)}
                </Col>
              ))}
            </Row>
          )}
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <Btn
              type="primary"
              htmlType="submit"
              marginRight="15px"
              onClick={()=>setModal(false)}
            >搜索</Btn>
            <Btn
              htmlType="submit"
              onClick={()=>setModal(false)}
            >返回</Btn>
          </div>

        </Form>
      </EdgeModal>
    </div>
  );
};

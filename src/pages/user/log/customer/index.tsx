import {
  DatePicker,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Spin,
  Table,
} from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import "./index.less";
import IconFont from "@/components/icon";
import { Template } from "@/components/template";
import userService from "@/store/network/user/service";
import moment from "moment";
import { useCodeList, useEventList } from "@/store/network/user";
import { SearchOutlined, SlidersOutlined } from "@ant-design/icons";
import { worklogDetail } from "@/store/api/user";

interface filterList {
  label: string;
  name: string;
  id: string;
  type: string;
}
interface NewTemplateProps {
  //Search
  onFinish?: (value: any) => void;
  onFinishFailed?: (value: any) => void;
  //Form.Item Name
  searchBar?: [
    {
      name: string;
      showFilter?: boolean;
    }
  ];
  searchFilter?: filterList[];

  searchValue?: string;
  optionData?: any;
  //Table
  expandable?: boolean;
  RenderData?: any;
  columns?: any;
  dataSource?: any;
  //Pagination
  total?: number;
  totalpage?: number;
}

const Index: FC<NewTemplateProps> = (props): ReactElement => {
  const { Option } = Select;
  const [searchValue, setSearchValue] = useState<string>("");
  const [hidden, setHidden] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any>()
  const [expandData, setExpanddata]= useState<any>()
  const onSearch = (value: string) => {
    console.log(value, "value");
    setSearchValue(value);
  };
  const [form] = Form.useForm();
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinish}
      >
        {props.searchBar
          ? props.searchBar.map((item, index) => {
              return (
                <div key={index}>
                  <Form.Item name={item.name} key={index}>
                    <Input
                      key={index}
                      onChange={(e) => onSearch(e.target.value)}
                      style={{
                        borderRadius: "15px",
                        width: "250px",
                        fontSize: "18px",
                      }}
                      //  onChange={(e) => setInputValue(e.currentTarget.value)}
                      // onPressEnter={() => onSearch({ [primarySearch]: inputValue })}
                      // onPressEnter={e=>onSearch({[primarySearch]:e.currentTarget.value })}
                      prefix={
                        <SearchOutlined onClick={() => onSearch(searchValue)} />
                      }
                      suffix={
                        <SlidersOutlined
                          style={{
                            backgroundColor: "#fde5ce",
                            padding: "5px 7px",
                            borderRadius: "10px",
                            color: "orange",
                          }}
                          onClick={() => setHidden(!hidden)}
                        />
                      }
                    ></Input>
                  </Form.Item >
                  
                  {item.showFilter
                    ? props.searchFilter
                      ? props.searchFilter.map((item, index) => {
                          return (
                            <Form.Item
                              key={index}
                              name={item.name}
                              id={item.id}
                              label={item.label}
                              hidden={hidden}
                            >
                              {item.type === "datePicker" ? (
                                <DatePicker key={index}
                                  style={{ width: 200 }}
                                  format="YYYY-MM-DD"
                                />
                              ) : item.type === "select" ? (
                                
                                <Select key={index}>
                                  {props?.optionData ? (
                                    Object.entries(
                                      item.name === "eventService"
                                        ? props?.optionData.eventService
                                        : item.name === "eventType"
                                        ? props?.optionData.eventType
                                        : ""
                                    ).map(
                                      ([key, value]: any, index: number) => {
                                        return (
                                          <Option key={index + 1} value={key}>
                                            {value}
                                          </Option>
                                        );
                                      }
                                    )
                                  ) : (
                                    <Option value="" key={-1}>
                                      <Spin />
                                    </Option>
                                  )}
                                </Select>
                              ) : (
                                ""
                              )}
                            </Form.Item>
                          );
                        })
                      : ""
                    : ""}
                </div>
              );
            })
          : ""}
      </Form>
      <div>
        {/* <Table
                expandable={{
                  expandedRowRender: (renderData: worklogDetail) => {
                    if (renderData.eventId === props.RenderData?.eventId) {
                      return (
                    <div>

                    </div>
                  
                      );
                    } else return <Spin />;
                  },
                  expandIcon: ({ expanded, onExpand, record }) =>
                    expanded ? (
                      <IconFont
                        type="icon-search"
                        className="SearchBtn"
                        style={{ fontSize: 12 }}
                        onClick={(e) => {
                          onExpand(record, e);
                        }}
                      ></IconFont>
                    ) : (
                      <IconFont
                        type="icon-search"
                        className="SearchBtn"
                        style={{ fontSize: 12 }}
                        onClick={(e) => {
                          onExpand(record, e);
                        }}
                      ></IconFont>
                    ),
                  onExpand: (e, record: any) => {
                    if (e) {
                      seteventID(record?.eventId);
                      setKey(record?.key);
                    } else {
                      setKey(-1);
                    }
                  },
                  expandedRowKeys: key >= 0 ? [key] : [-1],
                }}
                columns={columns}
                dataSource={newWorkLog ? newWorkLog : []}
                scroll={{ x: 1000, y: 500 }}
                pagination={false}
        >
          
 
        </Table> */}

      </div>
    </div>

  );
};

export default Index;

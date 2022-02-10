import { DatePicker, Form, Input, Pagination, Row, Select, Table } from "antd";
import { FC, useEffect, useState } from "react";
import "./index.less";
import IconFont from "@/components/icon";
import userService from "@/store/network/user/service";
import { useCodeList, useEventList, useWorkLog } from "@/store/network/user";
import moment from "moment";
import { Spin } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { columns } from "./config";
import { Btn } from "@/components/button";
import { worklogDetail, eventList, GeteventList } from "@/store/api/user";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import Icon, {
  LeftOutlined,
  SearchOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
const { Search } = Input;

interface IncludeAll {
  role: string;
}

const { Option } = Select;

const Index: FC<IncludeAll> = (props: IncludeAll) => {
  useEffect(() => {
    console.log(props.role, "props");
    setrole(props.role);
  }, [props.role]);

  const [form] = Form.useForm();
  const [eventID, seteventID] = useState<string | null>(null);
  //Table Row Key
  const [key, setKey] = useState<number>(-1);
  //Admin WorkLog or UserWorklog
  const [role, setrole] = useState<string>("1");
  //raw log detail
  const LogDetail = useWorkLog();
  const [workLogDetail, setWorkLogDetail] = useState<worklogDetail | null>();
  //raw codelist
  const codelist = useCodeList();
  const [newcodeList, setNewCodelist] = useState<any>();
  const worklog = useEventList();
  const [newWorkLog, setNewWorkLog] = useState<[]>();

  const [searchValues, setSearchValues] = useState<string>();
  const [filterSearch, setfilterSearch] = useState<GeteventList>();
  const [loading, setLoading] = useState<boolean>();
  const [hidden, setHidden] = useState<boolean>(true);
  //const [role, setRole] = useState<boolean>(props);
  useEffect(() => userService?.UserServiceWorkLogCodeList(), []);
  useEffect(() => userService?.UserServiceLogDetail(eventID), [eventID]);
  //page load
  useEffect(() => {
    setLoading(true);
    setNewWorkLog([]);
    if (role === "2") {
      userService?.UserServiceWorkLogEventList({
        searchPage: {
          page: 1,
          pageSize: 25,
        },
        includesAll: true,
      });
    } else {
      userService?.UserServiceWorkLogEventList({
        searchPage: {
          page: 1,
          pageSize: 25,
        },
      });
    }
  }, [role]);

  useEffect(() => {
    return setNewCodelist(codelist);
  }, [codelist]);

  //把得到的eventlist加多一个keyCol
  useEffect(() => {
    if (worklog) {
      let a = worklog?.content.map((item: eventList, index: number) => ({
        ...item,
        key: index,
      }));
      setNewWorkLog(a);
      setLoading(false);
    }
  }, [worklog]);

  //Worklog Detail
  useEffect(() => {
    setWorkLogDetail(LogDetail);
  }, [LogDetail]);

  //多功能搜索
  const onFinish = (values: GeteventList) => {
    console.log(values);
    setfilterSearch(values);
    setLoading(true);
    setNewWorkLog([]);
    userService?.UserServiceWorkLogEventList({
      includesAll: role === "2" ? true : false,
      eventType: values.eventType,
      keyword: values.keyword,
      eventService: values.eventService,
      startDate: values.startDate
        ? moment(values.startDate).format("YYYY-MM-DD")
        : "",
      endDate: values.endDate
        ? moment(values.endDate).format("YYYY-MM-DD")
        : "",
      searchPage: {
        page: 1,
        pageSize: 25,
      },
    });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<GeteventList>) => {
    console.log("Failed:", errorInfo);
  };

  const onSearch = (value: string| undefined) => {
    console.log(value);
    setSearchValues(value);
    setLoading(true);
    setNewWorkLog([]);
    userService?.UserServiceWorkLogEventList({
      includesAll: role === "2" ? true : false,
      keyword: value,
      searchPage: {
        page: 1,
        pageSize: 25,
      },
    });
  };

  const hanldePagination = (page: number, pageSize: number) => {
    setLoading(true);
    setNewWorkLog([]);

    userService?.UserServiceWorkLogEventList({
      includesAll: role === "2" ? true : false,
      eventType: filterSearch?.eventType,
      keyword: searchValues,
      eventService: filterSearch?.eventService,
      startDate: filterSearch?.startDate
        ? moment(filterSearch?.startDate).format("YYYY-MM-DD")
        : "",
      endDate: filterSearch?.endDate
        ? moment(filterSearch?.endDate).format("YYYY-MM-DD")
        : "",
      searchPage: {
        page: page === 0 ? 1 : page,
        pageSize: pageSize,
      },
    });
  };

  return (
    <div>
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="keyword">
            <Input
             onChange={(e) => onSearch(e.target.value)}
              style={{ borderRadius: "15px", width: "250px", fontSize: "18px" }}
              //  onChange={(e) => setInputValue(e.currentTarget.value)}
              // onPressEnter={() => onSearch({ [primarySearch]: inputValue })}
              // onPressEnter={e=>onSearch({[primarySearch]:e.currentTarget.value })}
              prefix={
                <SearchOutlined
                onClick={()=>onSearch(searchValues)}
                />
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
          </Form.Item>
          {/* <Row>
            <Form.Item name="keyword">
              <Search
                placeholder="input search text"
                allowClear
                size="large"
                onChange={(e) => onSearch(e.target.value)}
                style={{ width: 200 }}
              ></Search>
            </Form.Item>
            <Form.Item>
              <Btn onClick={() => setHidden(!hidden)}>显示</Btn>
            </Form.Item>
          </Row> */}
          <Form.Item
            label="功能"
            name="eventType"
            id="eventType"
            hidden={hidden}
          >
            <Select placeholder="" style={{ width: 200 }}>
              <Option key={0} value="" children={""} />
              {newcodeList?.eventType ? (
                Object.entries(newcodeList?.eventType).map(
                  ([key, value]: any, index: number) => {
                    return (
                      <Option key={index + 1} value={key}>
                        {value}
                      </Option>
                    );
                  }
                )
              ) : (
                <Option value="">
                  <Spin />
                </Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label="菜单"
            name="eventService"
            id="eventService"
            hidden={hidden}
          >
            <Select placeholder="" style={{ width: 200 }}>
              <Option key={0} value="" children={""} />

              {newcodeList?.eventService ? (
                Object.entries(newcodeList.eventService).map(
                  ([key, value]: any, index: number) => {
                    return (
                      <Option key={index + 1} value={key}>
                        {value}
                      </Option>
                    );
                  }
                )
              ) : (
                <Option value="">
                  <Spin />
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="开始日期"
            name="startDate"
            wrapperCol={{ span: 6 }}
            id="startDate"
            hidden={hidden}
          >
            <DatePicker style={{ width: 200 }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="结束日期"
            name="endDate"
            wrapperCol={{ span: 6 }}
            id="endDate"
            hidden={hidden}
          >
            <DatePicker style={{ width: 200 }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item hidden={hidden}>
            <Btn type="primary" htmlType="submit">
              查询
            </Btn>
          </Form.Item>
        </Form>
      </div>
      <Table
        loading={loading}
        expandable={{
          expandedRowRender: (worklog: worklogDetail) => {
            if (worklog.eventId === workLogDetail?.eventId) {
              return (
                <div>
                  <Form
                    labelAlign="left"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 5 }}
                  >
                    <FormItem label="操作ID">
                      <label>{workLogDetail.eventId}</label>
                    </FormItem>
                    <FormItem label="时间">
                      <label>{workLogDetail.eventDate}</label>
                    </FormItem>
                    <FormItem label="操作类别">
                      <label>{workLogDetail.eventService}</label>
                    </FormItem>
                    <FormItem label="相关站点">
                      <label>{workLogDetail.resourceName}</label>
                    </FormItem>
                    <FormItem label="操作动作">
                      <label>{workLogDetail.eventType}</label>
                    </FormItem>
                    <FormItem label="操作者">
                      <label>{workLogDetail.initiator}</label>
                    </FormItem>
                    <FormItem label="旧数据">
                      <label>{workLogDetail.oldData}</label>
                    </FormItem>
                    <FormItem label="新数据">
                      <label>{workLogDetail.newData}</label>
                    </FormItem>
                  </Form>
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
              console.log(record, "aa");
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
      />
      <Pagination
        total={!loading ? worklog?.totalElements : ""}
        defaultPageSize={25}
        showSizeChanger
        pageSizeOptions={[25, 50, 100]}
        showQuickJumper
        showTotal={(total) =>
          `Total ${total} items ${worklog?.totalPages} page`
        }
        onChange={(page, pageSize) => hanldePagination(page, pageSize)}
      />
    </div>
  );
};

export default Index;

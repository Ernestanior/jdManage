import IconFont from "@/components/icon";
import userService from "@/store/network/user/service";
import { message, Popconfirm, Table } from "antd";
import moment from "moment";
export const columns = [
  {
    title: "功能",
    dataIndex: "eventType",
    key: "eventType",
    width: "38%",
  },
  {
    title: "菜单",
    dataIndex: "resourceType",
    key: "resourceType",
    width: "12%",
  },
  {
    title: "站点/域名",
    dataIndex: "resourceName",
    key: "resourceName",
    width: "12%",
  },
  {
    title: "执行人",
    dataIndex: "initiator",
    key: "initiator",
    width: "19%",
  },
  {
    title: "执行时间",
    dataIndex: "eventDate",
    key: "eventDate",
    render: (text: number) => moment(text).format("YYYY/MM/DD h:mm:ss"),
    width: "19%",
  },
  Table.EXPAND_COLUMN,
  {
    title: "操作",
    dataIndex: "",
    key: "",
    render: (key: any) => (
      <div>
        <Popconfirm
          title="Are you sure delete this task?"
          //visible={this.state.visible}
          //onVisibleChange={this.handleVisibleChange}
          onConfirm={()=>confirm(key)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <IconFont
            type="icon-shanchu"
            className="DeleteBtn"
            style={{ fontSize: 17, color: "#FF8900" }}
          ></IconFont>
        </Popconfirm>
      </div>
    ),

    width: "7%",
  },
];

const confirm = (key: { eventId: any; }) =>{

    const X = key.eventId;
    console.log(X);
    userService.UserDeleteWorkLog([X]);
    message.success('Delete Success');

}
const cancel = ()=>{

}
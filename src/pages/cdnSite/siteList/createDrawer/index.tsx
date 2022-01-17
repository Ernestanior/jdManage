import { from, Subject } from "rxjs";
// import "./index.less";
import { FC, useCallback, useEffect } from "react";
import { Form, Drawer, Button, notification } from "antd";

interface IProps {
  title: string;
  visible: boolean;
}
const CreateDrawer: FC<IProps> = ({
  title,
  visible,
}) => {
  return (
    <Drawer
    title="Create a new account"
    width={720}
    // onClose={onClose}
    visible={visible}
    bodyStyle={{ paddingBottom: 80 }}
    >
      123
    </Drawer>
  );
};
export default CreateDrawer


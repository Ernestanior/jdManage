import { from, Subject } from "rxjs";
// import "./index.less";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { Form, Drawer, Button, notification } from "antd";
// import { IAction, IFormData } from "./useFormEvent";
import request from "@/store/request";

interface IProps {
//   data$?: Subject<IFormData>;
//   initialValues?: any;
  title: string;
  visible: boolean;
//   onClose: () => void;
//   submit: (value: any) => void;
//   dragData?: any;
}

export const EdgeDrawer: FC<IProps> = ({
//   data$,
  title,
  visible,
//   onClose,
//   submit,
//   initialValues,
  children,
//   dragData,
}) => {

//   const closeEvent = useCallback(() => {
//     formData.resetFields();
//     onClose();
//   }, [formData, onClose]);

//   const onFinish = useCallback(
//     (values: any) => {
//       submit(values);
//       formData.resetFields();
//     },
//     [submit, formData]
//   );

//   useEffect(() => {
//     const sub =
//       data$ &&
//       data$.subscribe((data) => {
//         if (data.type === IAction.add) {
//           // setVisible(true)
//         }
//         if (data.type === IAction.edit) {
//           formData.setFieldsValue(data.data);
//         }
//       });
//     return () => sub && sub.unsubscribe();
//   }, [formData, data$]);

  //用于ssl页面把拖拽文件读取的内容放到input框里
//   useEffect(() => {
//     formData.setFieldsValue(dragData);
//   }, [dragData, formData]);

//   useEffect(() => {
//     if (initialValues) {
//       formData.setFieldsValue(initialValues);
//     }
//   }, [initialValues, formData]);

  return (
    <Drawer
      title={title}
      width={450}
      visible={visible}
    //   placement="left"
    //   onClose={closeEvent}
    //   maskClosable={false}
    //   closable={false}
    >
        {children}
    </Drawer>
  );
};



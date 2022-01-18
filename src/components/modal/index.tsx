import React, { FC, ReactElement, useState } from "react";
import "./index.less";
import { Button, Modal } from "antd";
export interface IProps {
  /** 弹窗模块标题 */
  title?: string;
  /** 弹窗模宽度 */
  modalWidth?: number;
  children?: any;
  /** 模块内容，通过插槽以标签内容传入，组件通过prop.children接收 */
  content?: any;
  /** 是否显示modal */
  visible:boolean;
  onCancel:()=>void;
  onOk:()=>void;
}
/** 弹窗模块 */
export const EdgeModal: FC<IProps> = ({
  title,
  modalWidth,
  children,
  visible,
  onOk,
  onCancel
}): ReactElement => {
  return (
    <div>
      <Modal
        width={modalWidth||700}
        title={title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={false} 
      >
        {children}
      </Modal>
    </div>
  );
};

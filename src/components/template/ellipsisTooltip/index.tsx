import React, { FC, useState, useRef } from "react";
import { Tooltip } from "antd";

interface IProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

const EllipsisTooltip: FC<IProps> = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const handleVisibleChange = (updatedVisible: any) => {
    if (container.current) {
      if (container.current.clientWidth < container.current.scrollWidth) {
        setVisible(updatedVisible);
      }
    }
  };

  return (
    <Tooltip
      placement="left"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      title={title}
    >
      <div
        ref={container}
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
};

export default EllipsisTooltip;

import { createFromIconfontCN } from "@ant-design/icons";
import { IconFontProps } from "@ant-design/icons/lib/components/IconFont";
import { Tooltip } from "antd";
import React, { FC } from "react";
// import useIntlDep from '@/common/intl/useIntlDep';

export const IconFontP = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/font_1258000_rhelkz537xi.js"],
  extraCommonProps: {
    style: {
      fontSize: 28,
    },
  },
});

const IconFont: FC<IconFontProps> = (props) => {
  // const loadText = useIntlDep();
  const { title: titleProps, ...restProps } = props;
  if (props.disabled) {
    restProps.style = {
      opacity: 0.6,
      fontSize: 28,
      ...restProps.style,
      cursor: "not-allowed",
    };
    delete restProps.onClick;
  }
  if (titleProps) {
    const title = titleProps;
    // const title = !!enableIntl ? loadText({id: titleProps}) : titleProps;
    return (
      <Tooltip title={title}>
        <IconFontP {...restProps} />
      </Tooltip>
    );
  }
  return <IconFontP {...props} />;
};

export default IconFont;

export const tipIcon = (
  <IconFont type="icon-wenti" style={{ color: "#ef8f35" }} />
);

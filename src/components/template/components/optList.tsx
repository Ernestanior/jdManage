import { Dropdown, Menu, Space } from "antd";
import React, { FC, useEffect } from "react";
import { IOperation, IColumnsTypeP, IOperationConfig } from "../interface";
import { EllipsisOutlined } from "@ant-design/icons";
import { XOR } from "ts-xor";
// const isDateFormat = new RegExp(/^[0-9]{4}-[0-9]{2}$/g);
/**
 * 构建操作列config,
 * @param optlist 选项
 * @param optEl 操作栏标题
 */
export const createOptList = (
  optlist?: IOperationConfig,
  optEl?: React.ReactNode
) => {
  if (optlist && optlist.length > 0) {
    // 只有1个选项，直接显示，超过2个直接下拉
    const type =
      optlist.length <= 1 && !optlist.some(Array.isArray)
        ? "horizontal"
        : "dropDown";
    const config: IColumnsTypeP = {
      key: "tb_action",
      width: 150,
      // fixed: "right",
      onCell() {
        return {
          style: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        };
      },
      // title: (optEl || <FormattedMessage id="OPERATION" />) as any,
      title: optEl as any,
      render: (_, record) => {
        return (
          <OptListComp
            key="tb_action_op"
            type={type}
            optList={optlist as any}
            value={record}
          />
        );
      },
    };
    return config;
  }
  return null;
};

interface IOptPropsType1 {
  type: "horizontal";
  optList: IOperation<any>[];
  value: any;
}

interface IOptPropsType2 {
  type: "dropDown";
  optList: IOperationConfig;
  value: any;
}

type IOptProps = XOR<IOptPropsType1, IOptPropsType2>;

const OptListComp: FC<IOptProps> = (props) => {
  if (props.type === "horizontal") {
    return (
      <Space key="tb_opt">
        {props.optList.map((opt, i) => {
          // const title = opt.text;
          // 符合隐藏条件
          if (opt.hide && opt.hide(props.value)) {
            return null;
          }
          return (
            <div
              key={i}
              onClick={() => {
                opt.event(props.value);
              }}
              style={{ fontSize: "20px" }}
            >
              {opt.icon}
            </div>
          );
        })}
      </Space>
    );
  }
  const hanleClick = (event: any) => {
    const idx: number[] = (event.key && event.key.split("-")) || [];
    if (idx[1] !== undefined) {
      if (props.optList[idx[0]]) {
        const optZ = props.optList[idx[0]] as IOperation<any>[];
        const opt = optZ[idx[1]];
        opt && opt.event(props.value);
      }
      return;
    }
    const opt = props.optList[idx[0]] as IOperation<any>;
    opt && opt.event(props.value);
    return;
  };
  const menulist: any[] = [];

  props.optList.map((optZ, idx1) => {
    if (Array.isArray(optZ)) {
      // let deviderAdded = false;
      optZ.map((opt, idx2) => {
        // 符合隐藏条件
        if (opt.hide && opt.hide(props.value)) {
          return false;
        }
        const elo = (
          <Menu.Item key={`${idx1}-${idx2}`}>
            {/* {isDateFormat.test(opt.text) ? (
              !isDateFormat.test(opt.text) ? (
                opt.text
              ) : (
                opt.text
              )
            ) : (
              <IntlDep id={opt.text} values={opt.textValue} />
            )} */}
            {opt.text}
          </Menu.Item>
        );
        // const el = roleAuth(elo, opt.role);
        // if (el) {
        // if (!deviderAdded) {
        //   deviderAdded = true;
        //   menulist.push(
        //     <Menu.Divider style={{ margin: 0 }} key={`divider-${idx1}`} />
        //   );
        // }
        menulist.push(elo);
        // }
        return true;
      });
    } else {
      // 符合隐藏条件
      if (optZ.hide && optZ.hide(props.value)) {
        return false;
      }
      const elo = (
        <Menu.Item key={idx1}>
          {/* <IntlDep id={optZ.text} values={optZ.textValue} /> */}
          {optZ.text}
        </Menu.Item>
      );

      // const el = roleAuth(elo, optZ.role);
      // if (el) {
      // menulist.push(
      //   <Menu.Divider style={{ margin: 0 }} key={`divider-${idx1}`} />
      // );
      menulist.push(elo);
      // }
    }
    return true;
  });

  const menus = <Menu onClick={hanleClick}>{menulist}</Menu>;

  return (
    <Dropdown key="tb_opt" overlay={menus}>
      {/* <MoreOutlined style={{ transform: "rotate(90deg)", fontSize: "25px" }} /> */}
      <EllipsisOutlined style={{ fontSize: "26px", fontWeight: "600" }} />
      {/* <IconFont
          type="iconsort-desc"
          style={{
            fontSize: "12px",
            marginLeft: "3px",
          }}
        /> */}
    </Dropdown>
  );
};

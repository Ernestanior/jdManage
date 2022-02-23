import { Template } from "@/components/template";
import useUid from "@/hooks/useUid";
import { useSiteSupplierList$ } from "@/store/network/supplier";
import SupplierService from "@/store/network/supplier/service";
import request from "@/store/request";
import { Button, notification, Select } from "antd";
import { supplierApi } from "@/store/api";
import { FC, ReactElement, useEffect, useState } from "react";
import { from } from "rxjs";
import { ISearchPage } from "@/store/network/site/interface";
import { IChangeOption } from "@/store/network/supplier/interface";
import Choose from "./chooseDrawer";
import Edit from "./editDrawer";

const { Option } = Select;

const Index: FC = (): ReactElement => {
  const uid = useUid();
  const supplierList = useSiteSupplierList$();
  const [chooseFlag, setChooseFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [searchPage, setSearchPage] = useState<ISearchPage>({
    page: 1,
    pageSize: 10,
  });
  const [modifyingId, setModifyingId] = useState("");
  const [editingId, setEditingId] = useState("");
  const [modifyData, setModifyData] = useState<IChangeOption>();
  const onChange = (uid: string, option: string) => {
    setModifyData({ uid, option });
  };
  useEffect(() => {
    SupplierService.findSiteSupplierList({
      searchPage,
      uid,
    });
  }, [searchPage, refresh]);
  const onConfirm = () => {
    modifyData &&
      from(request(supplierApi.ChangeOption(modifyData))).subscribe((data) => {
        if (data instanceof Object) {
          notification.success({
            message: "Update Success",
          });
          setModifyingId("");
          setRefresh(!refresh);
        }
      });
  };
  const TempConfig = {
    onSearch: (params: any) => {
      const { searchPage } = params;
      setSearchPage(searchPage);
    },
    normalBtns: [
      {
        text: "选择平台",
        onClick: () => setChooseFlag(true),
      },
    ],
    rowId: "uid",
    data: supplierList,
    config: [
      {
        title: "名称",
        dataIndex: "displayName",
        key: "displayName",
      },
      {
        title: "服务源",
        dataIndex: "option",
        key: "option",
        render: (_: any, e: any) => {
          return e.uid === modifyingId ? (
            <Select
              defaultValue={e.option}
              onChange={(value) => onChange(e.uid, value)}
            >
              <Option value="cname">cname</Option>
              <Option value="system">system</Option>
            </Select>
          ) : (
            e.option
          );
        },
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        render: (_: any, e: any) => {
          return (
            <>
              {e.uid === modifyingId ? (
                <Button type="primary" onClick={onConfirm}>
                  Confirm
                </Button>
              ) : (
                <Button
                  type="primary"
                  disabled={!e.isConfigurable}
                  onClick={() => setModifyingId(e.uid)}
                >
                  Modify
                </Button>
              )}
              {e.option === "cname" && (
                <Button
                  type="primary"
                  onClick={() => {
                    setEditingId(e.uid);
                    setEditFlag(true);
                  }}
                  style={{ marginLeft: "20px" }}
                >
                  Edit
                </Button>
              )}
            </>
          );
        },
      },
    ],
  };
  return (
    <div>
      <Template closeFilter {...TempConfig} />
      {chooseFlag && (
        <Choose
          visible={chooseFlag}
          onClose={() => setChooseFlag(false)}
          onRefresh={() => setRefresh(!refresh)}
          currList={supplierList && supplierList.content}
        ></Choose>
      )}
      {editFlag && (
        <Edit
          visible={editFlag}
          onClose={() => setEditFlag(false)}
          // onRefresh={() => setRefresh(!refresh)}
          currUid={editingId}
        ></Edit>
      )}
    </div>
  );
};

export default Index;

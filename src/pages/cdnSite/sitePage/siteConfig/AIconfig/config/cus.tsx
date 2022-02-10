import IconFont from "@/components/icon";
import { useLoading } from "@/components/loading";
import useUid from "@/hooks/useUid";
import { IAiSetting } from "@/store/network/site/interface";
import { useSiteSupplierList } from "@/store/network/supplier";
import SupplierService from "@/store/network/supplier/service";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Row, Select, TreeSelect } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { treeData } from "./data/area_tree";
import Loading from "@/components/loading/context";
import EditDrawer from "./cusEditDrawer";
interface IProps {
  onSubmit: Function;
  currAiSetting: IAiSetting[];
  cancelFlag: boolean;
}
const { Option } = Select;

const Customized: FC<IProps> = ({ onSubmit, currAiSetting, cancelFlag }) => {
  const uid = useUid();
  const siteSupplier = useSiteSupplierList();
  const loading = useLoading();
  const [currAiSetting$, setCurrAiSetting] = useState<any>();
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(-1);

  useEffect(() => {
    if (!siteSupplier) {
      SupplierService.findSiteSupplier(uid);
    }
  }, []);
  useEffect(() => {
    currAiSetting && setCurrAiSetting([...currAiSetting]);
  }, [currAiSetting, cancelFlag]);
  const aiSetting = useMemo(() => {
    return (
      currAiSetting$ &&
      currAiSetting$.map((item: any) => {
        if (item.mode === "availability" || item.mode === "speed") {
          return { lineId: `${item.lineId}`, supplier: item.mode };
        } else if (item.mode === "customized" && item.supplierUid) {
          return { lineId: `${item.lineId}`, supplier: item.supplierUid };
        } else {
          return { lineId: `${item.lineId}`, supplier: "customized" };
        }
      })
    );
  }, [cancelFlag, currAiSetting$]);

  useEffect(() => {
    onSubmit(currAiSetting$);
  }, [currAiSetting$]);

  const onAdd = () => {
    currAiSetting$ &&
      setCurrAiSetting([
        ...currAiSetting$,
        {
          lineId: 1,
          lineType: "Line",
          mode: "customized",
          supplierUid: siteSupplier ? siteSupplier.content[0].uid : "",
        },
      ]);
  };
  const onEdit = (index: number) => {
    setEditFlag(true);
    setEditId(index);
  };
  return (
    <div>
      <Button type="primary" onClick={onAdd} icon={<PlusOutlined />}>
        新增区域
      </Button>

      {aiSetting &&
        aiSetting.map((item: any, index: any) => (
          <Row
            style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
            key={index}
          >
            <TreeSelect
              style={{ width: 300 }}
              suffixIcon={
                <IconFont type="sanjiaoxing" style={{ fontSize: "12px" }} />
              }
              value={item.lineId}
              onChange={(e) => {
                const newList = [...currAiSetting$];
                newList[index] = { ...newList[index], lineId: parseInt(e) };
                setCurrAiSetting(newList);
              }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeNodeFilterProp="title"
              treeData={treeData}
            ></TreeSelect>
            {siteSupplier && siteSupplier.content ? (
              <>
                <Select
                  style={{ width: 220 }}
                  onChange={(e) => {
                    const newList = [...currAiSetting$];
                    if (e === "availability" || e === "speed") {
                      newList[index] = {
                        ...newList[index],
                        adjustmentThreshold: 2,
                        adjustmentWindow: 24,
                        decisionWindow: 60,
                        mode: e,
                        supplierUid: "",
                        tolerance: 50,
                      };
                    } else if (e === "customized") {
                      newList[index] = {
                        ...newList[index],
                        mode: e,
                        supplierUid: "",
                      };
                    } else {
                      newList[index] = {
                        ...newList[index],
                        mode: "customized",
                        supplierUid: e,
                      };
                    }
                    setCurrAiSetting(newList);
                  }}
                  value={item.supplier}
                >
                  <Option value="availability">可用率优先</Option>
                  <Option value="speed">速度优先</Option>
                  <Option value="customized">直接回源</Option>
                  {siteSupplier.content.map((item: any) => (
                    <Option value={item.uid} key={item.uid}>
                      {item.displayName}
                    </Option>
                  ))}
                </Select>
                {(item.supplier === "availability" ||
                  item.supplier === "speed") && (
                  <IconFont
                    onClick={() => onEdit(index)}
                    style={{
                      color: "#ef8f35",
                      fontSize: "20px",
                      marginLeft: "5px",
                    }}
                    type="icon-setting"
                  />
                )}
                <IconFont
                  onClick={() => {
                    const newList = [...currAiSetting$];
                    setCurrAiSetting(newList.filter((_, i) => i !== index));
                  }}
                  style={{
                    color: "#ef8f35",
                    fontSize: "20px",
                    marginLeft: "5px",
                  }}
                  type="icon-trash"
                />
              </>
            ) : (
              <Loading display={loading}></Loading>
            )}
          </Row>
        ))}
      <Row style={{ margin: "20px 0" }}>* 如不选择平台，所有请求将直接回源</Row>
      <Row style={{ margin: "20px 0" }}>
        未配置地区的所有请求将自动分配平台。
      </Row>
      <EditDrawer
        visible={editFlag}
        onClose={() => setEditFlag(false)}
        onOk={(e: any) => setCurrAiSetting(e)}
        editId={editId}
        currData={currAiSetting$}
      />
    </div>
  );
};

export default Customized;

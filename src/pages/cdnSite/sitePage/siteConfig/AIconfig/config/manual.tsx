import useUid from "@/hooks/useUid";
import { IAiSetting } from "@/store/api/site";
import { useSiteSupplierList } from "@/store/network/supplier";
import SupplierService from "@/store/network/supplier/service";
import { Col, Row, Select } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";

interface IProps {
  onSubmit: Function;
  currAiSetting: IAiSetting;
  cancelFlag: boolean;
}
const { Option } = Select;
const Manual: FC<IProps> = ({ onSubmit, currAiSetting, cancelFlag }) => {
  const uid = useUid();
  const siteSupplier = useSiteSupplierList();
  const loading = useLoading();

  const [supplierUid, setSupplierUid] = useState("");

  useEffect(() => {
    if (!siteSupplier) {
      SupplierService.findSiteSupplier(uid);
    }
  }, [uid]);

  useEffect(() => {
    currAiSetting.supplierUid && setSupplierUid(currAiSetting.supplierUid);
  }, [cancelFlag, currAiSetting]);

  useEffect(() => {
    onSubmit({
      ...currAiSetting,
      mode: "manual",
      adjustmentWindow: null,
      adjustmentThreshold: null,
      tolerance: null,
      decisionWindow: null,
      supplierUid,
    });
  }, [supplierUid]);

  const supplier = useMemo(
    () =>
      siteSupplier &&
      siteSupplier.content &&
      siteSupplier.content.find((item: any) => item.uid === supplierUid),
    [siteSupplier, supplierUid]
  );

  return (
    <div>
      <Row align="middle" style={{ marginBottom: "20px" }}>
        <Col span={4}>平台</Col>
        <Col>
          {siteSupplier && siteSupplier.content ? (
            <Select
              defaultValue={"----"}
              value={supplier ? supplier.displayName : "----"}
              style={{ width: 120 }}
              onChange={(uid: string) => setSupplierUid(uid)}
            >
              {siteSupplier.content.map((item: any) => (
                <Option value={item.uid} key={item.uid}>
                  {item.displayName}
                </Option>
              ))}
            </Select>
          ) : (
            <Loading display={loading}></Loading>
          )}
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        * 如不选择平台，所有请求将直接回源。
      </Row>
    </div>
  );
};

export default Manual;

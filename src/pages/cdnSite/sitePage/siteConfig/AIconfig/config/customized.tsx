import IconFont from "@/components/icon";
import { useLoading } from "@/components/loading";
import useUid from "@/hooks/useUid";
import { IAiSetting } from "@/store/network/site/interface";
import { useSiteSupplierList } from "@/store/network/supplier";
import SupplierService from "@/store/network/supplier/service";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Row, Select, Space } from "antd";
import React, { FC, useEffect, useMemo, useState } from "react";

interface IProps {
  onSubmit: Function;
  currAiSetting: IAiSetting;
  cancelFlag: boolean;
}
const area = ["默认", "中国大陆地区", "海外"];
const { Option } = Select;

const Customized: FC<IProps> = ({ onSubmit, currAiSetting, cancelFlag }) => {
  const uid = useUid();
  const siteSupplier = useSiteSupplierList();
  const loading = useLoading();

  const [supplierUid, setSupplierUid] = useState("");

  useEffect(() => {
    if (!siteSupplier) {
      SupplierService.findSiteSupplier(uid);
    }
  }, []);
  const supplier = useMemo(
    () =>
      siteSupplier &&
      siteSupplier.content &&
      siteSupplier.content.find((item: any) => item.uid === supplierUid),
    [siteSupplier, supplierUid]
  );
  return (
    <div>
      待开发...
      <Row style={{ marginBottom: "20px" }}>
        <Form onValuesChange={(_, allValues) => onSubmit(allValues)}>
          <Form.List name="sourceIps">
            {(fields, { add, remove }) => (
              <>
                <Form.Item
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <Button
                      type="primary"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      新增区域
                    </Button>
                  </div>
                </Form.Item>

                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      validateTrigger={["onChange", "onBlur"]}
                      name={[name, "area"]}
                      initialValue={"默认"}
                    >
                      <Select
                        style={{ width: 120 }}
                        onChange={(uid: string) => {}}
                      >
                        {area.map((item: string) => (
                          <Option value={item} key={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      validateTrigger={["onChange", "onBlur"]}
                      name={[name, "supplier"]}
                      rules={[{ required: true, message: "Missing Supplier" }]}
                    >
                      {siteSupplier && siteSupplier.content && (
                        <Select
                          value={supplier ? supplier.displayName : "Greypanel"}
                          style={{ width: 120 }}
                          onChange={(uid: string) => setSupplierUid(uid)}
                        >
                          {siteSupplier.content.map((item: any) => (
                            <Option value={item.uid} key={item.uid}>
                              {item.displayName}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                    <Form.Item>
                      <IconFont
                        onClick={() => remove(name)}
                        style={{
                          color: "#ef8f35",
                          fontSize: "20px",
                          marginLeft: "5px",
                        }}
                        type="icon-trash"
                      />
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        未配置地区的所有请求将自动分配平台。
      </Row>
    </div>
  );
};

export default Customized;

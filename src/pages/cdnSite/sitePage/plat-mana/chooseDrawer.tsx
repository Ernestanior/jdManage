import { FC, useEffect, useMemo, useState } from "react";
import { Drawer, notification } from "antd";
import { Btn } from "@/components/button";
import CheckboxGroup from "@/components/checkboxGroup";
import { supplierApi } from "@/store/api";
import Loading from "@/components/loading/context";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import useUid from "@/hooks/useUid";
interface IProps {
  visible: boolean;
  onClose: () => void;
  onRefresh: () => void;
  currList: any[];
}

const CreateDrawer: FC<IProps> = ({
  visible,
  onClose,
  onRefresh,
  currList,
}) => {
  const uid = useUid();
  const [manaList, setManaList] = useState<any[]>([]);
  // const manaList = useManagementList();
  const loading = useLoading();

  const [checkedList, setCheckedList] = useState<string[]>([]);

  const onFinish = async () => {
    const checked = checkedList.map((item) => JSON.parse(item).code);
    const suppliers = manaList.map((item: any) => {
      return checked.includes(item.code)
        ? { code: item.code, isEnabled: true }
        : { code: item.code, isEnabled: false };
    });
    const submitData = { suppliers, uid };
    const res = await request(supplierApi.SaveManagement(submitData));
    if (JSON.stringify(res) === "[]") {
      notification.success({
        message: "Update Success",
      });
      onClose();
    } else if (res instanceof Array) {
      res.forEach((item: any) =>
        notification.error({
          message: item.code,
          description: item.message,
        })
      );
    }
    onRefresh();
  };
  useEffect(() => {
    const obs = from(request(supplierApi.FindManagementList(uid))).subscribe(
      (data) => {
        data && setManaList(data);
      }
    );
    return () => obs.unsubscribe();
  }, [uid]);

  const optionList = useMemo(
    () =>
      manaList.map((item) =>
        JSON.stringify({
          code: item.code,
          name: item.displayName,
        })
      ),
    [manaList]
  );
  const defaultList = useMemo(
    () =>
      (currList &&
        currList.map((item: any) =>
          JSON.stringify({
            code: item.code,
            name: item.displayName,
          })
        )) ||
      [],
    [currList]
  );
  return (
    <Drawer
      title={"选择平台"}
      width={520}
      onClose={onClose}
      closable={false}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      className="cdn-create-drawer"
    >
      <div style={{ position: "relative" }}>
        <Loading display={loading}></Loading>
        <CheckboxGroup
          optionList={optionList}
          checkedOptions={(list: any) => setCheckedList(list)}
          defaultList={defaultList}
        ></CheckboxGroup>
      </div>

      <div
        style={{
          width: "150px",
          display: "flex",
          marginTop: "50px",
          justifyContent: "space-between",
        }}
      >
        <Btn type="primary" onClick={onFinish} boxShadow disabled={loading}>
          确定
        </Btn>
        <Btn boxShadow onClick={() => onClose()} disabled={loading}>
          取消
        </Btn>
      </div>
    </Drawer>
  );
};
export default CreateDrawer;

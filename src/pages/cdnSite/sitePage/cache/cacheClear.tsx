import { useLoading } from "@/components/loading";
import useUid from "@/hooks/useUid";
import cacheService from "@/store/network/cache/service";
import { Button, notification } from "antd";
import Loading from "@/components/loading/context";
import { FC, ReactElement, useState } from "react";
import { EdgeModal } from "@/components/modal";
import { from } from "rxjs";
import request from "@/store/request";
import { cacheApi } from "@/store/api";

interface IProps {}

const Index: FC<IProps> = ({}: IProps): ReactElement => {
  const uid = useUid();
  const loading = useLoading();
  const [modal, setModal] = useState<boolean>(false);
  const onClear = () => {
    from(request(cacheApi.ClearAllCache(uid))).subscribe((data) => {
      if (data instanceof Object) {
        notification.success({
          message: "Clear Success",
        });
        setModal(false);
      }
    });
  };
  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "70px",
        padding: "0 40px 0 20px",
      }}
    >
      全站清理<Button onClick={() => setModal(true)}>清理</Button>
      <EdgeModal
        visible={modal}
        onOk={() => onClear()}
        onCancel={() => setModal(false)}
      >
        确定要清理吗？
        {loading && <Loading display={loading}></Loading>}
      </EdgeModal>
    </div>
  );
};

export default Index;

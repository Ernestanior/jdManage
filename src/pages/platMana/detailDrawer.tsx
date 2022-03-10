import { Drawer } from "antd";
import Loading from "@/components/loading/context";
import { FC } from "react";
import "./index.less";
interface IProps {
  visible: boolean;
  onClose: () => void;
  currentData: any;
  loading: boolean;
}
const DetailDrawer: FC<IProps> = ({
  visible,
  onClose,
  currentData,
  loading,
}) => {
  return (
    <Drawer
      title="查看"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={540}
      closable={false}
      getContainer={false}
    >
      <section className="platform-detail-drawer">
        <div>
          <span>平台账号</span>
          <span>{currentData?.name}</span>
        </div>
        <div>
          <span>平台</span>
          <span>{currentData?.supplier?.displayName}</span>
        </div>
        {currentData?.quota?.domain && (
          <div>
            <span>域名額度</span>
            <span>
              {currentData?.quota?.domain.allocated}/
              {currentData?.quota?.domain.capacity}
            </span>
          </div>
        )}
        {currentData?.supplier?.tokenFields?.map(
          (item: { name: string; displayName: string }) => (
            <div key={item.name}>
              <span>{item.displayName}</span>
              <span>{currentData?.supplier?.tokenValue[item.name]}</span>
            </div>
          )
        )}

        <div>
          <span>状态</span>
          <span>{currentData?.status ? currentData?.status : "-"}</span>
        </div>
        <div>
          <span>备注</span>
          <span>{currentData?.remark === "" ? "-" : currentData?.remark}</span>
        </div>
      </section>

      <Loading display={loading}></Loading>
    </Drawer>
  );
};

export default DetailDrawer;

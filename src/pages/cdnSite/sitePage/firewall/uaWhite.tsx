import Tip from "@/components/tip";
import useUid from "@/hooks/useUid";
import { firewallApi } from "@/store/api";
import { FirewallList } from "@/store/api/firewall";
import request from "@/store/request";
import { FC, ReactElement, useEffect, useState } from "react";
import { from } from "rxjs";
import Firewall from "./content";

const UaWhite: FC = (): ReactElement => {
  const uid = useUid();
  const [whiteUA, setWhiteUA] = useState<FirewallList>();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    // const obs1 = from(request(firewallApi.FindBlackUA(uid))).subscribe(
    //   (data) => {
    //     data && setBlackUA(data);
    //   }
    // );
    const obs2 = from(request(firewallApi.FindWhiteUA(uid))).subscribe(
      (data) => data && setWhiteUA(data)
    );
    return () => obs2.unsubscribe();
  }, [refreshFlag, uid]);
  return (
    <Firewall
      type="whiteUA"
      currData={whiteUA}
      onRefresh={() => setRefreshFlag(!refreshFlag)}
      tip={
        <Tip>
          <div>UA白名单为空时，表示未开启此配置项</div>
        </Tip>
      }
    ></Firewall>
  );
};

export default UaWhite;

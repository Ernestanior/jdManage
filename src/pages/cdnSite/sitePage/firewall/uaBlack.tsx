import Tip from "@/components/tip";
import useUid from "@/hooks/useUid";
import { useBlackUA } from "@/store/network/firewall";
import firewallService from "@/store/network/firewall/service";
import { FC, ReactElement, useEffect, useState } from "react";
import Firewall from "./content";

const UaBlack: FC = (): ReactElement => {
  const uid = useUid();
  const blackUA = useBlackUA();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    firewallService.findBlackUA(uid);
    firewallService.findWhiteUA(uid);
  }, [refreshFlag]);
  return (
    <Firewall
      type="blackUA"
      currData={blackUA}
      onRefresh={() => setRefreshFlag(!refreshFlag)}
      tip={
        <Tip>
          <div>UA黑名单为空时，表示未开启此配置项</div>
        </Tip>
      }
    ></Firewall>
  );
};

export default UaBlack;

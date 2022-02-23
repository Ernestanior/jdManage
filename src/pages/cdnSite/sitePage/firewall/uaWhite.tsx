import Tip from "@/components/tip";
import useUid from "@/hooks/useUid";
import { useWhiteUA } from "@/store/network/firewall";
import firewallService from "@/store/network/firewall/service";
import { FC, ReactElement, useEffect, useState } from "react";
import Firewall from "./content";

const UaWhite: FC = (): ReactElement => {
  const uid = useUid();
  const whiteUA = useWhiteUA();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    firewallService.findWhiteUA(uid);
    firewallService.findBlackUA(uid);
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

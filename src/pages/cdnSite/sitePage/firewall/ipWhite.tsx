import Tip from "@/components/tip";
import useUid from "@/hooks/useUid";
import { useWhiteIP } from "@/store/network/firewall";
import firewallService from "@/store/network/firewall/service";
import { FC, ReactElement, useEffect, useState } from "react";
import Firewall from "./content";

const IpWhite: FC = (): ReactElement => {
  const uid = useUid();
  const whiteIP = useWhiteIP();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    firewallService.findWhiteIP(uid);
    firewallService.findBlackIP(uid);
  }, [refreshFlag]);
  return (
    <Firewall
      type="whiteIP"
      currData={whiteIP}
      onRefresh={() => setRefreshFlag(!refreshFlag)}
      tip={
        <Tip>
          <div>IP白名单为空时，表示未开启此配置项</div>
          <div>支持IP及网段格式（/16/24），一行一个</div>
          <div>支持完整IPv6地址，客户端IP不匹配下方列表，访问将直接返回403</div>
        </Tip>
      }
    ></Firewall>
  );
};

export default IpWhite;

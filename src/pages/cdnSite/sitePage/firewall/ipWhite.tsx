import Tip from "@/components/tip";
import useUid from "@/hooks/useUid";
import { firewallApi } from "@/store/api";
import { FirewallList } from "@/store/api/firewall";
import request from "@/store/request";
import { FC, ReactElement, useEffect, useState } from "react";
import { from } from "rxjs";
import Firewall from "./content";

const IpWhite: FC = (): ReactElement => {
  const uid = useUid();
  const [whiteIP, setWhiteIP] = useState<FirewallList>();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const obs1 = from(request(firewallApi.FindWhiteIP(uid))).subscribe(
      (data) => data && setWhiteIP(data)
    );
    // const obs2 = from(request(firewallApi.FindBlackIP(uid))).subscribe((data) => {
    //     data && setBlackIP(data);
    // });
    return () => obs1.unsubscribe();
  }, [refreshFlag, uid]);
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

// import { useLoading } from "@/components/loading";
// import { EdgeModal } from "@/components/modal";
// import Tip from "@/components/tip";
// import useUid from "@/hooks/useUid";
// import { firewallApi } from "@/store/api";
// import { useWhiteIP } from "@/store/network/firewall";
// import firewallService from "@/store/network/firewall/service";
// import request from "@/store/request";
// import { Button, Drawer, notification, Switch } from "antd";
// import TextArea from "antd/lib/input/TextArea";
// import { FC, ReactElement, useEffect, useMemo, useState } from "react";
// import { from } from "rxjs";
// import Loading from "@/components/loading/context";
// import Firewall from "./content";
// import "../index.less";
// const Index: FC = (): ReactElement => {
//   const uid = useUid();
//   const loading = useLoading();
//   const [drawerFlag, setDrawerFlag] = useState(false);
//   const [modalFlag, setModalFlag] = useState(false);
//   const [refreshFlag, setRefreshFlag] = useState(false);
//   const [text, setText] = useState("");
//   const writeIP = useWhiteIP();
//   console.log(writeIP);

//   useEffect(() => {
//     firewallService.findWhiteIP(uid);
//   }, [refreshFlag]);

//   const switchFlag = useMemo(
//     () => (writeIP ? writeIP.isEnabled : false),
//     [writeIP]
//   );
//   // console.log(text.split("\n"));
//   const handleSwitch = () => {
//     switchFlag ? setModalFlag(true) : setDrawerFlag(true);
//   };
//   const onSubmit = (status: boolean) => {
//     const payload = {
//       siteUid: uid,
//       isEnabled: status,
//       addresses: status ? text.split("\n") : writeIP ? writeIP.addresses : [],
//     };
//     from(request(firewallApi.SaveWhiteIP(payload))).subscribe((data) => {
//       if (data) {
//         if (JSON.stringify(data) === "{}") {
//           notification.success({
//             message: "Update Success",
//           });
//           setModalFlag(false);
//           setDrawerFlag(false);
//           setRefreshFlag(!refreshFlag);
//         } else {
//           data.map((item: any) =>
//             notification.error({
//               message: item.name,
//               description: item.message,
//             })
//           );
//         }
//       }
//     });
//   };
//   return (
//     <div className="access-control">
//       <div className="access-control-switch">
//         IP白名单
//         <Switch
//           disabled={loading}
//           checked={switchFlag}
//           onChange={(e) => handleSwitch()}
//         />
//       </div>
//       {writeIP && writeIP.isEnabled && (
//         <div className="access-control-list">
//           <Button
//             type="primary"
//             onClick={() => {
//               setDrawerFlag(true);
//               setText(writeIP.addresses.join("\n"));
//             }}
//           >
//             编辑
//           </Button>
//           <div className="list-title">IP列表</div>
//           <div className="list-content">
//             {writeIP.addresses.map((item: string) => (
//               <div key={item}>{item}</div>
//             ))}
//           </div>
//         </div>
//       )}
//       <EdgeModal
//         visible={modalFlag}
//         onOk={() => onSubmit(false)}
//         onCancel={() => setModalFlag(false)}
//       >
//         确定要禁用吗？
//         {loading && <Loading display={loading}></Loading>}
//       </EdgeModal>
//       <Drawer
//         title={"IP白名单配置"}
//         width={520}
//         placement="left"
//         onClose={() => setDrawerFlag(false)}
//         closable={false}
//         visible={drawerFlag}
//         bodyStyle={{ paddingBottom: 80 }}
//         footer={
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               padding: "0 20px",
//             }}
//           >
//             <Button
//               onClick={() => onSubmit(true)}
//               type="primary"
//               style={{ marginRight: "20px" }}
//               loading={loading}
//             >
//               确定
//             </Button>
//             <Button onClick={() => setDrawerFlag(false)}>取消</Button>
//           </div>
//         }
//         footerStyle={{ height: "60px", border: 0 }}
//       >
//         <Tip>
//           <div>IP白名单为空时，表示未开启此配置项</div>
//           <div>支持IP及网段格式（/16/24），一行一个</div>
//           <div>支持完整IPv6地址，客户端IP不匹配下方列表，访问将直接返回403</div>
//         </Tip>
//         <div style={{ margin: "20px 0 5px 0", fontWeight: 550 }}>IP</div>
//         <TextArea
//           rows={10}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </Drawer>
//     </div>
//   );
// };

// export default Index;

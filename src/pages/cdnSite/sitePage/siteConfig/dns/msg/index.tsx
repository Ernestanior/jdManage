import React, { FC, ReactElement } from "react";
import "./index.less";

const Index: FC = (): ReactElement => {
  return (
    <div className="site-domain-msg-container">
      <h3>Important:</h3>
      <ul>
        <li>
          记录添加完成后，请前往您的域名解析服务器（DNS）处更改您的记录指向，指向的解析地址为您的记录名加“abcd1234-0987kjhg.tproj.net"
        </li>
        <li>例如：</li>
        <li>您的记录为：www.abc.xn--com-f88dr32b0c202bk8s5udqwbv54sk32opfa</li>
        <li>您需要填写的解析地址为：www.abc.com.abcd1234-0987kjhg.tproj.new</li>
      </ul>
    </div>
  );
};

export default Index;

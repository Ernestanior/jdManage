import React, { FC, ReactElement } from "react";
import "./index.less";

const Index: FC = (): ReactElement => {
  return (
    <div className="site-domain-msg-container">
      <h3>Note:</h3>
      <ul>
        <li>
          1. 密码长度建议设置为8 ~
          16个字符，包括字母大小写(Z、…)z)和阿拉伯数字，至少包含一个特殊字符(如!@
          # $ *);
        </li>
        <li>
          2.
          建议新密码不包含登录邮箱或用户关键字;为安全起见，建议采用以上两点设置密码;
        </li>
        <li>
          3.
          系统不强制定义密码复杂度，但为了确保使用安全，建议采用以上两点进行密码设置;
        </li>
        <li>4. 密码修改完成后，请退出登录，使用新密码登录。</li>
      </ul>
    </div>
  );
};

export default Index;

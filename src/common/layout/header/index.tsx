import { FC, useState } from "react";
import IconFont from "@/components/icon";
import "./index.less";
import Category from "./category";
import Setting from "./setting";

const Header: FC = () => {
  const [showCate, setCate] = useState<boolean>(false);
  return (
    <nav className="comp-header">
      <div onClick={() => setCate(true)} style={{ display: "flex" }}>
        <IconFont
          type="icon-a-Group36"
          style={{ fontSize: "30px", marginRight: "20px" }}
        ></IconFont>
        <div className="process-icon">
          <IconFont
            type="icon-a-Group32"
            style={{
              fontSize: "150px",
              position: "relative",
              top: "-61px",
            }}
          ></IconFont>
        </div>
      </div>
      <div>
        <Setting />
        <IconFont
          type="icon-a-NotificationIcon"
          style={{ color: "pink", fontSize: "20px", marginRight: "30px" }}
        ></IconFont>
        <IconFont
          type="icon-wenti"
          style={{ color: "#000", fontSize: "22px" }}
        ></IconFont>
      </div>
      <Category
        visible={showCate}
        onClose={() => {
          setCate(false);
        }}
      />
    </nav>
  );
};

export default Header;

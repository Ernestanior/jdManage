import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
const Index: FC = (): ReactElement => {
  return (
    <div style={{ paddingTop: "20px" }}>
      <Outlet />
    </div>
  );
};

export default Index;

import React, { FC, ReactElement } from "react";
import Msg from "./msg";
import RecordList from "./recordList";
const Index: FC = (): ReactElement => {
  return (
    <div>
      <Msg></Msg>
      <RecordList></RecordList>
    </div>
  );
};

export default Index;

import { FC } from "react";
import IconFont from "@/components/icon";
import Bear from "./bear";
import "./index.less";

export interface IData {
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: any;
  content: any[];
}
const Home: FC = () => {
  return <Bear />;
};

export default Home;

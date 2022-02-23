import { removeEmpty } from "../../utils";
import { Divider } from "antd";

const readError = ({ config, data }: any) => {
  const { data: paramsBody, params, url } = config;
  return (
    <div>
      <p>请求结果：{JSON.stringify(data)}</p>
      <Divider />
      {!!url && <p>api：{url}</p>}
      {removeEmpty(params) && <p>url参数：{JSON.stringify(params)}</p>}
      {removeEmpty(paramsBody) && <p>请求体：{JSON.stringify(paramsBody)}</p>}
    </div>
  );
};

export default readError;

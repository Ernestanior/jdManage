// import "./index.less";
import { FC, useEffect, useState } from "react";
import { Input, notification } from "antd";
import DnsSelector from "../components/dnsSelector";
import { Btn } from "@/components/button";
import { useLoading } from "@/components/loading";
import _ from "underscore";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./index.less";
import psl from "psl";
import { from } from "rxjs";
import request from "@/store/request";
import { dnsApi } from "@/store/api";
import { IDomainList } from "@/store/network/dns/interface";
const { Dragger } = Upload;
interface IProps {
  onClose: () => void;
  next: (domains: string[]) => void;
}
const CreateDrawer: FC<IProps> = ({ onClose, next }) => {
  const [dnsList, setDnsList] = useState<IDomainList>();
  useEffect(() => {
    const obs = from(
      request(
        dnsApi.FindDnsDomain({
          searchPage: { page: 1, pageSize: 9999 },
          uid: "",
        })
      )
    ).subscribe((data) => {
      data && setDnsList(data);
    });
    return () => obs.unsubscribe();
  }, []);
  const [domains, setDomains] = useState<any>([]);
  const [numList, setNumList] = useState<number[]>([]);
  const [input, setInput] = useState<string>();
  const loading = useLoading();
  const showErrorNotification = (errorMsg: string) => {
    notification.error({ message: errorMsg });
  };

  const goNext = () => {
    const isValid = checkValid(input);
    console.log(isValid);

    if (input && !isValid) {
      notification.error({
        message: "输入的内容无效",
      });
      return;
    }
    let totalDomains: string[] = [];
    // 验证空选项的flag, 如果存在空选项则切换为true
    let isEmpty = false;
    // 并合并所有非空选项
    numList.forEach((id) => {
      if (domains[id]) {
        if (!domains[id].length) {
          isEmpty = true;
        } else {
          totalDomains = [...totalDomains, ...domains[id]];
        }
      } else {
        isEmpty = true;
      }
    });
    // 如果存在空选项则不跳转，去重并传给父组件
    if (isEmpty) {
      notification.error({ message: "选项不能为空" });
    } else {
      const finalDomains =
        input && isValid
          ? _.uniq([...totalDomains, ...isValid])
          : _.uniq(totalDomains);
      !!finalDomains.length
        ? next(finalDomains)
        : notification.error({
            message: "域名不能为空",
          });
    }
  };
  return (
    <>
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 550,
          marginLeft: 5,
        }}
      >
        已添加在DNS管理，从DNS管理中选择
        <Btn
          type="primary"
          boxShadow
          onClick={() =>
            numList.length
              ? setNumList([...numList, numList[numList.length - 1] + 1])
              : setNumList([0])
          }
        >
          添加
        </Btn>
      </span>
      {dnsList &&
        !!numList.length &&
        numList.map((id) => (
          <DnsSelector
            // onDelete={() => setNumList(numList.filter((v) => v !== id))}
            onDelete={() => setNumList(numList.filter((v) => v !== id))}
            dnsList={dnsList.content}
            // numOfList={numList.length}
            onSubmit={(e: any) => {
              // console.log(e);
              // setDomains({ ...domains, ...e });
              domains[id] = e;
              setDomains([...domains]);
              // setDomainList((domainList[index] = e));
            }}
            key={id}
            // id={id}
          ></DnsSelector>
        ))}

      <div style={{ fontWeight: 500, marginTop: 30 }}>未存在于DNS管理中</div>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        记录值(域名可添加10个，记录可添加50个)
      </div>
      <div className="wrapper">
        <Dragger
          // {...fileProps}
          showUploadList={false}
          openFileDialogOnClick={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
        <Input.TextArea
          value={input}
          autoSize={{
            minRows: 13,
            maxRows: 13,
          }}
          style={{
            paddingTop: 8,
            position: "absolute",
            background: "transparent",
          }}
          // value={this.state.addRecords}
          placeholder="允许添加的域名格式为：www.sample.com，*.sample.com"
          onChange={(e) => {
            // console.log(e.target.value);
            setInput(e.target.value);
            // this.setState({
            //   addRecords: e.target.value,
            // });
            // this.setState({
            //   allowToProceed: !!e.target.value,
            // });
          }}
          onDrop={(e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;

            if (files.length > 1)
              return showErrorNotification("一次只能上传一个文件");

            const file = files[0];
            const mimeType = file.type;
            if (mimeType !== "text/plain" && mimeType !== "text/csv")
              return showErrorNotification("文件类型不支持");

            const fileReader = new FileReader();
            fileReader.readAsText(file);

            fileReader.onload = () => {
              const addRecords = formatInput(fileReader.result);
              console.log(addRecords);
              setInput(addRecords);
              // this.setState({
              //   fileList: [file],
              //   addRecords: addRecords,
              //   allowToProceed: !!addRecords,
              // });
            };
          }}
        />
      </div>
      <div
        style={{
          width: "157px",
          display: "flex",
          marginTop: "50px",
          justifyContent: "space-between",
        }}
      >
        <Btn type="primary" onClick={goNext} boxShadow disabled={loading}>
          下一步
        </Btn>
        <Btn boxShadow onClick={onClose} disabled={loading}>
          取消
        </Btn>
      </div>
    </>
  );
};
export default CreateDrawer;

export const formatInput = (data: string | ArrayBuffer | null | undefined) =>
  typeof data === "string"
    ? data
        .replace(/\t| /g, "")
        .replace(/\r|\n|\f|;/g, ",")
        .replace(/[,]{2,}/g, ",")
        .replace(/,$/g, "")
    : "";
const checkValid = (value: string | undefined) => {
  const domainReg =
    /^[[a-zA-Z0-9][a-zA-Z0-9-]{1, 61}[a-zA-Z0-9]|[*]]\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2}|\.asia)?$/;
  const arr = formatInput(value).split(",");
  const domains = arr.filter((v) => domainReg.test(v));
  const records = arr.filter((v) => !domainReg.test(v));
  if (domains.length > 10 || records.length > 50) {
    notification.error({ message: "域名添加上限为10，记录添加上限为50" });
    return;
  }
  const inputs = domains.concat(records);
  const errors: string[] = [];
  inputs.forEach((rec) => {
    const parsedRec: any = psl.parse(rec);
    //筛选出有wildcard域名
    if (rec.split(".")[0] === "*") {
      const tdomain = rec.split(".").filter((v) => v !== "*");
      // console.log(tdomain)
      const res1 = tdomain.length === 1 ? true : false;
      const res2 = tdomain.length === 2 ? true : false;
      // console.log(res)
      if (!res1 && !res2) {
        errors.push(rec);
      }
      return;
    }

    const { error, input } = parsedRec;
    if (error) {
      errors.push(input);
    }
  });
  return errors.length ? false : records;
};

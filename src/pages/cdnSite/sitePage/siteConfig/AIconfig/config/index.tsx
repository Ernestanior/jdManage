import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Button, Select, Row, Col, notification } from "antd";
import useUid from "@/hooks/useUid";
import { from } from "rxjs";
import request from "@/store/request";
import { siteApi } from "@/store/api";
import moment from "moment";
import Loading from "@/components/loading/context";
import Auto from "./auto";
import Manual from "./manual";
import Customized from "./cus";
import { useLoading } from "@/components/loading";
interface IData {
  type: string;
  createDate: number;
  aiSettings: any[];
}
const { Option } = Select;
const Index: FC = (): ReactElement => {
  const [currId, setCurrId] = useState<number>(0);
  const [dataList, setDataList] = useState<IData[]>([]);
  const [type, setType] = useState<string>("auto");
  const [aiSettings, setAiSettings] = useState<any[]>([]);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [cancelFlag, setCancelFlag] = useState<boolean>(true);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(true);
  const [testResult, setTestResult] = useState<any[]>([]);
  const loading = useLoading();
  const uid = useUid();

  const payload = {
    searchPage: { page: 1, pageSize: 5 },
    siteUid: uid,
    skipCurrentSetting: false,
  };
  const currData: any = useMemo(() => {
    return dataList.find((item: any) => item.createDate === currId);
  }, [currId]);
  useEffect(() => {
    currData && setType(currData.type);
  }, [currData]);

  const content = useMemo(() => {
    switch (type) {
      case "auto":
        return (
          <Auto
            currAiSetting={currData && currData.aiSettings[0]}
            onSubmit={(e: any) => setAiSettings([e])}
            cancelFlag={cancelFlag}
            testResult={testResult}
          />
        );
      case "manual":
        return (
          <Manual
            currAiSetting={currData && currData.aiSettings[0]}
            onSubmit={(e: any) => setAiSettings([e])}
            cancelFlag={cancelFlag}
          />
        );
      case "customized":
        return (
          <Customized
            currAiSetting={currData && currData.aiSettings}
            onSubmit={(e: any) => setAiSettings(e)}
            cancelFlag={cancelFlag}
          />
        );
      default:
        return (
          <Auto
            currAiSetting={currData && currData.aiSettings[0]}
            onSubmit={(e: any) => setAiSettings([e])}
            cancelFlag={cancelFlag}
            testResult={testResult}
          />
        );
    }
  }, [type, currData, cancelFlag, testResult]);
  useEffect(() => {
    const data$ = from(request(siteApi.AiList(payload))).subscribe((data) => {
      if (data.content) {
        setDataList(data.content);
        setCurrId(data.content[0].createDate);
        setType(data.content[0].type);
      }
    });
    return () => data$.unsubscribe();
  }, [refreshFlag]);
  useEffect(() => {
    if (dataList.length) {
      if (type === "customized") {
        if (
          currId !== dataList[0].createDate ||
          type !== currData.type ||
          JSON.stringify(aiSettings) !== JSON.stringify(currData.aiSettings)
        ) {
          setEditFlag(true);
        } else {
          setEditFlag(false);
        }
      } else {
        if (
          currId !== dataList[0].createDate ||
          type !== currData.type ||
          JSON.stringify({ ...aiSettings[0], uid: "" }) !==
            JSON.stringify({ ...currData.aiSettings[0], uid: "" })
        ) {
          setEditFlag(true);
        } else {
          setEditFlag(false);
        }
      }
    }
  }, [currId, type, aiSettings]);
  const onCancel = () => {
    setType(currData.type);
    setCancelFlag(!cancelFlag);
  };
  const onTest = () => {
    const payload = { type, uid, aiSettings };
    from(request(siteApi.AiTest(payload))).subscribe((data) => {
      setTestResult(data && data.decisions);
    });
  };
  const onOk = () => {
    const listOne = aiSettings.map((item: any) => item.lineId);
    const listTwo = new Set(listOne);
    if (listOne.length === listTwo.size) {
      const payload = { type, uid, aiSettings };
      from(request(siteApi.AiSave(payload))).subscribe((data) => {
        if (data instanceof Object) {
          notification.success({ message: "AI Upload Success" });
        }
        setRefreshFlag(!refreshFlag);
      });
    } else {
      notification.error({ message: "区域选择不能重复" });
    }
  };
  return (
    <div style={{ color: "#666" }}>
      {!!currData ? (
        <>
          <Row align="middle" style={{ marginBottom: "20px" }}>
            <Col span={4}>
              <span>CDN服务器商切换设置</span>
            </Col>
            <Col>
              {" "}
              <Select
                style={{ width: "400px" }}
                onChange={(e: any) => setCurrId(e)}
                value={`${currData.type} 保存时间: ${moment(
                  currData.createDate
                ).format("YYYY-MM-DD HH:mm:ss")}`}
              >
                {dataList.map((item: any, index: number) => {
                  const value = `${item.type} 保存时间: ${moment(
                    item.createDate
                  ).format("YYYY-MM-DD HH:mm:ss")} ${
                    index === 0 ? "(当前设置)" : ""
                  }`;
                  return (
                    <Option key={index} value={item.createDate}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: "20px" }}>
            <Col span={4}>
              <span>平台切换设置</span>
            </Col>
            <Col>
              <Select
                style={{ width: 200 }}
                value={type}
                onChange={(e) => {
                  setType(e);
                }}
              >
                <Option value="auto">auto</Option>
                <Option value="manual">manual</Option>
                <Option value="customized">customized</Option>
              </Select>
            </Col>
          </Row>
          {content}
          {editFlag && (
            <>
              <Button
                type="primary"
                onClick={onOk}
                loading={loading}
                style={{ marginRight: "20px" }}
              >
                确定
              </Button>
              <Button
                onClick={onCancel}
                disabled={loading}
                style={{ marginRight: "20px" }}
              >
                取消
              </Button>
            </>
          )}
          {type === "auto" && (
            <Button type="primary" onClick={onTest} loading={loading}>
              测试
            </Button>
          )}
        </>
      ) : (
        <Loading display={loading}></Loading>
      )}
    </div>
  );
};

export default Index;

import { useLoading } from "@/components/loading";
import useUid from "@/hooks/useUid";
import { cacheApi } from "@/store/api";
import { useCacheSetting } from "@/store/network/cache";
import cacheService from "@/store/network/cache/service";
import request from "@/store/request";
import { Button, Col, Form, notification, Row, Select, Switch } from "antd";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { from } from "rxjs";
import Loading from "@/components/loading/context";
import { CacheSetting } from "@/store/network/cache/interface";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const Index: FC = (): ReactElement => {
  const uid = useUid();
  const loading = useLoading();
  const extensions =
    "[gif][jpg][jpeg][png][bmp][swf][woff2][css][js][rar][zip][docx][tiff][csv][pptx][svg][midi][ppt][mid][svgz][ps][doc][eps][eot][tif][xlsx][woff][ejs][pdf][ico][class][webp][jar][pls][otf][xls][pict][ttf][opus][webm][mp3][ogg][mp4][ipa][apk][wav]";
  const formatExt2Str = (str: string | null) => {
    return str
      ? str.replace(/\]/g, "],").replace(/\[|\]/g, "").slice(0, -1).split(",")
      : [];
  };
  const formatStr2Ext = (ext: string[] | null) => {
    return (
      ext && ("[" + ext.join(",").replace(/,/g, "],[") + "]").replace(/,/g, "")
    );
  };
  const [cacheMethod, setCacheMethod] = useState<string>("请选择缓存方式");
  const [ttl, setTtl] = useState<number>(0);
  const [ext, setExt] = useState<string[]>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [ignoreQuery, setIgnoreQuery] = useState<boolean>(false);
  const [cacheSetting, setCacheSetting] = useState<CacheSetting | null>(null);
  // const cacheSetting = useCacheSetting();

  const currSetting = useMemo(
    () => ({
      uid: cacheSetting && cacheSetting.uid,
      supplier: null,
      cacheMethod,
      cacheExt: formatStr2Ext(ext || null),
      ttl,
      ignoreQueryString: ignoreQuery,
    }),
    [cacheMethod, ttl, ext, ignoreQuery]
  );

  const editable = useMemo(
    () =>
      currSetting &&
      currSetting.cacheMethod &&
      JSON.stringify(cacheSetting) !== JSON.stringify(currSetting),
    [cacheSetting, currSetting]
  );

  useEffect(() => {
    // cacheService.findCacheSetting(uid);
    const obs = from(request(cacheApi.FindCacheSetting(uid))).subscribe(
      (data) => {
        data && setCacheSetting(data);
      }
    );
    return () => obs.unsubscribe();
  }, [refresh, uid]);
  useEffect(() => {
    onReset();
  }, [cacheSetting]);
  const onSubmit = async () => {
    const payload = {
      ...currSetting,
      cacheExt: currSetting.cacheExt || "",
      uid,
    };
    const res = await request(cacheApi.SaveCacheSetting(payload));
    if (!(res instanceof Array)) {
      notification.success({
        message: "Update Success",
      });
    }
    setRefresh(!refresh);
  };
  const onReset = () => {
    if (cacheSetting) {
      const { cacheMethod, ttl, ignoreQueryString, cacheExt } = cacheSetting;
      setCacheMethod(cacheMethod || "");
      setTtl(ttl);
      setIgnoreQuery(ignoreQueryString);
      cacheExt && setExt(formatExt2Str(cacheExt));
    }
  };

  return (
    <Form {...formItemLayout} onFinish={onSubmit}>
      <Form.Item label="缓存方式">
        <Row>
          <Col>
            <Select
              value={cacheMethod}
              style={{ width: 220 }}
              onChange={(method: string) => {
                setCacheMethod(method);
              }}
            >
              <Option value="" disabled>
                请选择缓存方式
              </Option>
              <Option value="all">全站缓存</Option>
              <Option value="none">不缓存</Option>
              <Option value="extension">按后缀名缓存</Option>
            </Select>
          </Col>
          <Col span={12}>
            {cacheMethod === "extension" && (
              <Form.Item
                name="ext"
                initialValue={ext}
                rules={[{ required: true, message: "此字段必填" }]}
                normalize={(value, preValue = []) => {
                  return value.includes("all") && !preValue.includes("all")
                    ? formatExt2Str(extensions)
                    : value;
                }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  autoClearSearchValue
                  onChange={(value: string[]) => {
                    value.includes("all")
                      ? setExt(formatExt2Str(extensions))
                      : setExt(value);
                  }}
                >
                  <Option key="all" value="all">
                    all
                  </Option>
                  {formatExt2Str(extensions).map((ext) => (
                    <Option key={ext} value={ext}>
                      {ext}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form.Item>

      {(cacheMethod === "extension" || cacheMethod === "all") && (
        <Form.Item
          label="缓存时间"
          name="ttl"
          rules={[{ required: true, message: "此字段必填" }]}
          initialValue={ttl}
        >
          <Select
            style={{ width: 220 }}
            onChange={(time: number) => {
              setTtl(time);
            }}
          >
            <Option value={null} disabled>
              请选择时间
            </Option>
            <Option value={60}>1分钟</Option>
            <Option value={300}>5分钟</Option>
            <Option value={600}>10分钟</Option>
            <Option value={1800}>30分钟</Option>
            <Option value={3600}>1小时</Option>
            <Option value={10800}>3小时</Option>
            <Option value={43200}>12小时</Option>
            <Option value={86400}>1天</Option>
            <Option value={604800}>7天</Option>
            <Option value={1209600}>14天</Option>
            <Option value={2592000}>30天</Option>
            <Option value={5184000}>60天</Option>
            <Option value={15552000}>180天</Option>
            <Option value={31536000}>1年</Option>
            <Option value={315360000}>无限期</Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item label="忽略缓存参数">
        <Switch
          disabled={loading}
          checked={ignoreQuery}
          onChange={(ignore: boolean) => {
            setIgnoreQuery(ignore);
          }}
        />
      </Form.Item>
      {editable && (
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              style={{ marginRight: "20px" }}
            >
              保存
            </Button>
            <Button onClick={onReset}>取消</Button>
          </div>
        </Form.Item>
      )}
      <Loading display={loading} />
    </Form>
  );
};

export default Index;

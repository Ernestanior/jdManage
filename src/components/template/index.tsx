import { Col, Pagination, Row, Table } from "antd";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Filter } from "./components/filter";
import {
  ISearchPage,
  IColumnsTypeP,
  IMapT,
  IOperationConfig,
  INormalBtn,
  IBatchBtn,
} from "./interface";
import { IRenderConfig } from "./fastRender";
import { BehaviorSubject, from, Subject } from "rxjs";
import { TablePaginationConfig } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";
import { createOptList } from "./components/optList";
import { IExpandableModule } from "./interface";
import "./index.less";
import "./common.less";
import { ellopsisOnCell, ellopsisRender } from "./utilsx";
import FooterDetail from "./components/footerDetail";
import { Btn } from "./button";
import { IEvent } from "./hooks/useEvent";
import { useLoading } from "@/components/loading";

interface ITemplateProps {
  /** 自动加载url查询参数功能-静态不可修改 */
  // enableAutoLoadQueryParams?: boolean;
  /** 整个组件的标题 */
  title?: string;
  /** 隐藏filter组件 */
  closeFilter?: boolean;
  /** 搜索框条件 */
  primarySearch?: string;
  /** 搜索组件列表，传入的每个对象将生成对应的input框 */
  searchList?: IRenderConfig[];
  /** 外部通过该函数得到template所有搜索条件，包括搜索条件汇总，searchPage参数 */
  onSearch: (value: any) => void;
  /** 列表column的配置集合 */
  config: IColumnsTypeP<any>[];
  /** 操作列的操作汇总  */
  optList?: IOperationConfig;
  /** 每行数据的key */
  rowId: string;
  /** 普通按钮-新增等，不受制于表格选择 */
  normalBtns?: IBatchBtn[];
  /** 模块id */
  // id: number;
  /** 用于批量选择的按钮，不存在选中的数据时为disable*/
  batchBtns?: IBatchBtn[];
  /** 中间层 */
  middleNode?: React.ReactNode;
  /** 额外搜索参数 */
  // moreFilters?: IMapT<string | number>;
  /** 是否开启实时更新 */
  // isRealTime?: boolean;
  /** 支持在table的页脚插入按钮 */
  footLfEl?: React.ReactNode;
  /** 每行row的className */
  rowClassName?: string | ((record: any, index?: number) => string);
  /** 数据刷新后的通知, 注意此处因为性能问题，需要函数引用固定 */
  // dataCallback?: (dataList: any[], totalElements: number) => void;
  /** scroll 配合固定头尾列决定 */
  scroll?: {
    x?: number;
    y?: number;
  };
  /** 外部传入的数据并在template组件中渲染 */
  // data: {
  //   /** 当前页码，第几页 */
  //   number: number;
  //   /** 当前页面的数据数量 */
  //   numberOfElements: number;
  //   /** 每页的行数 */
  //   size: number;
  //   /** 总数据数量*/
  //   totalElements: number;
  //   /** 总页面数量 */
  //   totalPages: number;
  //   /** 数据内容 */
  //   content: any[];
  //   /** 排列方式 */
  //   sort:any;
  // };
  data: any;
  /* 传递事件 **/
  event$?: Subject<IEvent>;
}

interface IPageParams {
  // keyWord: string;
  searchPage: ISearchPage;
  /** 搜索汇总 */
  filters: any;
  // moreFilters: any;
  /** 此次刷新是否显示loading */
  // __disableLoading?: boolean;
}

export const Template: FC<ITemplateProps & IExpandableModule> = (props) => {
  // 如果有强制大小限定
  const rowKey = props.rowId;
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const [selectRows, setSelectRows] = useState<any[]>([]);
  // 表格loading状态
  const loading = useLoading();

  //搜索过滤条件汇总
  const [searchCondition, setSearchCondition] = useState({});
  //searchPage条件汇总
  const [searchPage, setSearchPage] = useState<ISearchPage>({
    desc: 1,
    page: (props.data && props.data.number) || 1,
    pageSize: (props.data && props.data.size) || 10,
    sort: "",
  });
  //filter切换
  const [showFilter, setShowFilter] = useState<boolean>(false);
  // 表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 表格数据流
  const tableData$ = useMemo(() => new Subject<any[]>(), []);

  const pagination = useMemo(() => {
    if (props.data) {
      return {
        current: props.data.number + 1,
        pageSize: props.data.size || 1,
        total: props.data.totalElements,
        hideOnSinglePage: true,
      };
    }
    return {
      current: 1,
      pageSize: 1,
      total: 1,
      hideOnSinglePage: true,
    };
  }, [props]);


  
  // const { current: initMoreFilters } = useRef(props.moreFilters);
  // const moreFilters = props.moreFilters;

  const params$ = useMemo(
    () =>
      new BehaviorSubject<IPageParams>({
        // keyWord: "",
        searchPage,
        filters: searchCondition,
        // moreFilters: {},
        // __disableLoading: true,
      }),
    [searchPage, searchCondition]
  );

  const details = useMemo(() => {
    const { current, pageSize, total } = pagination;
    const { _current, _pageSize, _total } = {
      _current: current || 1,
      _pageSize: pageSize || 1,
      _total: total || 0,
    };
    const mul = _current * _pageSize;
    return {
      start: `${mul - _pageSize + 1}`,
      end: mul > _total ? `${total}` : `${mul}`,
      total: `${total}`,
      hide: _total <= 0,
      size: (props.data && props.data.size) || 10,
    };
  }, [pagination]);

  const { current: clearSearch } = useRef(() => {
    let _reset: Function | null = null;
    return (reset?: Function) => {
      if (reset) {
        _reset = reset;
      }
      return () => {
        if (_reset) {
          _reset();
        }
      };
    };
  });

  // 搜索框的查询清空事件，通过resetEvent(reset) 注册清空事件，
  // 通过resetEvent()() 执行注册事件
  const { current: resetEvent } = useRef(clearSearch());

  /**
   * 新增搜索条件
   * disableLoading 表示此次刷新是否触发loading
   * */
  const submit = useCallback(
    (key: keyof IPageParams, value: any) => {
      const nextValue = { ...params$.value };
      if (key !== "searchPage") {
        // 搜索第一页面
        nextValue.searchPage.page = 1;
      }
      nextValue[key] = value;
      // 高级搜索，清空keyWord字段
      if (key === "filters") {
        // 通知search,清空搜索字段
        resetEvent()();
      }
      // nextValue.__disableLoading = disableLoading;
      params$.next(nextValue);
    },
    [params$, resetEvent]
  );

  // 更多筛选条件
  // useEffect(() => {
  //   if (initMoreFilters && moreFilters && initMoreFilters !== moreFilters) {
  //     submit("moreFilters", moreFilters);
  //   }
  // }, [initMoreFilters, moreFilters, submit]);

  useLayoutEffect(() => {
    const sub = params$.subscribe((data) => {
       console.log(data, "aasdasd");
      props.onSearch(data);
    });
    return () => sub.unsubscribe();
  }, [
    // params$$,
    params$,
    // queryEvent,
    // open,
    // close,
    // tableData$,
    // dataCallback,
    rowKey,
  ]);

  // 表格onchange事件
  const tableOnChange = useCallback(
    (
      page: TablePaginationConfig,
      _: any,
      sorter: SorterResult<any> | SorterResult<any>[]
    ) => {
      const st = Array.isArray(sorter) ? sorter[0] : sorter;
      const searchPageOld = params$.value.searchPage;
      const searchPage = {
        desc: st.order === "ascend" ? 0 : 1,
        page: searchPageOld.page,
        pageSize: searchPageOld.pageSize,
        sort: !!st.order ? st.field || "" : "",
      };
      // console.log(searchPage);
      submit("searchPage", searchPage);
    },
    [submit, params$]
  );

  const tableRowConfig: any = useMemo(() => {
    const conf = props.config.map((cof) => {
      const _cof: any = { ...cof };
      if (!_cof.render) {
        _cof.render = ellopsisRender;
      }
      if (!_cof.onCell) {
        _cof.onCell = ellopsisOnCell;
      }
      return _cof;
    });
    if (!props.optList) {
      return conf;
    }
    // 使用权限对操作进行过滤
    const optList: any[] = [];
    props.optList.forEach((item) => {
      optList.push(item);
    });
    if (optList.length < 1) {
      return conf;
    }
    const optConf = createOptList(optList, "操作");
    optConf && conf.push(optConf as any);
    return conf;
  }, [props]);

  // const reloadTable = useCallback(() => {
  //   if (params$.value.__disableLoading) {
  //     params$.next({
  //       ...params$.value,
  //       __disableLoading: false,
  //     });
  //   } else {
  //     params$.next(params$.value);
  //   }
  // }, [params$]);

  const batchBtnsProps = props.batchBtns;
  const rowSelection = useMemo(() => {
    if (Array.isArray(batchBtnsProps) && batchBtnsProps.length > 0) {
      return {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
          setSelectIds(selectedRowKeys);
          setSelectRows(selectedRows);
        },
      };
    }
  }, [batchBtnsProps]);

  // 行展开
  const expandable = useMemo(() => {
    if (props.expandedRowRender || props.rowExpandable) {
      return {
        expandedRowRender: props.expandedRowRender,
        rowExpandable: props.rowExpandable,
        onExpand: props.onExpand,
        expandedRowKeys: props.expandedRowKeys,
      };
    }
  }, [props.expandedRowRender, props.onExpand, props.rowExpandable]);

  // 普通操作和批量操作按钮
  const btns: any[] = [];
  if (props.batchBtns && props.batchBtns.length > 0) {
    props.batchBtns.map((btn) => {
      const _btn2 = (
        <Btn
          disabled={selectIds.length < 1}
          key={btn.text}
          onClick={() => btn.onClick(selectIds)}
          icon={btn.icon}
          padding="5px 20px"
        >
          {btn.text}
        </Btn>
      );
      if (_btn2) {
        btns.push(_btn2);
      }
      return true;
    });
  }
  // 普通操作
  if (props.normalBtns && props.normalBtns.length > 0) {
    props.normalBtns.map((btn) => {
      const _btn = (
        <Btn
          key={btn.text}
          icon={btn.icon}
          type="primary"
          padding="5px 20px"
          onClick={() => btn.onClick()}
        >
          {btn.text}
        </Btn>
      );
      if (_btn) {
        btns.push(_btn);
      }
      return true;
    });
  }

  // 显示分页跳转
  // const showQuickJumper = useMemo(() => {
  //   if (pagination.total && pagination.pageSize) {
  //     return pagination.total > pagination.pageSize * 6;
  //   }
  //   return false;
  // }, [pagination]);

  useEffect(() => {
    if (props.event$) {
      const sub = props.event$.subscribe((event) => {
        if (event.type === "reload") {
          setSearchPage({ ...searchPage, pageSize: pagination.pageSize });
        }
      });

      return () => sub.unsubscribe();
    }
  }, [props, pagination, searchPage]);
  // console.log(props.data, 'template')
  return (
    <div className="temp302">
      {props.title && (
        <h2 style={{ fontSize: "30px", fontWeight: 400, color: "#666" }}>
          {props.title}
        </h2>
      )}
      <section className="comp-temp">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!props.closeFilter && (
            <Filter
              searchList={props.searchList}
              onSearch={(value: {}) => setSearchCondition(value)}
              primarySearch={props.primarySearch}
            />
          )}
          <div>
            {!!btns.length &&
              btns.map((btn, idx) => {
                return (
                  <span style={{ marginRight: "10px" }} key={idx}>
                    {btn}
                  </span>
                );
              })}
          </div>
        </div>
        {props.middleNode}
        <Table
          // size={tableSize}
          className={`cdn-template-table`}
          pagination={false}
          showSorterTooltip={false}
          columns={tableRowConfig}
          dataSource={props.data && props.data.content}
          // 实时刷新禁用loading图标
          loading={loading}
          rowKey={rowKey || "row_key"}
          rowSelection={rowSelection}
          expandable={expandable}
          onChange={tableOnChange}
          rowClassName={props.rowClassName}
          scroll={props.scroll}
        />
        <Row className="cdn-template-footer" align="middle">
          <FooterDetail
            {...details}
            pageSizeChange={(pageSize: any) =>
              setSearchPage({ ...searchPage, page: 1, pageSize: pageSize })
            }
          />
          <Col flex={1}>{!!props.footLfEl && props.footLfEl}</Col>
          <Col>
            <Pagination
              onChange={(page: number, pageSize?: number | undefined) => {
                setSearchPage({ ...searchPage, page: page });
              }}
              {...pagination}
              showSizeChanger={false}
            />
          </Col>
        </Row>
      </section>
    </div>
  );
};

import { BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

export type ISizeType = "small" | "large";

// antd 的配置
const tableSize = {
  middle: {
    header: 43,
    row: 45,
    footer: 56,
  },
  default: {
    header: 51,
    row: 53,
    footer: 64,
  },
  small: {
    header: 37,
    row: 39,
    footer: 56,
  },
};

export class Style {
  readonly size$: BehaviorSubject<ISizeType | null>;
  readonly windowWidth$: BehaviorSubject<number | null>;
  readonly windowHeight$: BehaviorSubject<number | null>;

  total = 15;
  // 修正高度
  fixHeight = 0

  constructor(size?: ISizeType, fixHeight?: number) {
    this.size$ = new BehaviorSubject<ISizeType | null>(size || null);
    this.windowWidth$ = new BehaviorSubject<number | null>(null);
    this.windowHeight$ = new BehaviorSubject<number | null>(null);

    if(fixHeight){
      this.fixHeight = fixHeight;
    }

    // 在没有指定size的时候，size根据窗口宽度计算
    if (!size) {
      this.windowWidth$
        .pipe(debounceTime(50))
        .pipe(distinctUntilChanged())
        .subscribe((width) => {
          if (width) {
            if (width >= 1440) {
              this.size$.next("large");
              return;
            }
          }
          this.size$.next(null);
        });
      this.windowWidth$.next(Style.getDefaultWidth());
    }

    this.windowHeight$
      .pipe(debounceTime(50))
      .pipe(distinctUntilChanged())
      .subscribe((height) => {
        if (height) {
          this.setTableSize(height);
        }
      });
    this.windowHeight$.next(Style.getDefaultHeight());

    this.size$.subscribe(() => {
      if (this.windowHeight$.value) {
        this.setTableSize(this.windowHeight$.value);
      }
    });
  }

  readonly setSize = (type: ISizeType | null) => {
    this.size$.next(type);
  };

  readonly setTableSize = (height: number) => {
    let cuNum = tableSize.default;
    if (this.size$.value === "small") {
      cuNum = tableSize.small;
    }
    if (!this.size$.value) {
      cuNum = tableSize.middle;
    }
    // 50是网站菜单，30是上下内边距，55是搜索栏，cuNum.header是搜索栏，64是footer，剩下的就是可以一览的表格高度
    const fixHeight = this.fixHeight || (50 + 30 + 55);
    const contextHeight = height - fixHeight - cuNum.header - cuNum.footer;
    this.total = Math.floor(contextHeight / cuNum.row);
  };

  readonly recompute = () => {
    this.windowWidth$.next(Style.getDefaultWidth());
    this.windowHeight$.next(Style.getDefaultHeight());
  };

  /** 默认计算高度 */
  private static getDefaultHeight() {
    try {
      // 屏幕可用高度
      const availHeight = window.screen.availHeight;
      const innerHeight = window.innerHeight;
      const somethingHeight = availHeight - innerHeight;
      if (somethingHeight < availHeight * 0.25) {
        return innerHeight;
      }
      return availHeight;
    } catch (error) {
      return window.outerHeight;
    }
  }

  /** 计算可用宽度 */
  private static getDefaultWidth() {
    try {
      const availWidth = window.screen.availWidth;
      const innerWidth = window.innerWidth;
      const somethingWidth = availWidth - innerWidth;
      if (somethingWidth < availWidth * 0.25) {
        return availWidth * 0.75;
      }
      return availWidth;
    } catch (error) {
      return window.outerWidth;
    }
  }

  // 注销
  readonly destroy = () => {

  }
}

const styleService = new Style();

export default styleService;

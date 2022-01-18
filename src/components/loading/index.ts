import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

/**
 * 正在加载
 */
class Loading {
    readonly loading$ = new BehaviorSubject<boolean>(false);
    open() {
        this.loading$.next(true);
    }
    close() {
        this.loading$.next(false);
    }
}

export const loading= new Loading();

export const useLoading = () => {
    const loadValue = loading.loading$
    const [info, setInfo] = useState<boolean>(loadValue.value);
    useEffect(() => {
        const sub = loadValue.subscribe(newInfo => {
            setInfo(newInfo);
        })
        return () => sub.unsubscribe();
    }, [loadValue])
    return info;
  };


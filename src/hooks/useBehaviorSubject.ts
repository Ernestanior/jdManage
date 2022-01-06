import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

/**
 * 将behaviorSubject生成可订阅的数据对象
 */
const useBehaviorSubject = <T>(subject$: BehaviorSubject<T | null>) => {
    const [info, setInfo] = useState<T | null>(subject$.value);

    useEffect(() => {
        const sub = subject$.subscribe(newInfo => {
            setInfo(newInfo);
        })
        return () => sub.unsubscribe();
    }, [subject$])

    return info;
}

export default useBehaviorSubject;

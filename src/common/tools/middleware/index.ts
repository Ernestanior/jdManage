import compose from "./compose";
import composeAsync from './composeSync';
import {IMiddleware} from "./interface";

class Middleware<T>{
    isAsync: boolean;
    constructor(isAsync?: boolean) {
        this.isAsync = !isAsync
    }
    plugins: IMiddleware<T>[] = [];

    use(fn: IMiddleware<T>){
         if(typeof fn !== "function"){
            throw new TypeError('middleware must be a function')
         }
         this.plugins.push(fn)
         return this;
    }

    /**
     * array 无法对原始数组地址进行修改，所以操作原始参数的对象无效
     * */
    apply(ctx: T){
        if(Array.isArray(ctx)){
            throw new TypeError('middleware apply params must not be an array')
        }
        const fn = this.isAsync ? compose(this.plugins) : composeAsync(this.plugins);
        return fn(ctx)
    }
}

export default Middleware;

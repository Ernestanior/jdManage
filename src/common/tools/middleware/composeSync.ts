import {IMiddleware} from "./interface";

function composeAsync<T>(middleware: IMiddleware<T>[]) {
    if (!Array.isArray(middleware)) {
        throw new TypeError('middleware stack must be a array');
    }
    for (const fn of middleware) {
        if (typeof fn !== 'function') {
            throw new TypeError('middleware must be composed of function');
        }
    }
    return function (context: T, next?: any){

        // @ts-ignore
        function dispatch(i: number){
            const fn = middleware[i] || next;
            if(!fn){
                return;
            }

            try {
                return fn(context, dispatch.bind(null, i+1))
            }catch (e){
                return Promise.reject(e)
            }
        }
        return dispatch(0)
    }
}

export default composeAsync;

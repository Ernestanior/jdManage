### request介绍
    request是一个网络请求组合过程，有两个中间件库，middleware_before和
    middleware_after，实际调用流程是：
    网络请求参数->middleware_before(请求参数预处理)->网络请求调用->middleware_after(请求结果处理)

#### 作用
    request的组件是为了更加直观地构建网络请求过程

```typescript
    import {AxiosRequestConfig} from 'axios'
    import RequestPlx from "./request";
    import token from "store/customer";

    const axiosPlx = new RequestPlx();
    
    // 预处理请求参数
    axiosPlx.middleware_before.use(async(config, next) => {
        // 添加本地调试环境
        if(process.env.NODE_ENV === "development"){
            config.baseURL = "http://localhost:10087"
        }
        await next()
    }).use(async (config, next) => {
        if(config.url !== "/login"){
            config.url = '/api/v1' + config.url
        }else{
            config.url = '/google/v1' + config.url
        }
        await next();
    }).use(async(config, next) => {
        config.headers["role"] = "admin"
        await next();
    })

    // 内容解析
    axiosPlx.middleware_after.use(async (response, next) => {
        const url = request ? request.url : "null";
        // 处理错误信息
        if(response.status !== 200){
            switch(response.status){
                case 401:
                    response.data = '登录失败'
                case 404:
                    response.data = `网络请求地址${url}丢失，请联系客服！`
                case 500:
                    response.data = '服务请求错误'
                default:
                    response.data = '网络请求错误，请联系客户'
            }
            // 可以在此处添加网络请求提醒
            notification.error(response.status, response.data);
        }
        await next();
    }).use(async (response, next) => {
        // 登录失效
        if(response.status === 401){
            userStore.removeAllUserInfo();
        }
        await next();
    }).use(async(response, next) => {
        // 数据解析
        response = response.data;
        await next();
    })

    // 定义自己的request
    function request(config: AxiosRequestConfig){
        return axiosPlx(config)
    }
    
    //实际使用request
    const userInfo = await request({
        url: "/login"
    })
```

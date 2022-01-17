// 将mock数据转化为后端返回的数据结构，并解析
import resolveReq from "./resolve";

const testReq = (data: any) => {
    const res:any = {
        status: 200,
        data
    }
    if (res.status === 200) {
        const rep = resolveReq(res);
        if (rep.success) {
            // 提示请求结果
            return rep.data
        } else {
            return res;
        }
    }
    return null;
}

const testReqComplex = (data: any) => {
    const res = testReq(data);
    const result = {
        isSuccess: true,
        result: null
    }
    if(res){
        if (!res.msg){
            result.result = res
        }else {
            result.isSuccess = false;
        }
    }else{
        result.isSuccess = false;
    }
    return result
}

const httpMock = {
    simple: testReq,
    complex: testReqComplex
}

export default httpMock

import RequestPlx from "./index";

const axiosPlx = new RequestPlx();

axiosPlx.middleware_before.use(async (config, next) => {
    config.headers["agent"] = "test"
    await next();
})

axiosPlx.middleware_before.use(async (config, next) => {
    config.headers["agent-2"] = "test-2"
    await next();
})

axiosPlx.middleware_after.use(async (rep, next) => {
    console.log(rep.status)
    await next()
    console.log(201)
})

axiosPlx.middleware_after.use(async (rep, next) => {
    console.log("plugin-2")
    await next()
})

test('adds 1 + 2 to equal 3', () => {
    return axiosPlx.request({
        url: 'https://www.baidu.com',
        headers: {}
    }).then(rep => {
        console.log(rep);
        expect(1+2).toBe(3);
    })
});

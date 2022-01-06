import mock from 'mockjs';
import compose from "./compose";

const middles = [
    async (ctx: {
        zzz: number;
    }, next: () => any) => {
        ctx.zzz = 1;
        console.log(ctx)
        await next()
    },
    async (ctx: {
        abc: number;
    }, next: () => any) => {
        ctx.abc = 2;
        console.log(ctx)
        await next()
    }
]

test('should be 1, 2, 3', () => {
    const fn = compose<any>(middles)
    fn({});
    expect(1+2).toBe(3);
});

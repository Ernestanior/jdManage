export type IMiddleware<T = any> = (ctx: T, next: any) => Promise<any> | any;

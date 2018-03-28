/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 22:52:23 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-23 18:39:57
 * @content what is the content of this file. */

import { register } from "api/auth/register";

/* router.post("/auth/register", async (req: Request, res: Response, next: NextFunction) => {
    let result;
    try {
        result = await register.register(req.body);
        res.json(result);
    } catch (e) {
        next(e);
    }
});
 */

import Router = require("koa-router");

let router = new Router();

router.post("/auth/register", async (ctx, next) => {
    ctx.response.type = "json";
    let result;
    result = await register.register(ctx.request.body);
    ctx.response.body = result;
});

router.get("/ok", async (ctx) => {
    ctx.response.type = "text";
    ctx.response.body = "Name, ok , o, lllll";
});


export default router;

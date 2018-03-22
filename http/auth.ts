/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 22:52:23 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-21 23:24:52
 * @content what is the content of this file. */

import { Request, Response, Router, NextFunction } from "express";
import { register } from "api/auth/register";

export let router = Router();
router.post("/auth/register", async (req: Request, res: Response, next: NextFunction) => {
    let result = await register.register(req.body);
    res.json(result);
});

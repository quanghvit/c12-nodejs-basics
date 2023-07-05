import { Express } from "express";
import { RoutesEnum } from "./constants";
import { authRouter } from "./auth.routes";
import { userRouter } from "./user.routes";
import { postRouter } from "./post.routes";

export const appRouter = (app: Express) => {
    app.use(RoutesEnum.AUTH, authRouter);
    app.use(RoutesEnum.USERS, userRouter);
    app.use(RoutesEnum.POSTS, postRouter);
}
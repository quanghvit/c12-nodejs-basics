import { Post } from "./posts.entity";
import { User } from "./users.entity";
import { UsersPosts } from "./usersPosts.entity";
import { AppDataSource } from "../utils/data.source";

export const userRepo = AppDataSource.getRepository(User);
export const postRepo = AppDataSource.getRepository(Post);
export const userPostRepo = AppDataSource.getRepository(UsersPosts);
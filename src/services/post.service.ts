import { Post } from '../entities/posts.entity';
import { AppDataSource } from '../utils/data.source';

const postRepo = AppDataSource.getRepository(Post);

export const createPost = async (input: Partial<Post>) => {
  return await postRepo.save(postRepo.create(input));
};

export const listUserPosts = async (userId: string) => {
  return await postRepo.find({
    relations: {
      userPosts: {
        user: true
      }
    },
    where: {
      userPosts: {
        userId: userId,
      }
    }
  });
};

export const findPostById = async (postId: string) => {
  return await postRepo.findOne({
    where: { id: postId },
  });
};

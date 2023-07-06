import { Post } from '../entities/posts.entity';
import { AppDataSource } from '../utils/data.source';
import { UsersPosts } from '../entities/usersPosts.entity';
import { postRepo, userPostRepo } from '../entities/repositories';
import { FindOneOptions } from 'typeorm';

export const createPostTransaction = async (
  postPayload: Partial<Post>,
  userPostPayload: Partial<UsersPosts>,
) => {
  return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
    const post = await transactionalEntityManager.save(postRepo.create(postPayload));
    await transactionalEntityManager.save(userPostRepo.create(userPostPayload));
    return post;
  })
};

export const updatePostTransaction = async (
  id: string,
  postPayload: Partial<Post>,
  userPostPayload: Partial<UsersPosts>,
) => {
  return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.update(Post, { id }, postPayload);
    await transactionalEntityManager.save(userPostRepo.create(userPostPayload));
    return await transactionalEntityManager.findOne(Post, {
      where: { id }
    });
  })
};

export const deletePostTransaction = async (postId: string, isSoftDelete: boolean) => {
  return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
    if (isSoftDelete) {
      const softDeletePayload = {
        isDeleted: true,
      }
      await transactionalEntityManager.update(Post, { id: postId }, softDeletePayload);
      await transactionalEntityManager.update(UsersPosts, { postId }, softDeletePayload);
    } else {
      await transactionalEntityManager.delete(UsersPosts, { postId: postId });
      await transactionalEntityManager.delete(Post, { id: postId });
    }
  })
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

export const findPostById = async (
  postId: string,
  withRelation: boolean = true,
) => {
  let options: FindOneOptions<Post> = {
    where: {
      id: postId,
      isDeleted: false,
    },
  };

  if (withRelation) {
    options = {
      ...options,
      relations: {
        createdBy: true,
        updatedBy: true,
        userPosts: {
          user: true,
        },
      },
      select: {
        id: true,
        htmlCode: true,
        createdAt: true,
        updatedAt: true,
        isDeleted: true,
        createdBy: {
          id: true,
          name: true,
        },
        updatedBy: {
          id: true,
          name: true,
        },
        userPosts: {
          id: true,
          user: {
            id: true,
            name: true,
          },
          createdAt: true,
          updatedAt: true,
        }
      },
      order: {
        userPosts: {
          updatedAt: 'desc',
          createdAt: 'desc'
        }
      }
    }
  }

  return await postRepo.findOne(options);
};

import { TypeOf, object, string } from 'zod';

const params = {
  params: object({
    id: string(),
  })
};

export const getPostSchema = object({
  ...params,
});

export const createPostSchema = object({
  body: object({
    htmlCode: string({
      required_error: 'HTML Code is required',
    }),
  }),
});

export const updatePostSchema = object({
  ...params,
  body: object({
    htmlCode: string(),
  }).partial(),
});

export const deletePostSchema = object({
  ...params,
});

export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
export type UpdatePostSchema = TypeOf<typeof updatePostSchema>['params'];
export type GetPostInput = TypeOf<typeof getPostSchema>['params'];
export type DeletePostInput = TypeOf<typeof deletePostSchema>['params'];

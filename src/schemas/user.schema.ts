import { TypeOf, object, string } from 'zod';

const params = {
  params: object({
    id: string(),
  })
};

export const createPostSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
    photo: string(),
  }),
});

export const updatePostSchema = object({
  ...params,
  body: object({
    name: string(),
    photo: string()
  }).partial(),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
export type UpdatePostSchema = TypeOf<typeof updatePostSchema>['params'];

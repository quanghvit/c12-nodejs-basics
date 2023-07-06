import { TypeOf, object, string } from 'zod';

const params = {
  params: object({
    id: string(),
  })
};

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  })
})

export const createUserSchema = object({
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

export const updateUserSchema = object({
  ...params,
  body: object({
    name: string(),
    photo: string()
  }).partial(),
});

export type LoginInput = TypeOf<typeof loginSchema>['body'];
export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type UpdateUserSchema = TypeOf<typeof updateUserSchema>['params'];

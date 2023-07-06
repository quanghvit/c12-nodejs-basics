import { User } from '../entities/users.entity';
import { userRepo } from '../entities/repositories';

export const createUser = async (input: Partial<User>) => {
  return await userRepo.save(userRepo.create(input));
};

export const findUserByEmail = async (email: string) => {
  return await userRepo.findOne({
    where: { email: email }
  });
};

export const findUserById = async (userId: string) => {
  return await userRepo.findOne({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      createdBy: { id: true, name: true },
      updatedBy: { id: true, name: true }
    },
    relations: {
      createdBy: true,
      updatedBy: true,
    },
  });
};

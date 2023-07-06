import { User } from '../entities/users.entity';
import { AppDataSource } from '../utils/data.source';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOne({
    where: { email: email }
  });
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOne({
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

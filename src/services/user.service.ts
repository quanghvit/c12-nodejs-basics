import { User } from '../entities/users.entity';
import { AppDataSource } from '../utils/data.source';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

export const findUserByEmail = async (value: string) => {
  return await userRepository.findOne({
    where: { email: value }
  });
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOne({
    where: { id: userId },
    select: {
      id: true,
      createdBy: { id: true, name: true },
      updatedBy: { id: true, name: true }
    },
    relations: {
      createdBy: true,
      updatedBy: true,
    },
  });
};

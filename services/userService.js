import crypto from 'crypto';
import { createUser as createUserRepo, findAllUsers } from '../repositories/userRepository.js';
import { createUserMongo, getUsersMongo } from '../repositories/userMongoRepository.js';

const getUsers = async (sortedBy, filter) => {
  let users = await findAllUsers();

  if (sortedBy) {
    users.sort((a, b) => a[sortedBy]?.localeCompare(b[sortedBy]));
  }

  if (filter) {
    const [field, condition, value] = filter.split("+");

    users = users.filter(u => {
      const fieldValue = u[field];
      if (!fieldValue) return false;

      switch (condition) {
        case "co": return fieldValue.includes(value);
        case "eq": return fieldValue === value;
        case "sw": return fieldValue.startsWith(value);
        case "ew": return fieldValue.endsWith(value);
        default: return false;
      }
    });
  }

  return users;
};

const createUser = async (user) => {
  user.id = crypto.randomUUID();
  user.created_at = new Date();
  if (!user.email) {
    throw new Error('Email required');
  }

  await createUserMongo(user);
  return await createUserRepo(user);
};

export { getUsers, createUser };

export default {
  getUsers,
  createUser
};
import { randomUUID } from 'crypto';
import { createUser as createUserRepo, findAllUsers } from '../repositories/userRepository.js';
import { createUserMongo, getUsersMongo } from '../repositories/userMongoRepository.js';
import e from 'express';
import logger from '../utils/logger.js';

const isTest = process.env.NODE_ENV === 'test';
let users = isTest
  ? [
      {
        "id":"e1476bef-c824-4b0b-8581-3d39029feeb4",
        "name":"Alan",
        "email":"alan@example.com",
        "phone":"+525512345678",
        "password":"1234",
        "tax_id":"AARR990101XXX",
        "created_at":"2026-05-04T03:38:42.797Z",
        "addresses":[{"street":"Calle Falsa 123","city":"Ciudad de México","country":"México"}]
      },
      {
        "id":"6ccea3b8-5b7a-4f6f-8f0e-918fdd6eef94",
        "name":"María",
        "email":"maria@example.com",
        "phone":"+525587654321",
        "password":"5678",
        "tax_id":"MARR990101XXX",
        "created_at":"2026-05-04T03:38:42.797Z",
        "addresses":[{"street":"Avenida Siempreviva 456","city":"Guadalajara","country":"México"}]
      }
    ]
  : [];

const getUsers = async (sortedBy, filter) => {

  users = isTest
    ? users
    // : await findAllUsers();
    : await getUsersMongo();

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
  user.id = randomUUID();
  user.addresses = user.addresses ?? [];
  user.created_at = new Date();
  if (!user.email) {
    throw new Error('Email required');
  }

  if (isTest) {
    users.push(user);
    return user;
  }

  logger.info('Calling repositories');

  try {
    await createUserMongo(user);
  } catch (err) {
    console.error("Mongo failed, continuing...", err.message);
  }

  return await createUserRepo(user);
};

export { getUsers, createUser };

export default {
  getUsers,
  createUser
};
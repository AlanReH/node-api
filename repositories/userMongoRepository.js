import User from '../models/UserMongo.js';
import logger from '../utils/logger.js';

export const createUserMongo = async (user) => {
  logger.info({ requestId }, 'Inserting into DB');
  return await User.create(user);
};

export const getUsersMongo = async () => {
  logger.info({ requestId }, 'Getting all users from DB');
  return await User.find();
};
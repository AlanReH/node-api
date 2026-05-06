import User from '../models/UserMongo.js';

export const createUserMongo = async (user) => {
  logger.info({ requestId }, 'Inserting into DB');
  return await User.create(user);
};

export const getUsersMongo = async () => {
  return await User.find();
};
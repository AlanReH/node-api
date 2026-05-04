import User from '../models/UserMongo.js';

export const createUserMongo = async (user) => {
  return await User.create(user);
};

export const getUsersMongo = async () => {
  return await User.find();
};
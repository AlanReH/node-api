import userService from '../services/userService.js';
import logger from '../utils/logger.js';

const getUsers = async (req, res) => {
  try {
    logger.info('GET /users hit');

    const { sortedBy, filter } = req.query;
    const users = await userService.getUsers(sortedBy, filter);

    res.json({
      success: true,
      data: users
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    });
  }
};

const createUser = async (req, res) => {
  try {
    logger.info({ requestId: req.requestId }, 'Creating user');
    
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    });
  }
};

export { getUsers, createUser };

export default {
  getUsers,
  createUser
};
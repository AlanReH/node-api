import { v4 as uuidv4 } from 'uuid';

let users = [];

const getUsers = (sortedBy, filter) => {
  let result = [...users];

  if (sortedBy) {
    result.sort((a, b) => a[sortedBy]?.localeCompare(b[sortedBy]));
  }

  if (filter) {
    const [field, condition, value] = filter.split("+");

    result = result.filter(u => {
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

  return result;
};

const createUser = (user) => {
  user.id = uuidv4();
  users.push(user);
  return user;
};

export { getUsers, createUser };

export default {
  getUsers,
  createUser
};
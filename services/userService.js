import { v4 as uuidv4 } from 'uuid';

let users = [];

users.push({
  id: uuidv4(),
  name: "Alan",
  email: "alan@example.com",
  phone: "+525512345678",
  password: "1234",
  tax_id: "AARR990101XXX",
  created_at: new Date(),
  addresses: [
    {
      street: "Calle Falsa 123",
      city: "Ciudad de México",
      country: "México"
    }
  ]
});

users.push({
  id: uuidv4(),
  name: "María",
  email: "maria@example.com",
  phone: "+525587654321",
  password: "5678",
  tax_id: "MARR990101XXX",
  created_at: new Date(),
  addresses: [
    {
      street: "Avenida Siempreviva 456",
      city: "Guadalajara",
      country: "México"
    }
  ]
});



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
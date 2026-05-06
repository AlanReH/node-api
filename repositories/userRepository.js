import { pool } from '../config/db.js';
import { logger } from '../utils/logger.js';

export const createUser = async (user) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 👤 insert user
    logger.info({ requestId }, 'Inserting into DB');
    await client.query(
      `INSERT INTO users (id, email, name, phone, password, tax_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [user.id, user.email, user.name, user.phone, user.password, user.tax_id]
    );

    // 🏠 insert addresses
    for (const addr of user.addresses) {
      await client.query(
        `INSERT INTO addresses (user_id, street, city, country)
         VALUES ($1, $2, $3, $4)`,
        [user.id, addr.street, addr.city, addr.country]
      );
    }

    await client.query('COMMIT');

    return user;

  } catch (error) {
    console.error('DB ERROR:', error);
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const findAllUsers = async () => {
  logger.info('Getting all users from DB');
  const res = await pool.query(`
    SELECT 
      u.*,
      COALESCE(
        json_agg(
          json_build_object(
            'street', a.street,
            'city', a.city,
            'country', a.country
          )
        ) FILTER (WHERE a.id IS NOT NULL),
        '[]'
      ) AS addresses
    FROM users u
    LEFT JOIN addresses a ON u.id = a.user_id
    GROUP BY u.id
  `);

  return res.rows;
};
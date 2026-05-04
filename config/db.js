import pkg from 'pg';
const { Pool } = pkg;
import dotenvx from '@dotenvx/dotenvx';

import logger from '../utils/logger.js';

dotenvx.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const testDBConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    logger.info('🟢 DB connected:', res.rows[0]);
  } catch (err) {
    console.error('🔴 DB error:', err.message);
  }
};
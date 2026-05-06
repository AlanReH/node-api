import { randomUUID } from 'crypto';
import logger from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
  const requestId = randomUUID();
  const start = Date.now();

  req.requestId = requestId;

  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info({
      requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
};
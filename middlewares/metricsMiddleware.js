import { httpRequestDuration } from '../config/metrics.js';

export const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    httpRequestDuration
      .labels(req.method, req.originalUrl, res.statusCode)
      .observe(duration);
  });

  next();
};
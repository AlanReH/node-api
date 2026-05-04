import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

export const httpRequestDuration = new client.Histogram({
  name: 'http_duration_seconds',
  help: 'Duration of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

export default client;
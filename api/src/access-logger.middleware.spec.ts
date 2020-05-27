import { AccessLoggerMiddleware } from './access-logger.middleware';

describe('AccessLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new AccessLoggerMiddleware()).toBeDefined();
  });
});

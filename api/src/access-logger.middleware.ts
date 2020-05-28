import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class AccessLoggerMiddleware implements NestMiddleware {

  private readonly logger = new Logger('access');

  use(req: Request, res: Response, next: () => void) {
    this.logger.log(`${req.method} ${req.baseUrl} ${res.statusCode}`);
    next();
  }
}

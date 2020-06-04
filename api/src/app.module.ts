import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { AccessLoggerMiddleware } from './access-logger.middleware';
import { HiveModule } from './hive/hive.module';
import { QueenModule } from './queen/queen.module';

@Module({
  imports: [
    LocationModule,
    HiveModule,
    QueenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessLoggerMiddleware)
      .forRoutes('*')
  }
}

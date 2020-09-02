import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { AccessLoggerMiddleware } from './access-logger.middleware';
import { HiveModule } from './hive/hive.module';
import { QueenModule } from './queen/queen.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InspectionModule } from './inspection/inspection.module';

@Module({
  imports: [
    HiveModule,
    LocationModule,
    QueenModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'beez',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    InspectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessLoggerMiddleware)
      .forRoutes('*');
  }
}

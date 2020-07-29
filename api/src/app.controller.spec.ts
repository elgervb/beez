import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

describe('AppController', () => {
  let appController: AppController;
  const authService = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: AuthService, useValue: authService }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {

    it('should return details', () => {
      const details = appController.details();
      expect(details).toHaveProperty('version');
      expect(details).toHaveProperty('name');
      expect(details).toHaveProperty('keywords');
      expect(details).toHaveProperty('description');
    });
  });
});

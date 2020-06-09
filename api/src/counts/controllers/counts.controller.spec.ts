import { Test, TestingModule } from '@nestjs/testing';
import { CountsController } from './counts.controller';

describe('Counts Controller', () => {
  let controller: CountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountsController],
    }).compile();

    controller = module.get<CountsController>(CountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

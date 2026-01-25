import { Test, TestingModule } from '@nestjs/testing';
import { PublicFormController } from './public-form.controller';

describe('PublicFormController', () => {
  let controller: PublicFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicFormController],
    }).compile();

    controller = module.get<PublicFormController>(PublicFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

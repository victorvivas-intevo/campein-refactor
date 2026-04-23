import { Controller, Get, Query } from '@nestjs/common';
import { GetSignedUrlService } from '../application/use-cases/get-signed-url.service';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('storage')
export class StorageController {
  constructor(private readonly getSignedUrlService: GetSignedUrlService) {}

  @Public() // Expuesto públicamente porque se usa en los formularios públicos sin token
  @Get('signed-url')
  async getSignedUrl(@Query('path') path: string) {
    return await this.getSignedUrlService.execute(path);
  }
}
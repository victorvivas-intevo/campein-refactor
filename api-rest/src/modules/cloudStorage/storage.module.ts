import { Module } from '@nestjs/common';
import { StorageController } from './presentation/cloudStorage.controller';
import { GetSignedUrlService } from './application/use-cases/get-signed-url.service';
import { GcpStorageRepository } from './infrastructure/gcpStorage.repository';
import { STORAGE_REPOSITORY } from './domain/repositories/imagesStorage.repository.interface';

@Module({
  controllers: [StorageController],
  providers: [
    GetSignedUrlService,
    {
      provide: STORAGE_REPOSITORY,
      useClass: GcpStorageRepository,
    },
  ],
  exports: [GetSignedUrlService], // Por si otro caso de uso interno lo necesita
})
export class StorageModule {}

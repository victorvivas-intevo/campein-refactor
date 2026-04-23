import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { IStorageRepository } from '../domain/repositories/imagesStorage.repository.interface';

@Injectable()
export class GcpStorageRepository implements IStorageRepository {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.GCP_BUCKET_NAME!;

    if (!this.bucketName) {
      throw new InternalServerErrorException(
        'GCP_BUCKET_NAME no está configurado en las variables de entorno',
      );
    }

    // Al instanciar Storage() sin parámetros, GCP buscará automáticamente
    // la variable de entorno GOOGLE_APPLICATION_CREDENTIALS
    this.storage = new Storage();
  }

  async generateSignedUrl(
    filePath: string,
    expiresInMinutes: number = 15,
  ): Promise<string> {
    try {
      const options = {
        version: 'v4' as const, // v4 es el estándar más seguro actual
        action: 'read' as const,
        expires: Date.now() + expiresInMinutes * 60 * 1000,
      };

      const [url] = await this.storage
        .bucket(this.bucketName)
        .file(filePath)
        .getSignedUrl(options);

      return url;
    } catch (error) {
      console.error(error); // o usar Logger de NestJS

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException('Unexpected error');
    }
  }
}

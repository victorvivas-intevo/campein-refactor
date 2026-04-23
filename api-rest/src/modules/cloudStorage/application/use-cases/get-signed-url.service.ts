import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { type IStorageRepository, STORAGE_REPOSITORY } from '../../domain/repositories/imagesStorage.repository.interface';

@Injectable()
export class GetSignedUrlService {
  constructor(
    @Inject(STORAGE_REPOSITORY) private readonly storageRepository: IStorageRepository,
  ) {}

  async execute(path: string): Promise<{ url: string }> {
    if (!path) {
      throw new BadRequestException('El path de la imagen es requerido');
    }

    // 🛡️ SEGURIDAD: Prevenir Directory Traversal (ej. pasar '../secret-folder/file.png')
    if (path.includes('..') || path.startsWith('/')) {
      throw new BadRequestException('Ruta de archivo inválida');
    }

    // OPCIONAL: Si es para formularios públicos, podrías validar en la BD que el path 
    // realmente pertenezca a un formulario que esté activo (`is_active: true`).

    const url = await this.storageRepository.generateSignedUrl(path);
    return { url };
  }
}
export const STORAGE_REPOSITORY = Symbol('STORAGE_REPOSITORY');

export interface IStorageRepository {
  /**
   * Genera una URL firmada (Signed URL) temporal para un archivo específico.
   * @param filePath Ruta del archivo en el bucket (ej. 'campanas/imagen.png')
   * @param expiresInMinutes Tiempo de expiración en minutos (por defecto 15)
   */
  generateSignedUrl(filePath: string, expiresInMinutes?: number): Promise<string>;
}0
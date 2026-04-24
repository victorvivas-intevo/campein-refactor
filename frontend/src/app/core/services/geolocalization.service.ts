import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizationService {

  constructor() {}

  /**
   * Retorna una promesa con la ubicación actual.
   * Se envolvió en una Promesa nativa para usar fácilmente con async/await.
   */
  getPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      // 1. Verificamos si el navegador (o el contexto HTTP) soporta geolocalización
      if (!navigator.geolocation) {
        reject(new Error('La geolocalización no es soportada por este navegador o el contexto no es seguro (HTTP).'));
        return;
      }

      // 2. Solicitamos la posición con opciones de alta precisión
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position); // El usuario aceptó y hay GPS
        },
        (error) => {
          reject(error); // El usuario denegó, o hubo timeout
        },
        {
          enableHighAccuracy: true, // Usa el GPS si está en móvil (más exacto)
          timeout: 30000,           // Espera máximo 30 segundos antes de rendirse
          maximumAge: 0             // No uses ubicaciones cacheadas viejas
        }
      );
    });
  }
}
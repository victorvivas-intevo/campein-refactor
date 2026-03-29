import { Injectable } from '@angular/core';

export interface PositionInterface {
  latitude: number; longitude: number
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  getCurrentLocation(): Promise<PositionInterface | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn('La geolocalización no está soportada.');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('Geolocalización denegada o fallida:', error.message);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }
}
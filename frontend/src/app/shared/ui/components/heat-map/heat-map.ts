import { Component } from '@angular/core';
import { Card } from '../card/card';

export interface MapaInfo {
    cantidadVoluntarios: string;
    testigosInscritos: string;
    testigosRequeridos: string;
    testigosConfirmados: string;
    medioNumero: string;
}

@Component({
  selector: 'app-heat-map',
  imports: [Card],
  templateUrl: './heat-map.html',
  styles: ``,
})
export class HeatMap {
campanaActiva: string = 'campanaD'; // campanaD || campanaF

  datosActivos?: MapaInfo;
  
  dataD: MapaInfo = {
    cantidadVoluntarios: '107.720',
    testigosInscritos: '13.437',
    testigosRequeridos: '102.152',
    testigosConfirmados: '13.153%',
    medioNumero: '10.260',
  }

  dataF: MapaInfo = {
    cantidadVoluntarios: '102.502',
    testigosInscritos: '11.581',
    testigosRequeridos: '112.009',
    testigosConfirmados: '10.34%',
    medioNumero: '11.452',
  }

  constructor() {

  }

  ngOnInit(): void {
    this.datosActivos = this.dataD
  }

  cambiar(campana: string){
    this.campanaActiva = campana;
    if(campana == 'campanaD') this.datosActivos = this.dataD;
    if(campana == 'campanaF') this.datosActivos = this.dataF;
  }

}

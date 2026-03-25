import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '@/shared/ui/components/card/card';
import { Table } from '@/shared/ui/components/table/table';
import { TableColumn, TableConfig } from '@/shared/interfaces/table';


@Component({
  selector: 'app-comparative-survies.page',
  imports: [CommonModule, Card, Table],
  templateUrl: './comparative-survies.page.html',
  styles: ``,
})
export class ComparativeSurviesPage {

  // Configuración general para ambas tablas
  tableConfig: TableConfig = {
    sortable: true,
    pagination: {
      enabled: false // Desactivado por ser pocos datos
    }
  };

  // --- DATOS Y COLUMNAS: ESCENARIO 1 ---
  scenario1Data = [
    { encuestadora: 'Atlas Intel', labelChart: 'Atlas (Feb)', fecha: '27 Ene-4 Feb', cepeda: 35.2, paloma: 26.9, blanco: 24.1 },
    { encuestadora: 'CNC', labelChart: 'CNC', fecha: '15-21 Ene', cepeda: 47.7, paloma: 17.8, blanco: null },
    { encuestadora: 'Guarumo', labelChart: 'Guarumo', fecha: '14-22 Ene', cepeda: 40.0, paloma: 21.2, blanco: null },
    { encuestadora: 'GAD3', labelChart: 'GAD3', fecha: '13-15 Ene', cepeda: 43.0, paloma: 20.0, blanco: 14.0 },
    { encuestadora: 'Atlas Intel', labelChart: 'Atlas (Ene)', fecha: '5-8 Ene', cepeda: 35.8, paloma: 38.2, blanco: 13.9 },
  ];

  scenario1Columns: TableColumn[] = [
    { id: 'encuestadora', header: 'Encuestadora', type: 'text' },
    { id: 'fecha', header: 'Fecha', type: 'text', cellClass: () => 'text-placeholder-input-600' },
    { 
      id: 'cepeda', 
      header: 'Cepeda (%)', 
      type: 'number',
      cellClass: () => 'font-bold text-primary-green-700',
      formatter: (val) => val ? `${val} %` : '-' 
    },
    { 
      id: 'paloma', 
      header: 'Paloma (%)', 
      type: 'number',
      cellClass: () => 'font-bold text-primary-red-600',
      formatter: (val) => val ? `${val} %` : '-' 
    },
    { 
      id: 'blanco', 
      header: 'Blanco (%)', 
      type: 'number',
      formatter: (val) => val ? `${val} %` : '-'
    },
  ];

  // --- DATOS Y COLUMNAS: ESCENARIO 2 ---
  scenario2Data = [
    { encuestadora: 'Guarumo', labelChart: 'Guarumo', fecha: '14-22 Ene', abelardo: 34.4, paloma: 9.5, blanco: 56.1 }
  ];

  scenario2Columns: TableColumn[] = [
    { id: 'encuestadora', header: 'Encuestadora', type: 'text' },
    { id: 'fecha', header: 'Fecha', type: 'text', cellClass: () => 'text-placeholder-input-600' },
    { 
      id: 'abelardo', 
      header: 'Abelardo (%)', 
      type: 'number',
      cellClass: () => 'font-bold text-purple-heart-800' 
    },
    { 
      id: 'paloma', 
      header: 'Paloma (%)', 
      type: 'number',
      cellClass: () => 'font-bold text-primary-red-600' 
    },
    { 
      id: 'blanco', 
      header: 'Blanco (%)', 
      type: 'number',
      cellClass: () => 'text-placeholder-input-700' 
    },
  ];
}
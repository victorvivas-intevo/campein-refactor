import { PublicFormsFacade } from '@/features/public-forms/application/facades/public-form.fecade';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from "@/shared/ui/components/card/card";
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PublicFormsDto } from '@/features/public-forms/domain/dtos/query.dtos';

@Component({
  selector: 'app-list-forms.page',
  imports: [Card, CommonModule, NgOptimizedImage],
  templateUrl: './list-forms.page.html',
})
export class ListFormsPage implements OnInit {

  codeTenant?: string;
  facade = inject(PublicFormsFacade);
  private router = inject(Router);

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('codeTenant');
    if (code !== null) {
      this.codeTenant = code;
      this.loadForms();
    } else {
      console.error('No se proporcionó un código de tenant válido en la URL.');
      return;
    }
    this.facade.loadFormsByTenant(this.codeTenant);
  }

  loadForms() {
    if(this.codeTenant) {
      this.facade.loadFormsByTenant(this.codeTenant);
    }
  }

  goToForm(item: PublicFormsDto){
    this.router.navigate([item.code], { relativeTo: this.route });
  }

  /* --- MÉTODOS PARA CONTROLAR LA GRILLA --- */

  cardsConditions(count: number, i: number, isEven: boolean) {
    return {
        'md:col-span-3 lg:col-span-4': count === 1,

        /* TABLET (md): Patrón [2, 1], [1, 2]. Se repite cada 4 elementos */
        /* 2 columnas: Índices 0, 3, 4, 7... */
        'md:col-span-2': count > 1 && (i % 4 === 0 || i % 4 === 3),
        /* 1 columna: Índices 1, 2, 5, 6... */
        'md:col-span-1': count > 1 && (i % 4 === 1 || i % 4 === 2),

        /* DESKTOP (lg): Patrón [2, 1, 1], [1, 1, 2]. Se repite cada 6 elementos */
        'lg:col-span-2': count > 1 && (i % 6 === 0 || i % 6 === 5),
        'lg:col-span-1': count > 1 && (i % 6 === 1 || i % 6 === 2 || i % 6 === 3 || i % 6 === 4),

        'border-t-4': count >= 1,
        'border-t-pv-primary-500': isEven,
        'border-t-pv-secondary-700': !isEven
      };
  }

  /* --- HELPERS RESPONSIVOS PARA EL CONTENIDO INTERNO --- */
  
  // Evalúa si la tarjeta ocupa 2+ columnas en Tablet
  isWideMd(count: number, i: number): boolean {
    return count === 1 || (count > 1 && (i % 4 === 0 || i % 4 === 3));
  }

  // Evalúa si la tarjeta ocupa 2+ columnas en Desktop
  isWideLg(count: number, i: number): boolean {
    return count === 1 || (count > 1 && (i % 6 === 0 || i % 6 === 5));
  }

  // Controla si el texto va debajo (col) o al lado (row) de la imagen
  getCardLayoutClasses(count: number, i: number) {
    const md = this.isWideMd(count, i);
    const lg = this.isWideLg(count, i);
    return {
      'flex-col': true,
      'md:flex-row': md, 'md:flex-col': !md,
      'lg:flex-row': lg, 'lg:flex-col': !lg
    };
  }

  // Controla el tamaño del título
  getTitleClasses(count: number, i: number) {
    const md = this.isWideMd(count, i);
    const lg = this.isWideLg(count, i);
    return {
      'text-lg mb-1': true,
      'md:text-2xl md:mb-2': md, 'md:text-lg md:mb-1': !md,
      'lg:text-2xl lg:mb-2': lg, 'lg:text-lg lg:mb-1': !lg
    };
  }

  // Controla si la imagen se ve y qué proporciones toma en cada breakpoint
  getImageClasses(count: number, i: number) {
    const md = this.isWideMd(count, i);
    const lg = this.isWideLg(count, i);
    return {
      'relative overflow-hidden shrink-0 hidden': true, // Oculta en móvil (1 col)
      'md:block md:w-2/5 md:h-full': md,  // Muestra horizontal en Tablet
      'md:hidden md:w-full md:h-48': !md, // Oculta en Tablet
      'lg:block lg:w-2/5 lg:h-full': lg,  // Muestra horizontal en Desktop
      'lg:hidden lg:w-full lg:h-48': !lg  // Oculta en Desktop
    };
  }
}
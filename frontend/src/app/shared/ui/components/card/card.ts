
import { Component, Input } from '@angular/core';

type CardVariant = 'default'; // Definir las variantes posibles
type CardSize = 'sm' | 'md' | 'lg' | 'xl' | 'login'; // Definir las variaciones de padding

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
})
export class Card {
  @Input() variant: CardVariant = 'default';
  @Input() size: CardSize = 'md';
  @Input() clickable = false; // útil para cards de dashboard

  @Input() class = '';

  get baseClasses(): string {
    const base =`rounded-card-0 bg-white shadow-card-0 w-full h-full transition-all duration-200`;

    const variants: Record<CardVariant, string> = {
      default: '',
    };

    const sizes: Record<CardSize, string> = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
      login: 'px-21 pt-23 pb-11.5'
    };

    const clickableClass = this.clickable
      ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:border-primary/60'
      : '';

    return [base, variants[this.variant], sizes[this.size], clickableClass]
      .join(' ')
      .trim();
  }

  get cardClasses(): string {
    return [this.baseClasses, this.class].filter(Boolean).join(' ');
  }
}


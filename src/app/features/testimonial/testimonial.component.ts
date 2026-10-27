import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, Subject, startWith } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor, NgIf } from '@angular/common';

import { Testimonial } from '../../models/testimonial.model';
import testimonialsData from '../../data/testimonials.json';

const AUTOPLAY_MS = 5000;

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDividerModule, NgFor, NgIf],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent {
  readonly heading = input<string>('What Our Customers Say');
  readonly subheading = input<string>(
    'Real feedback from families who celebrated with Aamontron'
  );

  readonly testimonials: Testimonial[] = testimonialsData as Testimonial[];
  readonly autoplay = input<boolean>(true);

  readonly activeIndex = signal(0);
  private readonly destroyRef = inject(DestroyRef);
  private readonly pause$ = new Subject<void>();

  get visibleCount(): number {
    return window.innerWidth <= 600 ? 1 : 2;
  }

  get totalSlides(): number {
    return Math.ceil(this.testimonials.length / this.visibleCount);
  }

  get canGoPrev(): boolean {
    return this.activeIndex() > 0;
  }

  get canGoNext(): boolean {
    return this.activeIndex() < this.totalSlides - 1;
  }

  get dots(): number[] {
    return Array.from({ length: this.totalSlides }, (_, i) => i);
  }

  get initials(): (name: string) => string {
    return (name: string): string =>
      name
        .split(/\s+/)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
  }

  fullStars(rating: number | undefined): number[] {
    if (!rating) return [];
    return Array.from({ length: Math.floor(rating) }, (_, i) => i);
  }

  halfStar(rating: number | undefined): boolean {
    return !!rating && rating % 1 >= 0.5;
  }

  emptyStars(rating: number | undefined): number[] {
    if (!rating) return [];
    const filled = Math.ceil(rating);
    return Array.from({ length: 5 - filled }, (_, i) => i);
  }

  constructor() {
    if (this.autoplay()) {
      this.pause$
        .pipe(
          startWith(null),
          switchMap(() => interval(AUTOPLAY_MS).pipe(takeUntilDestroyed(this.destroyRef))),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          if (this.canGoNext) {
            this.next();
          } else {
            this.goTo(0); // Loop back to start
          }
        });
    }
  }

  next(): void {
    if (this.canGoNext) {
      this.activeIndex.update((i) => i + 1);
    }
  }

  prev(): void {
    if (this.canGoPrev) {
      this.activeIndex.update((i) => i - 1);
    }
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  pause(): void {
    this.pause$.next();
  }

  resume(): void {
    this.pause$.next();
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.goTo(index);
    }
  }
}
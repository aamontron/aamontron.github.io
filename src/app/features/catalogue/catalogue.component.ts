import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { CatalogueService } from '../../services/catalogue.service';
import { InvitationCard, Category } from '../../models/invitation.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss',
})
export class CatalogueComponent implements OnInit {
  categories$: Observable<Category[]>;
  cards: InvitationCard[] = [];
  selectedCategoryId: string = 'all';
  searchTerm: string = '';

  constructor(
    private catalogueService: CatalogueService,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.catalogueService.getCategories();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.selectedCategoryId = params['category'];
      }
      this.loadCards();
    });
  }

  filterByCategory(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.loadCards();
  }

  onSearchChange(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.catalogueService
      .filterCards(this.selectedCategoryId, this.searchTerm)
      .subscribe((cards) => {
        this.cards = cards;
      });
  }
}

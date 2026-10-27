import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CatalogueService } from '../../services/catalogue.service';
import { InvitationCard, Category } from '../../models/invitation.model';
import { Observable } from 'rxjs';
import { TestimonialComponent } from '../testimonial/testimonial.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatCardModule, TestimonialComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredCards$: Observable<InvitationCard[]>;
  categories$: Observable<Category[]>;

  constructor(private catalogueService: CatalogueService) {
    this.featuredCards$ = this.catalogueService.getFeaturedInvitations();
    this.categories$ = this.catalogueService.getCategories();
  }

  ngOnInit(): void {}
}

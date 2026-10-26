import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, InvitationCard } from '../models/invitation.model';
import categoriesData from '../data/categories.json';
import invitationsData from '../data/invitations.json';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private categories: Category[] = categoriesData as Category[];
  private invitations: InvitationCard[] = invitationsData as InvitationCard[];

  constructor() {}

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getInvitations(): Observable<InvitationCard[]> {
    return of(this.invitations);
  }

  getFeaturedInvitations(): Observable<InvitationCard[]> {
    return of(this.invitations.filter((card) => card.isFeatured));
  }

  getCardById(id: string): Observable<InvitationCard | undefined> {
    return of(this.invitations.find((card) => card.id === id));
  }

  filterCards(categoryId?: string, searchTerm?: string): Observable<InvitationCard[]> {
    let result = this.invitations;

    if (categoryId && categoryId !== 'all') {
      result = result.filter((card) => card.categoryId === categoryId);
    }

    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (card) =>
          card.title.toLowerCase().includes(term) ||
          card.code.toLowerCase().includes(term) ||
          card.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    return of(result);
  }
}

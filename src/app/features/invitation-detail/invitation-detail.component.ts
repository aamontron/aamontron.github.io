import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { CatalogueService } from '../../services/catalogue.service';
import { InvitationCard } from '../../models/invitation.model';

@Component({
  selector: 'app-invitation-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatDividerModule, MatChipsModule],
  templateUrl: './invitation-detail.component.html',
  styleUrl: './invitation-detail.component.scss'
})
export class InvitationDetailComponent implements OnInit {
  card?: InvitationCard;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private catalogueService: CatalogueService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.catalogueService.getCardById(id).subscribe(card => {
        this.card = card;
        if (card) {
          this.selectedImage = card.imageUrl;
        }
      });
    }
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }
}

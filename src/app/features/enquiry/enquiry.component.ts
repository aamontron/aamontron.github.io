import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CatalogueService } from '../../services/catalogue.service';
import { WhatsAppService } from '../../services/whats-app.service';
import { InvitationCard } from '../../models/invitation.model';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.scss',
})
export class EnquiryComponent implements OnInit {
  card?: InvitationCard;
  enquiryForm: FormGroup;
  isSubmitted: boolean = false;
  whatsAppUrl: string = '';
  popupBlocked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private catalogueService: CatalogueService,
    private whatsAppService: WhatsAppService
  ) {
    this.enquiryForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      customerPhone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{10,15}$/)]],
      eventDate: ['', [Validators.required]],
      quantity: [100, [Validators.required, Validators.min(10)]],
      customNotes: [''],
    });
  }

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('cardId');
    if (cardId) {
      this.catalogueService.getCardById(cardId).subscribe((card) => {
        this.card = card;
      });
    }
  }

  onSubmit(): void {
    if (this.enquiryForm.valid && this.card) {
      const formValue = this.enquiryForm.value;
      const payload = {
        cardId: this.card.code,
        cardTitle: this.card.titleBengali,
        category: this.card.categoryId,
        customerName: formValue.customerName,
        customerPhone: formValue.customerPhone,
        eventDate: formValue.eventDate,
        quantity: formValue.quantity,
        customNotes: formValue.customNotes,
      };

      this.whatsAppUrl = this.whatsAppService.buildEnquiryUrl(payload);
      const success = this.whatsAppService.openWhatsApp(payload);

      this.isSubmitted = true;
      this.popupBlocked = !success;
    }
  }
}

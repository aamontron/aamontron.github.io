import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { EnquiryPayload } from '../models/invitation.model';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppService {
  private whatsAppNumber = environment.whatsAppNumber;

  constructor() {}

  buildEnquiryUrl(payload: EnquiryPayload): string {
    const message =
      `Hello! I'm enquiring about an invitation card (Aamontron):\n\n` +
      `📋 Card: *${payload.cardTitle}* (Code: ${payload.cardId})\n` +
      `🏷️ Category: ${payload.category}\n` +
      `👤 Name: ${payload.customerName}\n` +
      `📞 Phone: ${payload.customerPhone}\n` +
      `📅 Event Date: ${payload.eventDate}\n` +
      `🔢 Quantity: ${payload.quantity} pcs\n` +
      (payload.customNotes ? `💬 Special Requirements: ${payload.customNotes}\n\n` : `\n`) +
      `Please share detailed pricing and samples. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${this.whatsAppNumber}?text=${encodedMessage}`;
  }

  openWhatsApp(payload: EnquiryPayload): boolean {
    const url = this.buildEnquiryUrl(payload);
    const newWindow = window.open(url, '_blank');
    return newWindow !== null && !newWindow.closed;
  }
}

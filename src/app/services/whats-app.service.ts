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
      `নমস্কার! আমি নিমন্ত্রণ কার্ড সম্পর্কে জানতে চাই (Aamontron):\n\n` +
      `📋 কার্ড: *${payload.cardTitle}* (কোড: ${payload.cardId})\n` +
      `🏷️ ক্যাটেগরি: ${payload.category}\n` +
      `👤 নাম: ${payload.customerName}\n` +
      `📞 ফোন: ${payload.customerPhone}\n` +
      `📅 আনুমানিক তারিখ: ${payload.eventDate}\n` +
      `🔢 পরিমাণ: ${payload.quantity} পিস\n` +
      (payload.customNotes ? `💬 বিশেষ প্রয়োজন: ${payload.customNotes}\n\n` : `\n`) +
      `দয়া করে বিস্তারিত মূল্য ও স্যাম্পল শেয়ার করুন। ধন্যবাদ!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${this.whatsAppNumber}?text=${encodedMessage}`;
  }

  openWhatsApp(payload: EnquiryPayload): boolean {
    const url = this.buildEnquiryUrl(payload);
    const newWindow = window.open(url, '_blank');
    return newWindow !== null && !newWindow.closed;
  }
}

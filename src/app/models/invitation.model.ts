export interface Category {
  id: string;
  nameBengali: string;
  nameEnglish: string;
  slug: string;
  icon: string;
  displayOrder: number;
}

export interface InvitationCard {
  id: string;
  titleBengali: string;
  titleEnglish: string;
  code: string;
  categoryId: string;
  tags: string[];
  priceEstimate: string;
  imageUrl: string;
  gallery: string[];
  isFeatured: boolean;
  isNew: boolean;
  dimensions: string;
  paperType: string;
  description: string;
}

export interface EnquiryPayload {
  cardId: string;
  cardTitle: string;
  category: string;
  customerName: string;
  customerPhone: string;
  eventDate: string;
  quantity: number;
  customNotes?: string;
}

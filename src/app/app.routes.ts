import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CatalogueComponent } from './features/catalogue/catalogue.component';
import { InvitationDetailComponent } from './features/invitation-detail/invitation-detail.component';
import { EnquiryComponent } from './features/enquiry/enquiry.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'card/:id', component: InvitationDetailComponent },
  { path: 'enquiry/:cardId', component: EnquiryComponent },
  { path: '**', redirectTo: '' }
];

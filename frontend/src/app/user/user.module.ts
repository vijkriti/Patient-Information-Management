import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AvailabilityComponent } from './availability/availability.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  providers:[provideHttpClient(withFetch())]
})
export class UserModule { }

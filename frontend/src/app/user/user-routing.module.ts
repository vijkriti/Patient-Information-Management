import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: 'info', component: UserInfoComponent },
        { path: 'calendar', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

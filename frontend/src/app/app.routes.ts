import { Routes } from '@angular/router';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { CalendarComponent } from './user/calendar/calendar.component';

export const routes: Routes = [
    {path:'user',loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
    { path: '', redirectTo: '/info', pathMatch: 'full' },
        { path: 'info', component: UserInfoComponent },
        { path: 'calendar', component: CalendarComponent }
];

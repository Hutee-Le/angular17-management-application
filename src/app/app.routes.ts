import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';
import { UsersComponent } from './admin/users/users.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: '',
        component: AdminLayoutComponent,

        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'users', component: UsersComponent}
        ]
      },
];

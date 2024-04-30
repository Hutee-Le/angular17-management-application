import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: '/doashboard', pathMatch: 'full' },
    {
        path: '',
        component: AdminLayoutComponent,

        children: [
          { path: 'doashboard', component: DashboardComponent },
        ]
      },
];

import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';
import { UsersComponent } from './admin/users/users.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
import { ProductDetailComponent } from './admin/products/product-detail/product-detail.component';
import { CreateProductComponent } from './admin/products/create-product/create-product.component';
import { UpdateProductComponent } from './admin/products/update-product/update-product.component';
import { CreateUserComponent } from './admin/users/create-user/create-user.component';
import { LoginComponent } from './admin/users/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
      path: 'admin',
      component: AdminLayoutComponent,
      canActivate:[authGuard],
      children: [
          { path: '', component: DashboardComponent },
          { path: 'users', component: UsersComponent },
          { path: 'users/create', component: CreateUserComponent },
          { path: 'products', component: ProductListComponent },
          { path: 'products/create', component: CreateProductComponent },
          { path: 'products/update/:id', component: UpdateProductComponent },
          { path: 'products/:id', component: ProductDetailComponent },
      ]
  },
  { path: 'login', component: LoginComponent},
  {path:'**', redirectTo: "login", pathMatch: "full"}

];

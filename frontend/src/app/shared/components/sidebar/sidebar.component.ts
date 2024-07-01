import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: User | null = null;
  authSrv: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit() {
    this.authSrv.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  getUsername(user: User): string {
    if (user.displayName) {
      return user.displayName;
    } else if (user.email) {
      return user.email.split('@')[0];
    }
    return 'ExampleUser';
  }

  logout() {
    this.authSrv.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}

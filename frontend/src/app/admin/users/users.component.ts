import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  firestore: Firestore = inject(Firestore)
  users: User[] = [];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers(); 
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data; 
      },
      error => {
        console.error('Error loading users:', error); 
      }
    );
  }

  goToCreateUser(): void {
    this.router.navigate(['/admin/users/create'])
  }
}

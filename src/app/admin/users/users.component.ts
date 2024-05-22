import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  firestore: Firestore = inject(Firestore)
  items: Observable<any[]>;
  users: User[] = [];

  constructor() {
    const itemCollection  = collection(this.firestore, 'users');
    this.items = collectionData(itemCollection);
    this.items.subscribe(data=>{this.users = data}) 
  }
}

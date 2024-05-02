import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  // templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  template: `
					<ul>
					  <li *ngFor="let item of items | async">
						{{ item.name }}
					  </li>
					</ul>
				  `
})
export class UsersComponent {
  firestore: Firestore = inject(Firestore)
  items: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items = collectionData(aCollection);
  }
}

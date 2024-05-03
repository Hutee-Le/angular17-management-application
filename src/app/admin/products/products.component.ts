import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  firestore: Firestore = inject(Firestore)
  products: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'products')
    this.products = collectionData(aCollection);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Product } from '../../../core/models/product';
import { ProductsService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  firestore: Firestore = inject(Firestore)
  products$: Observable<Product[]> = this.productService.getProducts().pipe(
    tap(products => {
      products.forEach(product => {
        product.totalQuantity = this.calculateTotalQuantity(product);
      });
    })
  );
  totalQuantity: number = 0;

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void { }

  calculateTotalQuantity(product: Product): number {
    let totalQuantity = 0;
    product.colors.forEach(color => {
      color.sizes.forEach(size => {
        totalQuantity += size.quantity;
      });
    });
    return totalQuantity;
  }

  deleteProduct(id: string): void {
    this.products$ = this.products$.pipe(
      tap(products => {
        const index = products.findIndex(product => product.id === id);
        if (index > -1) {
          products.splice(index, 1);
        }
      })
    );

    this.productService.deleteProduct(id).pipe(
      catchError(error => {
        console.error('Error deleting product:', error);
        this.getAll();
        throw error;
      })
    ).subscribe(
      () => {
        console.log('Product deleted successfully');
      }
    );
  }

  getAll(): void {
    this.products$ = this.productService.getProducts().pipe(
      tap(products => {
        products.forEach(product => {
          product.totalQuantity = this.calculateTotalQuantity(product);
        });
      })
    );
  }
}

